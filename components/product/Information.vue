<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="my-2">
    <h4 class="text-xl text-color-6 font-bold mb-3">{{ product?.name }}</h4>
    <div class="text-color-6 font-bold lg:text-base lg:mb-1">Description</div>
    <p class="text-sm text-color-5 lg:text-sm">
      {{ product?.description ?? 'No hay descripcion' }}
    </p>
  </div>
</template>
