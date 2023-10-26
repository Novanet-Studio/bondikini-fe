<script lang="ts" setup>
  defineProps<{ id: string }>();
</script>

<template>
  <nuxt-link :to="`/product/${id}`" class="title">
    <slot />
  </nuxt-link>
</template>

<style scoped>
  .title {
    @apply m-0 block text-center text-lg lg:text-xl font-extrabold pt-2 pb-1 pl-0 overflow-hidden pr-4 text-black;
  }
</style>
