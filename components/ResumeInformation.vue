<script setup>
const checkout = useCheckoutStore();
</script>

<template>
  <div class="resume">
    <figure class="resume__content pb-4">
      <div class="resume__wrapper">
        <small class="resume__item-title">Contacto:</small>
        <p class="resume__contact">
          {{ checkout.email }}
        </p>
      </div>
      <NuxtLink to="/checkout" class="resume__link">Change</NuxtLink>
    </figure>
    <!-- <hr class="px-4 my-4" /> -->
    <figure class="resume__content pt-4">
      <div class="resume__wrapper">
        <small class="resume__item-title">Enviar a:</small>
        <p class="resume__address">
          {{ checkout.fullAddress }}
        </p>
      </div>
      <NuxtLink to="/checkout" class="resume__link">Change</NuxtLink>
    </figure>
  </div>
</template>

<style scoped>
.resume {
  @apply mb-8 px-5 py-3 bg-color-4 rounded-sm shadow-md divide-y text-black/50 lg:py-8 lg:px-8;
}

.resume__content {
  @apply mb-0 flex justify-between md:items-center;
}

.resume__wrapper {
  @apply md:w-full md:flex md:flex-row md:gap-4 items-center;
}

.resume__item-title {
  @apply basis-[100%] text-black font-bold text-sm max-w-[40rem] md:flex-initial md:max-w-[20rem] lg:text-lg;
}

.resume__contact {
  @apply basis-[100%] text-sm md:flex-1;
}

.resume__address {
  @apply mt-0 mb-0 basis-[100%] text-sm md:flex-initial;
}

.resume__link {
  @apply text-xs self-center text-color-5 font-bold underline max-w-[40rem] text-right md:text-base;
}
</style>
