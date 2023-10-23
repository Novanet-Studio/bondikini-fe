<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Órdenes de compra';

const invoice = useInvoiceStore();
</script>

<template>
  <section class="invoices">
    <h5
      class="text-sm font-bold text-color-7 text-center mb-12 md:(mt-24 text-base)"
      v-if="!invoice.invoices.length"
    >
      No hay órdenes de compra
    </h5>
    <div class="invoices__content">
      <invoices-table />
    </div>
  </section>
</template>

<style scoped>
.invoices {
  @apply lg:(ml-8 w-full);
}

.invoices__content {
  @apply p-5 bg-white;
}
</style>
