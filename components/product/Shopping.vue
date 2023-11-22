<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const productStore = useProductStore();
const selectedSize = ref<SizeStock>();

const product = inject(injectKeys.productDetail) as Ref<Product>;

const productHasSize = computed(
  () =>
    product.value.size_stock?.length &&
    product.value.size_stock.filter(
      (size) =>
        !size.talla.toLocaleLowerCase().includes('no_aplica') &&
        size.inventario > 0
    ).length
);

const productHasStock = computed(
  () =>
    product.value.size_stock?.length &&
    product.value.size_stock.filter((stock) => stock.inventario > 0).length
);

const actions = ref<{
  handleAddToCart: (isBuyNow?: boolean) => void;
} | null>(null);

onMounted(async () => {
  if (product.value.id) {
    await productStore.getById(product.value.id);
  }
});
</script>

<template>
  <div class="mt-4">
    <div class="mt-2 lg:mt-8" v-if="productHasSize">
      <div class="font-bold text-color-6 lg:text-xl">Sizes</div>
      <ProductSizes v-model="selectedSize" />
    </div>

    <ProductActions
      ref="actions"
      :size="selectedSize!"
      :disabled="!productHasStock"
    />

    <div class="flex justify-center mt-8 md:justify-start">
      <UButton
        color="color-3"
        label="Buy"
        class="px-8"
        size="lg"
        :ui="{
          rounded: 'rounded-full',
        }"
        @click="actions?.handleAddToCart(true)"
      />
    </div>
  </div>
</template>
