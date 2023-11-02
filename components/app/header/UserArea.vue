<script setup>
const auth = useAuthStore();
const router = useRouter();

const items = [
  [
    {
      label: 'Orders',
      icon: 'i-ph-receipt',
      click: () => {
        router.push('/invoices');
      },
    },
    {
      label: 'Directions',
      icon: 'i-ph-road-horizon',
      click: () => {
        router.push('/addresses');
      },
    },
    {
      label: 'Shopping cart',
      icon: 'i-ph-shopping-cart',
      click: () => {
        router.push('/shopping-cart');
      },
    },
    {
      label: 'Wishilist',
      icon: 'i-ph-heart',
      click: () => {
        router.push('/wishlist');
      },
    },
  ],
  [{ label: 'Sign out', icon: 'i-ph-sign-out', click: () => auth.logout() }],
];
</script>

<template>
  <div v-if="!auth.authenticated" class="user-area">
    <div class="user-area__icon-wrapper">
      <NuxtLink to="/auth/login">
        <UIcon name="i-ph-user" class="user-area__icon" />
      </NuxtLink>
    </div>

    <div class="user-area__links-group">
      <NuxtLink to="/auth/login" class="user-area__link">Login</NuxtLink>
      <NuxtLink to="/auth/register" class="user-area__link">Sign up</NuxtLink>
    </div>
  </div>
  <UDropdown
    :items="items"
    :ui="{
      rounded: 'ring-0 ring-transparent',
      item: { disabled: 'cursor-text select-text' },
    }"
    :popper="{ placement: 'bottom-start' }"
    v-else
  >
    <UIcon name="i-ph-user" class="user-area__icon" />
    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
  <!--  -->
</template>

<style scoped>
.user-area {
  @apply flex flex-nowrap text-left cursor-pointer ml-1;
}

.user-area__links-group {
  @apply hidden pl-[0.25em] md:pl-[0.625em] lg:block;
}

.user-area__link {
  @apply text-xs block font-bold md:text-sm;
}

.user-area__menu {
  @apply mx-5 relative cursor-pointer;
}

.user-area__icon {
  @apply text-4xl text-color-3 ml-2;
}
</style>
