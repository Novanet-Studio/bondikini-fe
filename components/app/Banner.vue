<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <div class="banner">
    <div class="banner__wrapper">
      <div class="banner__slider">
        <LazyAppSlider :items="appConfig.home.sliders" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Set color for swiper arrows */
:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 2rem;
  --swiper-navigation-color: #161824;
  @apply transition;
}

:global(.swiper-button-next:hover),
:global(.swiper-button-prev:hover) {
  --swiper-navigation-color: #e36d65;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  --swiper-navigation-sides-offset: 0;
  @apply p-8 transition hover:bg-primary;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  --swiper-navigation-color: #161824;
}

.banner__slider {
  @apply w-full;
}
</style>
