<script setup lang="ts">
const token = useStrapiToken();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const router = useRouter();
const { setToken } = useStrapiAuth();

const { showProductQuickView } = storeToRefs(globalStore);

onMounted(async () => {
  if (!authStore.token && (!authStore.user?.id || !authStore.authenticated)) {
    await authStore.refresh();
    return;
  }

  if (!token.value && authStore.token) {
    setToken(authStore.token);
    return;
  }

  if (!token.value && !authStore.token) {
    useToast().add({
      icon: 'i-ph-warning',
      title: 'Session expired',
      description: 'Your session has expired. Please login again',
      color: 'orange',
    });
    showProductQuickView.value = false;
    router.push('/auth/login');
    return;
  }
});
</script>

<template>
  <div class="default">
    <div class="default__wrapper">
      <AppHeader />
      <div class="default__back" v-if="$route.path.includes('product')">
        <button @click="$router.push('/')">Go back</button>
      </div>
      <main class="default__main">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
