<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const props = defineProps<{ product: Product }>();

const productStore = useProductStore();
const globalStore = useGlobalStore();

const { showProductQuickView } = storeToRefs(globalStore);

const hasStock = computed(
  () =>
    props.product.size_stock!.reduce((acc, curr) => acc + curr.inventario, 0) >
    0
);

function handleBuyAction() {
  productStore.product = props.product;
  showProductQuickView.value = true;
}

provide(injectKeys.product, props.product);
</script>

<template>
  <UCard
    :ui="{
      background: 'bg-color-4',
      divide: 'divide-none',
      ring: 'ring-0 ring-transparent',
      rounded: 'rounded-sm',
      header: { padding: '!px-0 !py-0' },
    }"
  >
    <template #header>
      <div class="product__item">
        <ProductThumbnailImage />
        <span class="product__price"> ${{ product.price }} </span>
        <span class="product__stock-warning" v-if="!hasStock">No stock </span>
      </div>
    </template>
    <div class="product__info-actions">
      <h5 class="product__title">
        {{ product.name }}
      </h5>
      <UButton
        icon="i-ph-shopping-bag"
        size="lg"
        label="Buy"
        :disabled="!hasStock"
        @click="handleBuyAction"
      />
    </div>
  </UCard>
</template>

<style scoped>
.product__item {
  @apply relative h-72;
}
.product__price {
  @apply absolute top-0 right-4 w-[3.6875rem] h-[4.375rem] rounded-b-full bg-color-3 p-4 flex items-center justify-center text-lg text-color-2;
}
.product__stock-warning {
  @apply absolute top-0 left-0 w-full h-full bg-black/50 p-4 flex items-center justify-center text-2xl text-color-2;
}
.product__info-actions {
  @apply flex flex-col items-center justify-center gap-4;
}
.product__title {
  @apply text-center sm:text-base md:text-lg lg:text-xl text-color-3 font-bold;
}
</style>
