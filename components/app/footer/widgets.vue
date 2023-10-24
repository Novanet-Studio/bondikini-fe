<script setup>
  const appConfig = useAppConfig();
  const widgets = appConfig.footer.widgets;

  const icons = {
    instagram: 'i-ph-instagram-logo',
    whatsapp: 'i-ph-whatsapp-logo',
    email: 'i-ph-envelope',
    facebook: 'i-ph-facebook-logo',
  };
</script>

<template>
  <div class="widgets">
    <aside class="widgets__wrapper">
      <h3 class="widgets__title">Contáctanos</h3>
      <ul class="widgets__list">
        <li v-for="(item, index) in widgets" :key="index" class="widgets__item">
          <a class="widgets__link" :href="item.link" target="_blank">
            <div :class="icons[item.icon]" class="text-3xl text-color-3" />
            <span class="text-xs md:text-sm">{{ item.text }}</span>
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
    @apply text-2xl pb-2 font-bold text-black font-black lg:text-3xl lg:pb-4;
  }

  .widgets__list {
    @apply w-full flex justify-center gap-4 mt-2 md:mt-4 md:gap-6;
  }

  .widgets__link {
    @apply flex flex-col text-lg items-center gap-2 md:flex-row md:text-xl;
  }
</style>
