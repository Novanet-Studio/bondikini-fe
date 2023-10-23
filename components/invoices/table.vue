<script lang="ts" setup>
import type {
  CallbackParams,
  CallbackReturn,
} from '~/composables/use-pagination';

const router = useRouter();
const auth = useAuthStore();
const invoice = useInvoiceStore();

const isLoading = ref(false);
const hasInvoices = ref(false);

const { data, total, page, perPage, changePage } =
  usePagination<InvoiceTableDetail>(pagination, {
    perPage: 10,
  });

const goToInvoice = (invoiceId: string, invoiceItem: any) => {
  invoice.invoice = invoiceItem;
  router.push(`/invoices/${invoiceId}`);
};

async function pagination(
  params: CallbackParams
): Promise<CallbackReturn<any>> {
  const page = unref(params.page);
  const pageSize = unref(params.perPage);

  const defaultResponse = {
    total: 0,
    pageCount: 0,
    data: [],
  };

  try {
    isLoading.value = true;
    const result = await invoice.fetchInvoices(auth.user.id.toString(), {
      page,
      pageSize,
    });

    if (!result.data?.length) {
      hasInvoices.value = false;
      return defaultResponse;
    }

    hasInvoices.value = true;

    return {
      total: result.meta?.pagination.total as number,
      pageCount: result.meta?.pagination.pageCount as number,
      data: invoice.mapped,
    };
  } catch (error) {
    console.log('An error occurred while fetching invoices');
    return defaultResponse;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <!-- component -->
  <div
    class="flex flex-col whitespace-nowrap w-22rem max-w-22rem md:(w-full max-w-full)"
  >
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="overflow-hidden relative rounded-3xl shadow shadow-md shadow-gray-300"
        >
          <div
            class="absolute flex w-full justify-center h-full items-center filter-drop-shadow z-10"
            v-if="isLoading"
          >
            <loading class="!bg-color-2" />
          </div>
          <table
            class="min-w-full border-collapse"
            :class="[isLoading && 'filter-blur-[1px]']"
            v-if="hasInvoices && data?.length"
          >
            <thead class="border-b bg-color-3 text-white">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-white px-6 py-4 text-left"
                >
                  Nº
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-white px-6 py-4 text-left"
                >
                  Factura
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-white px-6 py-4 text-left"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-white px-6 py-4 text-left"
                >
                  Monto
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-white px-6 py-4 text-left"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-color-6 even:bg-color-5 border-b transition duration-300 ease-in-out hover:bg-gray-100"
                v-for="item in data"
                :key="item.id"
                @click="goToInvoice(item.id_invoice_user.toString(), item)"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                >
                  {{ item.id_invoice_user }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.payment_id }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.date }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  ${{ item.amount }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <span
                    class="p-2 rounded-md text-xs"
                    :class="item.paid ? 'text-green-5' : 'text-orange-5'"
                    >{{ item.status }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="flex w-full justify-center pt-12">
    <app-pagination
      :current-page="page"
      :per-page="perPage"
      :total="total"
      @change="changePage"
      :disabled="isLoading"
      v-if="total"
    />
  </div>
</template>
