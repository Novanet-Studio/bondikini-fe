<script lang="ts" setup>
const wishlistStore = useWishlistStore();
const total = computed(() => wishlistStore?.total ?? 0);
</script>

<template>
  <NuxtLink class="header-actions__link mx-2 md:mx-4" to="/wishlist">
    <UIcon name="i-ph-heart text-4xl" class="text-color-3" />
    <span class="header-actions__indicator-wrapper" v-if="total">
      <i class="header-actions__indicator">{{ total }}</i>
    </span>
  </NuxtLink>
</template>
