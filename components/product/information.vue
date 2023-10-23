<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div>
    <h4 class="hidden md:block font-bold mb-2">{{ product?.name }}</h4>
    <div class="text-sm font-bold lg:(text-base mb-1)">Descripcion</div>
    <p class="text-xs lg:text-sm">
      {{ product?.description ?? 'No hay descripcion' }}
    </p>
  </div>
</template>
