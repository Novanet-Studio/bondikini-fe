<script setup>
const isOpen = ref(false);
</script>

<template>
  <nav class="navigation">
    <div class="navigation__wrapper">
      <button @click="isOpen = !isOpen" aria-label="Toggle navigation">
        <div class="i-ph-list text-white text-2xl lg:hidden"></div>
      </button>
      <div class="navigation__content" :class="[isOpen ? 'flex' : 'hidden']">
        <app-header-menu />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  @apply relative flex flex-wrap items-center justify-between px-4 py-2 bg-color-2 md:py-4 lg:(px-0 py-0);
}

.navigation__wrapper {
  @apply flex flex-col items-center justify-between w-full lg:(mx-auto px-34);
}

.navigation__content {
  @apply w-full text-center justify-center mt-4 flex-[1_0_100%] lg:(flex justify-start mt-0);
}
</style>
