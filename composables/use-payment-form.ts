import { object, string, minLength, any, type Output } from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { PaymentReportError, SendInvoiceEmailError } from '~/errors';

type Form = {
  name: string;
  lastName: string;
  date: string;
  amount: string;
  confirmation: string;
};

interface Params {
  equalAmountTo: string;
  method: PaymentMethod;
  payment: {
    validation: (form: Form) => boolean;
    message: string;
  };
}

interface UsePaymentForm {
  schema: any;
  state: any;
  isSending: Ref<boolean>;
  hasError: Ref<boolean>;
  submit: (event: FormSubmitEvent<FormData>) => Promise<void>;
}

export default function usePaymentForm({
  equalAmountTo,
  method,
  payment,
}: Params): UsePaymentForm {
  if (!equalAmountTo || !method || !payment?.message || !payment?.validation) {
    throw new Error('usePaymentForm: All parameters are required');
  }

  const isSending = useState('isSending', () => false);
  const hasError = useState('hasError', () => false);

  const cart = useCartStore();
  const invoice = useInvoiceStore();
  const productStore = useProductStore();

  const state = reactive({
    name: '',
    lastName: '',
    date: '',
    amount: '',
    confirmation: '',
  });

  const schema = object({
    name: string([minLength(1, 'Field is required')]),
    lastName: string([minLength(1, 'Field is required')]),
    date: string([minLength(1, 'Field is required')]),
    amount: string(),
    confirmation: string([minLength(1, 'Field is required')]),
  });

  type FormData = Output<typeof schema>;

  async function submit({ data }: FormSubmitEvent<FormData>) {
    try {
      isSending.value = true;

      if (payment.validation(data)) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Error',
          description: payment.message,
          color: 'red',
        });
        return;
      }

      const [validProducts, noStockProducts] = await productStore.checkStock();

      if (noStockProducts.length) {
        noStockProducts.forEach((product) => {
          useToast().add({
            icon: 'i-ph-warning',
            title: 'Error',
            description: `The product ${product.name} is out of stock or you exceed the available quantity`,
            color: 'red',
          });
        });

        useToast().add({
          icon: 'i-ph-info',
          title: 'Help',
          description: `Please go to the cart and remove the products that are out of stock or exceed the available quantity`,
          color: 'blue',
        });

        return;
      }

      const paymentData: PaymentObject = {
        orderId: crypto.randomUUID(),
        name: data.name,
        lastname: data.lastName,
        confirmation: data.confirmation,
        amount: equalAmountTo,
        paymentDate: data.date,
      };

      const invoiceItems = cart.cartItems;
      await productStore.update();
      await invoice.createInvoiceReport(paymentData, invoiceItems, method);

      useToast().add({
        icon: 'i-ph-check',
        title: 'Success',
        description: 'The order has been generated, it is pending approval',
        color: 'green',
      });

      await invoice.sendEmail(invoiceItems, paymentData);
    } catch (error) {
      if (error instanceof PaymentReportError) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Error',
          description: 'There was an error reporting your payment',
          color: 'red',
        });
      }

      if (error instanceof SendInvoiceEmailError) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Error',
          description: 'There was an error sending email',
          color: 'red',
        });
      }
    } finally {
      isSending.value = false;
    }
  }

  return {
    isSending,
    state,
    schema,
    submit,
  };
}
