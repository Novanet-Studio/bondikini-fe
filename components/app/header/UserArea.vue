<script setup>
const auth = useAuthStore();
const router = useRouter();

// login | register | recover
const mode = ref('login');

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
    <UPopover>
      <div class="user-area__icon-wrapper">
        <UIcon name="i-ph-user" class="user-area__icon" />
        <!-- <NuxtLink to="/auth/login">
        </NuxtLink> -->
      </div>
      <template #panel>
        <AuthLoginNew
          v-if="mode === 'login'"
          @forget-click="mode = 'recover'"
          @new-client-click="mode = 'register'"
        />
        <AuthRegisterNew v-if="mode === 'register'" @login="mode = 'login'" />
        <!-- <div class="p-6" >
          <h5 class="text-center text-xl font-bold">Create account</h5>
          <p class="text-center mt-4 text-sm">
            Please complete your information:
          </p>
          <div class="mt-6">
            <UInput label="Name" placeholder="Name" class="mb-4" />
            <UInput
              label="Last Name"
              type="text"
              placeholder="Last name"
              class="mb-4"
            />
            <UInput
              label="Email"
              type="email"
              placeholder="Email"
              class="mb-4"
            />
            <UInput
              label="Password"
              type="password"
              placeholder="Password"
              class="mb-4"
            />
            <UButton
              class="w-full justify-center"
              label="Signup"
              color="color-3"
              @click="$router.push('/checkout')"
            />
          </div>
          <div class="mt-4">
            <div class="text-sm text-center">
              Already have an account?
              <UButton
                label="Enter here"
                color="black"
                variant="link"
                @click="mode = 'login'"
              />
            </div>
          </div>
        </div> -->
        <div class="p-6" v-if="mode === 'recover'">
          <h5 class="text-center text-xl font-bold">Recover password</h5>
          <p class="text-center mt-4 text-sm">Enter your email:</p>
          <div class="mt-6">
            <UInput
              v-model="email"
              label="Email"
              placeholder="Enter your email"
              class="mb-4"
            />
            <UButton
              class="w-full justify-center"
              label="Recover"
              color="color-3"
            />
          </div>
          <div class="mt-4">
            <div class="text-sm text-center">
              Remember your password?
              <UButton
                label="Back to login"
                color="black"
                variant="link"
                @click="mode = 'login'"
              />
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
  <UDropdown
    :items="items"
    :ui="{
      rounded: 'ring-0 ring-transparent',
      item: {
        disabled: 'cursor-text select-text',
        active: 'bg-color-2 text-color-5',
      },
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
