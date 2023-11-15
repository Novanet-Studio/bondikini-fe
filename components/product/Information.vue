<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="product__information">
    <h4 class="product__name">
      {{ product?.name }}
    </h4>
    <div class="product__title">Description</div>
    <p class="product__description">
      {{ product?.description ?? 'No hay descripcion' }}
    </p>
  </div>
</template>

<style scoped>
.product__information {
  @apply my-2;
}
.product__name {
  @apply text-xl text-color-6 font-bold mb-3 md:text-2xl lg:text-4xl;
}
.product__title {
  @apply text-color-6 font-bold lg:mb-1 lg:text-xl lg:mt-2;
}
.product__description {
  @apply text-sm text-color-5 lg:text-base;
}
</style>
