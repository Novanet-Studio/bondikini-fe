<script setup lang="ts">
const appConfig = useAppConfig();
const widgets = appConfig.footer.widgets;

const icons: { [key: string]: string } = {
  instagram: 'i-ph-instagram-logo-duotone',
  whatsapp: 'i-ph-whatsapp-logo-duotone',
  email: 'i-ph-envelope-duotone',
  facebook: 'i-ph-facebook-logo-duotone',
  phone: 'i-ph-device-mobile-duotone',
};
</script>

<template>
  <div class="widgets">
    <aside class="widgets__wrapper">
      <h3 class="widgets__title">Contact us</h3>
      <ul class="widgets__list">
        <li v-for="(item, index) in widgets" :key="index" class="widgets__item">
          <a class="widgets__link" :href="item.link" target="_blank">
            <div :class="icons[item.icon]" class="widgets__icon" />
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.widgets {
  @apply pb-4 lg:mx-4 lg:mx-auto;
}

.widgets__wrapper {
  @apply max-w-full w-full relative pb-5 mb-5 flex flex-col items-center;
}

.widgets__title {
  @apply text-2xl pb-2 font-bold text-color-6 lg:text-3xl lg:pb-4;
}

.widgets__list {
  @apply w-full flex justify-center gap-4 mt-2 md:mt-4 md:gap-6;
}

.widgets__link {
  @apply w-[3.6875rem] h-[4.375rem] rounded-b-full bg-color-1 p-4 flex items-center;
}

.widgets__icon {
  @apply text-3xl text-color-3;
}
</style>
