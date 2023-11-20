<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const MIN_DESCRIPTION_LENGTH = 0;
const MAX_DESCRIPTION_LENGTH = 120;

withDefaults(
  defineProps<{ showTitle?: boolean; shortDescription?: boolean }>(),
  {
    showTitle: true,
    shortDescription: false,
  }
);

const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="product__information">
    <h4 class="product__name" v-if="showTitle">
      {{ product?.name }}
    </h4>
    <div class="product__title">Description</div>
    <p class="product__description" v-if="shortDescription">
      {{
        product?.description.slice(
          MIN_DESCRIPTION_LENGTH,
          MAX_DESCRIPTION_LENGTH
        ) + '...' || 'There is no description'
      }}
    </p>
    <p class="product__description" v-else>
      {{ product?.description ?? 'There is no description' }}
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
