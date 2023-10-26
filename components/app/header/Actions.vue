<template>
  <div class="header-actions">
    <app-header-wishlist />
    <app-header-mini-cart />
    <app-header-user-area />
  </div>
</template>

<style scoped>
.header-actions {
  @apply flex items-center justify-between;
}

.header-actions__link {
  @apply mx-2;
}

.header-actions__icon {
  @apply text-4xl text-color-3;
}
</style>
