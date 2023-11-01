<template>
  <div class="default">
    <div class="default__wrapper">
      <AppHeader />
      <div class="default__back" v-if="$route.path.includes('product')">
        <button @click="$router.push('/')">Volver</button>
      </div>
      <main class="default__main">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
