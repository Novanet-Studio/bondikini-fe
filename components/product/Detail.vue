<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail);

const showLightbox = ref(false);
</script>

<template>
  <section class="container">
    <h4
      class="font-bold text-lg py-8 pb-2 md:text-2xl text-color-6 border-b-2 border-b-color-1"
    >
      {{ product?.category.name }}
    </h4>
    <div class="mb-8 py-4">
      <div class="flex flex-col bg-color-4 shadow-xl md:flex-row md:gap-6">
        <ThumbnailDefault @show-lightbox="showLightbox = true" />
        <ProductInformationDefault />
      </div>
    </div>
  </section>
</template>
