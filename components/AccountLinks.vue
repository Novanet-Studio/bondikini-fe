<script lang="ts" setup>
const global = useGlobalStore();
const auth = useAuthStore();
const route = useRoute();

const links = global.links;
const hasText = (text: string) => route.path.includes(text);

const getIcon = (icon: string) => {
  const icons: { [key: string]: any } = {
    invoices: {
      active: 'i-ph-receipt-fill',
      inactive: 'i-ph-receipt-light',
    },
    address: {
      active: 'i-ph-map-pin-fill',
      inactive: 'i-ph-map-pin-light',
    },
    'shopping-cart': {
      active: 'i-ph-bag-fill',
      inactive: 'i-ph-bag-light',
    },
    wishlist: {
      active: 'i-ph-heart-fill',
      inactive: 'i-ph-heart-light',
    },
  };

  return icons[icon];
};
</script>

<template>
  <ul
    class="border border-white bg-color-4 mt-12 rounded-lg max-w-xs mx-auto md:mt-6 md:mx-0 md:max-w-md"
  >
    <li
      class="border-b-2 border-b-white last:border-b-white"
      v-for="link in links"
      :key="link.text"
      :class="[
        hasText(link?.name) && 'text-white bg-color-3',
        link?.name === 'invoices' && 'rounded-t-lg',
      ]"
    >
      <nuxt-link
        :to="link.url"
        class="flex items-center px-5 py-4 md:text-lg"
        :class="hasText(link?.name) ? 'font-bold' : 'font-medium'"
      >
        <div
          class="mr-3 text-xl"
          :class="
            hasText(link.name)
              ? getIcon(link.name).active
              : getIcon(link.name).inactive
          "
        />
        {{ link.text }}
      </nuxt-link>
    </li>
    <li>
      <a
        class="flex px-5 py-4 items-center font-medium md:text-lg"
        href="#"
        @click.prevent="auth.logout"
      >
        <div class="i-ph-power-light mr-3 text-xl" />
        Cerrar Sesión
      </a>
    </li>
  </ul>
</template>
