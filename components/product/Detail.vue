<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail);

const showLightbox = ref(false);
</script>

<template>
  <section class="product-wrapper">
    <h4 class="product-category-name">
      {{ product?.category.name }}
    </h4>

    <div class="product-detail">
      <ThumbnailDefault @show-lightbox="showLightbox = true" />
      <ProductInformationDefault />
    </div>
  </section>
</template>

<style scoped>
.product-wrapper {
  @apply mx-4 lg:container;
}
.product-detail {
  @apply flex flex-col bg-color-4 shadow-xl md:flex-row mb-8 py-4;
}
.product-category-name {
  @apply font-bold text-lg py-8 pb-2 md:text-2xl text-color-6 border-b-2 border-b-color-1;
}
</style>
