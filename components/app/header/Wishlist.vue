<script lang="ts" setup>
const wishlistStore = useWishlistStore();
const total = computed(() => wishlistStore?.total ?? 0);
</script>

<template>
  <NuxtLink class="header-actions__link" to="/wishlist">
    <UIcon name="i-ph-heart" class="header-actions__icon" />
    <span class="header-actions__indicator-wrapper" v-if="total">
      <i class="header-actions__indicator">{{ total }}</i>
    </span>
  </NuxtLink>
</template>
