<template>
  <header>
    <div class="header__wrapper">
      <div class="header__container">
        <div class="header__brand">
          <nuxt-link class="header__link" to="/">
            <nuxt-img src="/logo.png" alt="Bondikini Logo" />
          </nuxt-link>
        </div>
        <div class="header__content">
          <app-header-actions />
        </div>
      </div>
    </div>
    <app-header-navigation />
  </header>
</template>

<style scoped>
.header__wrapper {
  @apply py-4 bg-white;
}

.header__container {
  @apply flex items-center justify-between xs:max-md:mx-2 md:max-lg:mx-4 lg:container;
}

.header__link {
  @apply cursor-pointer;
}

.header__link img {
  @apply w-24;
}
</style>
