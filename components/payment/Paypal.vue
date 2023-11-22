<script lang="ts" setup>
import { loadScript, type PayPalNamespace } from '@paypal/paypal-js';

const { PAYPAL_CLIENT_ID } = useRuntimeConfig().public;

const cart = useCartStore();
const invoice = useInvoiceStore();
const checkout = useCheckoutStore();
const productStore = useProductStore();

const paypalRef = ref();
const tempCartItems = ref(cart.cartItems);
const containerMessage = ref('');

const loadPaypal = async () => {
  try {
    const $paypal = (await loadScript({
      clientId: PAYPAL_CLIENT_ID,
      currency: 'USD',
      dataNamespace: '$paypal',
      disableFunding: 'credit,card',
    })) as PayPalNamespace;

    if ($paypal.Buttons) {
      await $paypal
        .Buttons({
          style: {
            disableMaxWidth: true,
          },
          async onClick(data, actions) {
            const [validProducts, noStockProducts] =
              await productStore.checkStock();

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

              return actions.reject();
            }

            const invoiceItems: CartItem[] = cart.cartItems.filter((item) => {
              return validProducts.find((product) => product.id === item.id);
            });

            tempCartItems.value = invoiceItems;
          },
          createOrder: (_, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  description: 'Compra desde la app',
                  amount: {
                    currency_code: 'USD',
                    value: cart.amount.toString(),
                  },
                  shipping: {
                    address: {
                      address_line_1: checkout.address,
                      admin_area_1: checkout.home,
                      admin_area_2: checkout.city,
                      country_code: 'VE',
                      postal_code: checkout.zipCode,
                    },
                    options: [
                      {
                        id: crypto.randomUUID(),
                        label: 'Pago con tarjeta de crédito',
                        selected: true,
                      },
                    ],
                  },
                  invoice_id: crypto.randomUUID(),
                  custom_id: crypto.randomUUID(),
                },
              ],
            }),
          onApprove: async (_, actions) => {
            try {
              const result = await actions.order?.capture();
              containerMessage.value = 'Please, wait...';

              if (result?.status !== 'COMPLETED') {
                useToast().add({
                  icon: 'i-ph-warning',
                  title: 'Error',
                  description: 'There was an error approving the payment',
                  color: 'red',
                });
                return;
              }

              useToast().add({
                icon: 'i-ph-check',
                title: 'Success',
                description: 'The payment has been made successfully',
                color: 'green',
              });

              await invoice.createPaypalInvoice(result, tempCartItems.value);
              await productStore.update();

              useToast().add({
                icon: 'i-ph-check',
                title: 'Receipt created',
                description: 'It is available on your order',
                color: 'green',
              });

              await invoice.sendPaypalEmail(result, tempCartItems.value);
            } catch (error) {
              useToast().add({
                icon: 'i-ph-warning',
                title: 'Error',
                description: 'There was an error processing the payment!',
                color: 'red',
              });
            }
          },
          onError: () => {
            useToast().add({
              icon: 'i-ph-warning',
              title: 'Error',
              description:
                'There was an error, the payment cannot be processed at this time',
              color: 'red',
            });

            containerMessage.value = 'An error occurred!';
          },
        })
        .render(paypalRef.value);
    }
  } catch (error) {
    console.log('An error occurred when trying render button: ', error);
  }
};

onMounted(async () => {
  await loadPaypal();
});
</script>

<template>
  <div
    class="my-12"
    ref="paypalRef"
    id="paypal-container"
    v-if="!containerMessage"
  ></div>
  <div v-else>
    <h4 class="text-center text-lg text-color-5">{{ containerMessage }}</h4>
  </div>
</template>
