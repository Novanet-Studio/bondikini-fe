<script setup lang="ts">
const token = useStrapiToken();
const authStore = useAuthStore();
const wishListStore = useWishlistStore();
const cartStore = useCartStore();
const globalStore = useGlobalStore();
const router = useRouter();
const { setToken, fetchUser } = useStrapiAuth();

const { showProductQuickView } = storeToRefs(globalStore);

onMounted(async () => {
  if (!token.value && authStore.token) {
    setToken(authStore.token);
    await fetchUser();
    return;
  }

  if (
    (!token.value && !authStore.token && wishListStore.items.length) ||
    cartStore.cartItems.length
  ) {
    useToast().add({
      icon: 'i-ph-warning',
      title: 'Session expired',
      description: 'Your session has expired. Please login again',
      color: 'orange',
    });
    authStore.logout(false);
    showProductQuickView.value = false;
    router.push('/auth/login');
    return;
  }

  if (
    (!token.value && !authStore.token && !wishListStore.items.length) ||
    !cartStore.cartItems.length
  ) {
    showProductQuickView.value = false;
    wishListStore.$reset();
    cartStore.$reset();
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
