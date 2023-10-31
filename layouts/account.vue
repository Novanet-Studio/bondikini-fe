<script setup lang="ts">
const sectionTitle = ref('');

provide('sectionTitle', sectionTitle);
</script>

<template>
  <div class="account">
    <div class="account__wrapper">
      <div class="account__main">
        <div class="account__main-wrapper">
          <AppHeader />
          <section class="account__section">
            <div class="container">
              <div class="b-header">
                <h1 class="b-title">
                  {{ sectionTitle }}
                </h1>
              </div>
              <div class="md:grid md:grid-cols-[20rem_1fr] md:gap-6 md:mt-8">
                <div class="mb-8">
                  <AccountLinks />
                </div>
                <div class="container">
                  <NuxtPage />
                </div>
              </div>
            </div>
          </section>
          <AppFooter />
          <UNotifications />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account {
  @apply flex relative;
}

.account__wrapper {
  @apply flex-auto flex flex-col min-h-screen max-w-full relative;
}

.account__main {
  @apply flex flex-[1_0_auto] max-w-full transition ease-[cubic-bezier(0.4,0,0.2,1)];
}

.account__main-wrapper {
  @apply flex-auto max-w-full relative;
}

.account__section {
  @apply py-12 mb-20;
}
</style>
