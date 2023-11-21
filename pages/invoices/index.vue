<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Purchase orders';

const invoice = useInvoiceStore();
const router = useRouter();

// Pagination
const page = ref(1);
const pageCount = ref(5);
const pageTotal = ref(10);
const pageFrom = computed(() => (page.value - 1) * pageCount.value);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

const columns = [
  {
    key: 'id',
    label: '#',
  },
  {
    key: 'bill',
    label: 'Bill',
  },
  {
    key: 'amount',
    label: 'Amount',
  },
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'status',
    label: 'Status',
  },
];

function select(row: Invoice) {
  invoice.invoice = row;
  router.push(`/invoices/${row.id}`);
}

interface FetchInvoicesReturn {
  data: Invoice[] | undefined;
  meta: Meta | null;
}

const { data: invoices, pending } = await useLazyAsyncData<FetchInvoicesReturn>(
  'invoices',
  () => {
    const id = String(useAuthStore().user.id);
    return invoice.fetchInvoices(id, {
      page: page.value,
      pageSize: pageCount.value,
    });
  },
  {
    default: () => ({
      data: [],
      meta: null,
    }),
    watch: [page, pageCount],
  }
);

const userInvoices = computed(
  () =>
    invoices.value.data?.map((invoice) => ({
      ...invoice,
      id: invoice.id,
      bill: invoice.fullName,
      amount: invoice.amount,
      date: new Date(invoice?.createdAt ?? '').toLocaleDateString('en-US'),
      status: invoice.paid ? 'Paid' : 'Pending',
    }))
);

onMounted(async () => {
  await invoice.fetchInvoices(String(useAuthStore().user.id));
});

watchEffect(() => {
  console.log(invoices.value);
});
</script>

<template>
  <section class="invoices">
    <UTable
      :rows="userInvoices"
      :columns="columns"
      @select="select"
      :ui="{
        thead: '[&>tr]:!bg-color-2  [&>tr]:!text-color-5',
        divide: 'divide-white divide-y-2',
        tbody: 'divide-white divide-y-2',
        tr: {
          base: 'odd:bg-[#f7f6f5] even:bg-[#E6E7E8]',
        },
      }"
      :loading="pending"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'There are no purchase orders',
      }"
    >
      <template #loading-state>
        <div class="flex flex-col items-center justify-center mt-12">
          <AppLoader />
          <span>Loading...</span>
        </div>
      </template>
    </UTable>

    <div class="flex flex-wrap justify-between items-center mt-8">
      <div>
        <span class="text-sm leading-5">
          Showing
          <span class="font-medium">{{ pageFrom }}</span>
          to
          <span class="font-medium">{{ pageTo }}</span>
          of
          <span class="font-medium">{{ pageTotal }}</span>
          results
        </span>
      </div>

      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="pageTotal"
        :ui="{
          wrapper: 'flex items-center gap-1',
          rounded: '!rounded-none min-w-[32px] justify-center',
          default: {
            activeButton: {
              variant: 'outline',
              color: 'color-3',
            },
          },
        }"
      />
    </div>
  </section>
</template>

<style scoped>
.invoices {
  @apply mt-12 lg:ml-8 lg:w-full lg:mt-6;
}
</style>
