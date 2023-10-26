<script setup>
const isOpen = ref(false);
</script>

<template>
  <nav class="navigation">
    <div class="navigation__wrapper">
      <button @click="isOpen = !isOpen" aria-label="Toggle navigation">
        <div class="navigation__icon"></div>
      </button>
      <div class="navigation__content" :class="[isOpen ? 'flex' : 'hidden']">
        <app-header-menu />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  @apply md:flex md:flex-wrap md:items-center md:justify-between bg-color-1;
}

.navigation__wrapper {
  @apply flex flex-col  lg:container;
}

.navigation__icon {
  @apply i-ph-list  text-white text-2xl mt-2 md:hidden;
}

.navigation__content {
  @apply w-full text-center justify-center flex-[1_0_100%] md:flex md:justify-start;
}
</style>
