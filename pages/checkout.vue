<script setup lang="ts">
definePageMeta({
  middleware: 'authentication',
});
</script>

<template>
  <section class="checkout">
    <header class="checkout__header">
      <h4 class="checkout__title">Informacion de facturación</h4>
    </header>
    <div class="checkout__content">
      <div class="checkout__main">
        <checkout-information-form />
      </div>
      <div class="checkout__aside">
        <app-order-summary />
      </div>
    </div>
  </section>
</template>

<style scoped>
.checkout {
  @apply w-full py-10 px-3 container;
}

.checkout__header {
  @apply mb-12 text-center md:pt-10;
}

.checkout__title {
  @apply text-sm font-bold text-black md:text-xl lg:text-2xl;
}

.checkout__content {
  @apply flex flex-col-reverse gap-8 md:(flex-row gap-4) lg:gap-8;
}

.checkout__main {
  @apply flex-[0_0_100%] md:flex-[0_0_65%] lg:flex-[0_0_60%];
}

.checkout__aside {
  @apply flex-[0_0_100%] md:flex-[0_0_35%] lg:flex-[0_0_30%];
}
</style>
