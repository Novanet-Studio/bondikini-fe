<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail);

const showLightbox = ref(false);
</script>

<template>
  <section class="container lg:max-w-5xl">
    <h4 class="font-800 text-lg py-8 md:text-2xl">
      {{ product?.category.name }}
    </h4>
    <div class="app-gradient mb-8 p-4">
      <div class="flex flex-col md:(flex-row gap-6)">
        <h5 class="text-center mb-4 text-sm font-bold md:hidden">
          {{ product?.name }}
        </h5>
        <thumbnail-default @show-lightbox="showLightbox = true" />
        <product-information-default />
        <lightbox v-model="showLightbox" :images="product!.images" />
      </div>
    </div>
  </section>
</template>
