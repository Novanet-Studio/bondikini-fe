<script lang="ts" setup>
const invoiceStore = useInvoiceStore();
const pdfSection = ref<HTMLElement | undefined>(undefined);
const isLoading = ref(false);

definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

onMounted(async () => {
  try {
    isLoading.value = false;
    await invoiceStore.loadInvoiceProducts();
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="ml-2 w-full">
    <section class="py-0">
      <div class="max-w-3xl mx-auto py-4 bg-white shadow-lg" ref="pdfSection">
        <article class="overflow-hidden">
          <div class="bg-[white] rounded-b-md">
            <div class="p-9">
              <div class="space-y-6 text-slate-700">
                <p
                  class="text-xl font-extrabold tracking-tight uppercase font-body"
                >
                  Bondikini
                </p>
              </div>
            </div>
            <div class="p-9">
              <div class="flex w-full">
                <div class="grid grid-cols-4 gap-12">
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">
                      Bill detail:
                    </p>
                    <p>{{ invoiceStore.invoice?.fullName }}</p>
                    <p>{{ invoiceStore.invoice.shippingAddress.locality }},</p>
                    <p>{{ invoiceStore.invoice.shippingAddress.country }}</p>
                    <p>{{ invoiceStore.invoice.shippingAddress.home }}</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">Status</p>
                    <p v-if="invoiceStore.invoice?.paid" class="mb-0">Paid</p>
                    <p class="mb-0" v-else>Pending</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700"># Bill</p>
                    <p>{{ invoiceStore.invoice?.id }}</p>

                    <p class="mt-2 text-sm font-normal text-slate-700">
                      Payment date
                    </p>
                    <p>{{ invoiceStore.invoice?.date }}</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <template
                      v-if="invoiceStore.invoice?.cardKind !== 'no aplica'"
                    >
                      <p class="text-sm font-normal text-slate-700">Payment</p>

                      <p>
                        {{ invoiceStore.invoice?.cardKind }},
                        {{ invoiceStore.invoice?.cardType }}, {{ '*'.repeat(12)
                        }}{{ invoiceStore.invoice?.cardLast }}
                      </p>
                    </template>
                    <template v-else>
                      <p class="mt-2 text-sm font-normal text-slate-700">
                        Payment
                      </p>
                      <p>{{ invoiceStore.invoice?.payment_method || '---' }}</p>
                      <p class="mt-2 text-sm font-normal text-slate-700">
                        Confirmation number
                      </p>
                      <p>
                        {{
                          invoiceStore.invoice?.payment_info[0]?.confirmacion
                        }}
                      </p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-9">
              <div class="flex flex-col mx-0 mt-4">
                <table class="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border-b border-slate-200"
                      v-for="(product, index) in invoiceStore.products"
                      :key="product.name"
                    >
                      <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div class="font-medium text-slate-700">
                          {{ product?.name }}
                        </div>
                        <div class="mt-0.5 text-slate-500 sm:hidden">
                          1 unit at {{ product?.price }}
                        </div>
                      </td>
                      <td
                        class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell"
                      >
                        {{ invoiceStore.invoice?.products[index].quantity }}
                      </td>
                      <td
                        class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell"
                      >
                        ${{ product.price }}
                      </td>
                      <td
                        class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0"
                      >
                        ${{ product.price }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colspan="3"
                        class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                      >
                        Total
                      </th>
                      <td
                        class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0"
                      >
                        ${{ invoiceStore.invoice?.amount }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div
        class="max-w-5xl mx-auto py-6 mt-12 bg-transparent flex justify-end gap-4"
      >
        <UButton
          class="!border-color-1 hover:!border-color-1-700"
          variant="outline"
          size="lg"
          :ui="{ rounded: 'rounded-sm' }"
          @click="$router.push('/invoices')"
          >Go back</UButton
        >
        <UButton
          class="!bg-color-1 hover:!bg-color-1-700"
          size="lg"
          :ui="{ rounded: 'rounded-sm' }"
          @click="
            exportToPDF(
              `bill-${invoiceStore.invoice?.id}`,
              pdfSection,
              {
                format: 'a4',
                unit: 'px',
              },
              {
                margin: 10,
                image: { type: 'jpeg', quality: 8 },
                width: 600,
                windowWidth: 780,
              }
            )
          "
          >Generate PDF</UButton
        >
      </div>
    </section>
  </section>
</template>
