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
      <div class="category__item">
        <ProductThumbnailImage />
        <span
          class="absolute top-0 right-4 w-[3.6875rem] h-[4.375rem] rounded-b-full bg-color-3 p-4 flex items-center justify-center text-lg text-color-2"
        >
          ${{ product.price }}
        </span>

        <span
          class="absolute top-0 left-0 w-full h-full bg-black/50 p-4 flex items-center justify-center text-2xl text-color-2"
          v-if="!hasStock"
        >
          No stock
        </span>
      </div>
    </template>
    <section class="flex flex-col items-center justify-center gap-4">
      <h5 class="text-center text-xl text-color-3 font-bold">
        {{ product.name }}
      </h5>
      <UButton
        icon="i-ph-shopping-bag"
        size="lg"
        label="Buy"
        :disabled="!hasStock"
        @click="handleBuyAction"
      />
    </section>
  </UCard>
</template>

<style scoped>
.category__item {
  @apply h-72 relative;
}
</style>
