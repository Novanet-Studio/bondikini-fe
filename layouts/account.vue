<script setup lang="ts">
  const sectionTitle = ref('');

  provide('sectionTitle', sectionTitle);
</script>

<template>
  <client-only>
    <div class="account">
      <div class="account__wrapper">
        <div class="account__main">
          <div class="account__main-wrapper">
            <AppHeader />
            <section class="account__section">
              <div class="container">
                <div
                  class="relative mt-10 md:mt-18 flex flex-col items-center lg:p-10 lg:mt-4 lg:pt-0"
                >
                  <h1
                    class="text-xl leading-6 max-w-xs font-800 md:text-3xl md:max-w-[18rem] lg:leading-12 lg:max-w-md"
                  >
                    {{ sectionTitle }}
                  </h1>
                </div>
                <div class="md:grid md:grid-cols-[25%_1fr] md:gap-6 md:mt-12">
                  <div class="mb-8">
                    <AccountLinks />
                  </div>
                  <div class="account__content">
                    <NuxtPage />
                  </div>
                </div>
              </div>
            </section>
            <AppFooter />
            <AppNotify />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped>
  .account {
    @apply flex relative;
  }

  .account__wrapper {
    @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative;
  }

  .account__main {
    @apply flex flex-[1_0_auto] max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)];
  }

  .account__main-wrapper {
    @apply flex-auto max-w-full relative;
  }

  .account__section {
    @apply py-12 mb-20;
  }
</style>
