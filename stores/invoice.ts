import strapiMapper from 'smapper';
import config from '~/config/config.json';
import { CreateInvoice } from '~/graphql/mutations';
import { GetProductById, GetInvoicesByUserId } from '~/graphql/queries';
import { PaymentReportError, SendInvoiceEmailError } from '~/errors';

import type { OrderResponseBody } from '@paypal/paypal-js';
import type { Payment } from 'square';
import services from '~/services';

const PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

interface FetchInvoicesReturn {
  data: Invoice[] | undefined;
  meta: Meta | null;
}

interface Options {
  page: number;
  pageSize: number;
}

const DELAY_REDIRECT = 500;

export const useInvoiceStore = defineStore(
  config.store.invoice,
  () => {
    const invoice = ref<any>();
    const invoices = ref<Invoice[]>([]);
    const products = ref<Product[]>([]);
    const loading = ref<boolean>(false);
    const auth = useAuthStore();

    const mapped = computed(() => {
      if (!invoices.value.length) return [];

      return invoices.value.map(invoiceMapper);
    });

    const router = useRouter();
    const graphql = useStrapiGraphQL();
    const authStore = useAuthStore();
    const checkout = useCheckoutStore();
    const productsCart = useProductStore();
    const cart = useCartStore();

    async function fetchInvoices(
      userId: string,
      options?: Options
    ): Promise<FetchInvoicesReturn> {
      const graphql = useStrapiGraphQL();
      const id = Number(userId);

      const response = await graphql<InvoicesRequest>(GetInvoicesByUserId, {
        id,
        page: options?.page ?? DEFAULT_PAGE,
        pageSize: options?.pageSize ?? PAGE_LIMIT,
      });

      if (!response.data.invoices?.data?.length) {
        return {
          data: [],
          meta: null,
        };
      }

      const mapped = strapiMapper<Invoice[]>(response.data.invoices.data);

      invoices.value = mapped;

      return {
        data: mapped,
        meta: response.data.invoices.meta,
      };
    }

    async function loadInvoiceProducts() {
      try {
        loading.value = true;
        const graphql = useStrapiGraphQL();
        const temp: Product[] = [];

        if (!invoice.value?.products.length) return [];

        const itemsId = invoice.value.products.map(
          (product: Product) => product.id
        );

        const productPromises = itemsId.map((id: string) =>
          graphql<ProductRequest>(GetProductById, { id })
        );

        const response = await Promise.all(productPromises);
        const result = strapiMapper<any[]>(response);

        result.forEach((product) => {
          temp.push(product.products[0]);
        });

        products.value = temp;
      } catch (error: any) {
        throw new Error(error);
      } finally {
        loading.value = false;
      }
    }

    async function createPaypalInvoice(
      order: OrderResponseBody,
      items: CartItem[]
    ) {
      const productList = productsCart.cartProducts;
      const productsFiltered: ProductBuyed[] = [];

      items.forEach((product) => {
        const found = productList?.find((item) => item?.id === product.id);

        if (found) {
          productsFiltered.push({
            product: product.id,
            quantity: Number(product.quantity),
            size: product.size,
          });
        }
      });

      const orderAddress = order.purchase_units[0].shipping?.address;
      const address = {
        phone: checkout.phone,
        home: checkout.home,
        country: orderAddress?.country_code,
        locality: orderAddress?.admin_area_2,
        postalCode: orderAddress?.postal_code,
        addressLine1: orderAddress?.address_line_1,
      };

      const paymentInfo = {
        name: order.payer.name?.given_name,
        lastname: order.payer.name?.surname,
        email: order.payer.email_address,
        confirmation: order.id,
        amount: +order.purchase_units[0].amount.value,
        payment_date: getDate(order.create_time),
      };

      const body = {
        amount: +order.purchase_units[0].amount.value,
        order_id: order.purchase_units[0].invoice_id,
        paid: true,
        payment_id: order.id,
        products: productsFiltered,
        user: authStore.user.id.toString(),
        shippingAddress: address,
        fullName: checkout.fullName,
        cardType: 'no aplica',
        cardKind: 'no aplica',
        cardLast: 'no aplica',
        payment_info: [paymentInfo],
        payment_method: 'paypal',
      };

      const { data } = await graphql<InvoicesRequest>(CreateInvoice, {
        invoice: body,
      });

      return data;
    }

    async function createInvoiceReport(
      payment: PaymentObject,
      products: any[],
      method: PaymentMethod
    ) {
      try {
        const productList = productsCart.cartProducts;
        const productsFiltered: ProductBuyed[] = [];

        products.forEach((product) => {
          const found = productList?.find((item) => item?.id === product.id);

          if (found) {
            productsFiltered.push({
              product: product.id,
              quantity: Number(product.quantity),
              size: product.size,
            });
          }
        });

        const mapperToStrapiObject = (
          payment: PaymentObject
        ): PaymentStrapi => ({
          name: payment.name,
          lastname: payment.lastname,
          confirmation: payment.confirmation,
          amount: +payment.amount,
          payment_date: payment.paymentDate,
          email: checkout.email,
        });

        const addressData = {
          phone: checkout.phone,
          home: checkout.home,
          country: checkout.country,
          locality: checkout.city,
          postalCode: checkout.zipCode,
          addressLine1: checkout.address,
        };

        const paymentInfo = mapperToStrapiObject(payment);

        const data = {
          // Amount in USD
          amount: cart.amount,
          order_id: payment.orderId,
          paid: false,
          payment_id: payment.confirmation,
          products: productsFiltered,
          user: authStore.user.id.toString(),
          shippingAddress: addressData,
          fullName: checkout.fullName,
          cardType: 'no aplica',
          cardKind: 'no aplica',
          cardLast: 'no aplica',
          payment_info: [paymentInfo],
          payment_method: method,
        };

        const result = await graphql<CreateInvoiceRequest>(CreateInvoice, {
          invoice: data,
        });

        return result;
      } catch (error) {
        throw new PaymentReportError('An error occurred while sending report');
      }
    }

    async function createVisaInvoice(
      payment: Record<string, unknown>,
      products: CartItem[]
    ) {
      try {
        const productList = productsCart.cartProducts;
        const productsFiltered: ProductBuyed[] = [];

        products.forEach((product) => {
          const find = productList!.find((item) => item!.id === product.id);

          if (find) {
            productsFiltered.push({
              product: product.id,
              quantity: Number(product.quantity),
              size: product.size,
            });
          }
        });

        const addressData = {
          phone: checkout.phone,
          home: checkout.home,
          country: payment.shipping_address?.country,
          locality: payment.shipping_address?.locality,
          postalCode: payment.shipping_address?.postal_code,
          addressLine1: payment.shipping_address?.address_line1,
        };

        const paymentInfo: PaymentStrapi = {
          name: checkout.name,
          lastname: checkout.lastName,
          email: auth.user.email as string,
          confirmation: payment.id as string,
          amount: Number(payment!.total_money!.amount) / 100,
          payment_date: getDate(),
        };

        const data = {
          amount: Number(payment!.total_money!.amount) / 100,
          order_id: payment.orderId,
          paid: true,
          payment_id: payment.id,
          products: productsFiltered,
          user: authStore.user.id.toString(),
          shippingAddress: addressData,
          fullName: payment.note,
          cardType: payment?.card_details?.card?.card_brand,
          cardKind: payment?.card_details?.card?.card_type,
          cardLast: payment?.card_details?.card?.last_4,
          payment_info: [paymentInfo],
          payment_method: 'squareup',
        };

        const result = await graphql<CreateInvoiceRequest>(CreateInvoice, {
          invoice: data,
        });

        return result;
      } catch (error) {
        console.log({ error });
        throw new PaymentReportError('An error occurred while sending report');
      }
    }

    type MailProduct = {
      name: string;
      price: string;
      quantity: string;
    };

    function getEmailProducts(products: any[]): MailProduct[] {
      const productsMail: MailProduct[] = [];

      products.forEach((item) => {
        const productFinded = productsCart.cartProducts!.find(
          (product) => product!.id == item.id
        );

        if (productFinded) {
          productsMail.push({
            name: productFinded.name,
            price: item.price,
            quantity: item.quantity,
          });
        }
      });

      return productsMail;
    }

    const createTable = (data: any[]) => ({
      columns: [
        { header: 'Producto', key: 'name' },
        { header: 'Precio', key: 'price' },
        { header: 'Cantidad', key: 'quantity' },
      ],
      data,
    });

    const getMerchantObject = ({
      payed,
      date,
      tableData,
      email,
      customer,
      orderId,
    }: EmailObjectParams) => ({
      payed,
      date,
      table: createTable(tableData),
      orderId,
      email: email || checkout?.email || authStore.user.email,
      phone: checkout.phone,
      shipping: checkout.shippingAddress,
      customer: customer || checkout.fullName,
    });

    const getReceiptObject = ({
      payed,
      date,
      tableData,
      orderId,
      email,
      customer,
    }: EmailObjectParams) => ({
      payed,
      date,
      orderId,
      table: createTable(tableData),
      email: email || checkout?.email || authStore.user.email,
      customer: customer || checkout.fullName,
    });

    async function sendEmail(products: any[], payment: PaymentObject) {
      try {
        const emailProducts = getEmailProducts(products);
        const createdDate = new Date(payment.paymentDate).toLocaleDateString();
        const realAmount = payment?.amountRate ? cart.amount : payment.amount;
        const amountPayed = `$${realAmount} USD`;
        const orderId = `${payment.orderId} (PENDIENTE EN APROBACION)`;

        const merchant = getMerchantObject({
          orderId,
          payed: amountPayed,
          date: createdDate,
          tableData: emailProducts,
        });

        const receipt = getReceiptObject({
          orderId,
          payed: amountPayed,
          date: createdDate,
          tableData: emailProducts,
        });

        await Promise.all([
          services.sendReceiptEmail(receipt),
          services.sendMerchantEmail(merchant),
        ]);

        useToast().add({
          icon: 'i-ph-check',
          title: 'Purchase order generated',
          description: 'Thanks for choosing us!',
        });

        setTimeout(() => {
          cart.clear();
          router.push('/invoices');
        }, DELAY_REDIRECT);
      } catch (error) {
        throw new SendInvoiceEmailError(
          'There was an error sending the email!'
        );
      }
    }

    async function sendPaypalEmail(
      order: OrderResponseBody,
      items: CartItem[]
    ) {
      try {
        const emailProducts = getEmailProducts(items);
        const created = new Date(order.create_time).toLocaleDateString();
        const amountPayed = `$${order.purchase_units[0].amount.value.toString()} USD`;

        const merchant = getMerchantObject({
          orderId: order.id,
          payed: amountPayed,
          date: created,
          tableData: emailProducts,
        });

        const receipt = getReceiptObject({
          orderId: order.id,
          payed: amountPayed,
          date: created,
          tableData: emailProducts,
        });

        await Promise.all([
          services.sendReceiptEmail(receipt),
          services.sendMerchantEmail(merchant),
        ]);

        useToast().add({
          icon: 'i-ph-check',
          title: 'Purchase order generated',
          description: 'Thanks for choosing us!',
        });

        setTimeout(() => {
          cart.clear();
          router.push('/invoices');
        }, DELAY_REDIRECT);
      } catch (error) {
        throw new SendInvoiceEmailError(
          'There was an error sending the email!'
        );
      }
    }

    async function sendVisaEmail(products: CartItem[], payment: Payment) {
      try {
        const emailProducts = getEmailProducts(products);
        const created = new Date(payment?.createdAt ?? '').toLocaleDateString();
        const amountPayed = `$${
          Number(payment!.amount_money!.amount) / 100
        } USD`;

        const merchant = getMerchantObject({
          orderId: payment.id as string,
          payed: amountPayed,
          date: created,
          tableData: emailProducts,
        });

        const receipt = getReceiptObject({
          orderId: payment.id as string,
          payed: amountPayed,
          date: created,
          tableData: emailProducts,
          email: auth.user.email,
          customer: payment.note,
        });

        await Promise.all([
          services.sendReceiptEmail(receipt),
          services.sendMerchantEmail(merchant),
        ]);

        useToast().add({
          icon: 'i-ph-check',
          title: 'Purchase order generated',
          description: 'Thanks for choosing us!',
        });

        setTimeout(() => {
          cart.clear();
          router.push('/invoices');
        }, DELAY_REDIRECT);
      } catch (error) {
        throw new SendInvoiceEmailError(
          'There was an error sending the email!'
        );
      }
    }

    return {
      invoice,
      invoices,
      products,
      mapped,
      fetchInvoices,
      loadInvoiceProducts,
      createPaypalInvoice,
      createInvoiceReport,
      createVisaInvoice,
      sendEmail,
      sendPaypalEmail,
      sendVisaEmail,
    };
  },
  {
    persist: true,
  }
);
