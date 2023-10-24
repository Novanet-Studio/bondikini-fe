<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

interface Props {
  class?: string;
}

defineProps<Props>();

const product = inject(injectKeys.product) as Product;
const imageUrl = computed(() => product?.images[0].url);
</script>

<template>
  <nuxt-link :class="class" :to="`/product/${product.id}`">
    <nuxt-img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="product.name"
      :placeholder="[208, 232, 10]"
      sizes="sm:0.625em md:13.125em"
      fit="outside"
      class="h-full w-full object-cover"
    />
  </nuxt-link>
</template>
