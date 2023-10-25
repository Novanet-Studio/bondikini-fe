<template>
  <div class="default">
    <div class="default__wrapper">
      <div class="default__container">
        <div class="default__content">
          <AppHeader />
          <div
            class="py-4 bg-color-4 px-16 text-xs text-color-5 font-bold flex justify-center md:text-sm lg:justify-initial lg:py-8"
            v-if="$route.path.includes('product')"
          >
            <button
              class="flex items-center gap-1 lg:ml-17"
              @click="$router.go(-1)"
            >
              <span class="i-ph-arrow-left inline-block"></span>Volver
            </button>
          </div>
          <main class="default__main">
            <NuxtPage />
          </main>
          <AppFooter />
          <!-- <AppNotify /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.default {
  @apply flex relative;
}
.default__container {
  @apply transition ease-[cubic-bezier(0.4,0,0.2,1)];
}

.default__wrapper {
  @apply flex-auto flex flex-col min-h-screen max-w-full;
}
.default__content {
  @apply flex-auto transition ease-linear;
}
.default__main {
  @apply transition ease-linear w-full mx-auto md:px-0;
}
</style>
