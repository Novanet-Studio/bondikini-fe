<script setup lang="ts">
definePageMeta({
  middleware: 'authentication',
});
</script>

<template>
  <section class="checkout">
    <header class="checkout__header">
      <h4 class="checkout__title">Checkout information</h4>
    </header>
    <div class="checkout__content">
      <div class="checkout__main">
        <CheckoutInformationForm />
      </div>
      <div class="checkout__aside">
        <AppOrderSummary />
      </div>
    </div>
  </section>
</template>

<style scoped>
.checkout {
  @apply py-10 px-3 container;
}

.checkout__header {
  @apply relative flex flex-col border-b-color-1 py-4 md:mt-14 lg:mt-4 lg:pt-0 border-b-2;
}

.checkout__title {
  @apply text-xl leading-6 max-w-xs font-bold md:text-3xl  lg:leading-10 lg:max-w-md text-color-6;
}

.checkout__content {
  @apply flex flex-col-reverse gap-8 md:flex-row md:gap-4 lg:gap-8 md:mt-12;
}

.checkout__main {
  @apply flex-[0_0_100%] md:flex-[0_0_65%] lg:flex-[0_0_60%];
}

.checkout__aside {
  @apply mt-6 flex-[0_0_100%] md:flex-[0_0_35%] lg:flex-[0_0_30%] md:mt-0;
}
</style>
