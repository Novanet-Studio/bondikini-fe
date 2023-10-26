<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="my-2">
    <h4 class="text-xl text-color-6 font-bold mb-3 md:text-2xl lg:text-4xl">
      {{ product?.name }}
    </h4>
    <div class="text-color-6 font-bold lg:mb-1 lg:text-xl lg:mt-2">
      Description
    </div>
    <p class="text-sm text-color-5 lg:text-base">
      {{ product?.description ?? 'No hay descripcion' }}
    </p>
  </div>
</template>
