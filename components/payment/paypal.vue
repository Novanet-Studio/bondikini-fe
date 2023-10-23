<script lang="ts" setup>
import { loadScript, type PayPalNamespace } from '@paypal/paypal-js';

const { $notify } = useNuxtApp();
const { PAYPAL_CLIENT_ID } = useRuntimeConfig().public;

const cart = useCartStore();
const checkout = useCheckoutStore();
const invoice = useInvoiceStore();
const productStore = useProductStore();
const paypalRef = ref();
const tempCartItems = ref(cart.cartItems);

const loadPaypal = async () => {
  try {
    const $paypal = (await loadScript({
      // 'client-id': PAYPAL_CLIENT_ID,
      // 'data-namespace': '$paypal',
      // 'disable-funding': 'credit,card',
      clientId: PAYPAL_CLIENT_ID,
      currency: 'USD',
      dataNamespace: '$paypal',
      disableFunding: 'credit,card',
    })) as PayPalNamespace;

    if ($paypal.Buttons) {
      await $paypal
        .Buttons({
          async onClick() {
            const [validProducts, noStockProducts] =
              await productStore.checkStock();

            if (noStockProducts.length) {
              noStockProducts.forEach((product) => {
                $notify({
                  group: 'all',
                  title: 'Error',
                  text: `El producto ${product.name} está agotado o superas la cantidad disponible`,
                });
              });
              return;
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
              const container = document.getElementById('paypal-container');
              const result = await actions.order?.capture();
              container!.innerHTML = '';
              container!.innerHTML = `<h4 class="text-center">Por favor, espere</h4>`;

              if (result?.status !== 'COMPLETED') {
                $notify({
                  group: 'all',
                  title: 'Un error ha ocurrido',
                  text: 'Hubo un error al aprovar el pago',
                });
                return;
              }

              $notify({
                group: 'all',
                title: '¡Proceso exitoso!',
                text: 'El pago se ha realizado con éxito',
              });

              await invoice.createPaypalInvoice(result, tempCartItems.value);
              await productStore.update();
              $notify({
                group: 'all',
                title: 'Recibo creado',
                text: 'Se encuentra disponible en sus ordenes',
              });

              await invoice.sendPaypalEmail(result, tempCartItems.value);
            } catch (error) {
              $notify({
                group: 'all',
                title: 'Pagos paypal',
                text: `Hubo un error al procesar el pago!`,
              });
            }
          },
          onError: () => {
            const container = document.getElementById('paypal-container');
            $notify({
              group: 'all',
              title: 'Pagos paypal',
              text: `Hubo un error, no se puede procesar el pago en estos momentos!`,
            }),
              (container!.innerHTML = `<h4 class="text-center">Hubo un error!</h4>`);
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
  <div ref="paypalRef" id="paypal-container"></div>
</template>
