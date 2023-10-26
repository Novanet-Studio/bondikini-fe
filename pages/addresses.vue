<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const checkout = useCheckoutStore();
const { hasBilling, hasShipping } = checkout.checkAddressType();

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Address';
</script>

<template>
  <div class="wrapper">
    <div class="address">
      <div class="address__content">
        <figure>
          <figcaption class="address__figcaption">Billing address</figcaption>
          <div class="bubble" v-if="hasBilling">
            <p class="address__text">
              Do you want to update your billing address?
            </p>
            <nuxt-link class="address__link" to="/edit-address?add=billing">
              Update
            </nuxt-link>
          </div>
          <div class="bubble" v-else>
            <p class="address__text">
              You have not registered any billing address
            </p>
            <nuxt-link class="address__link" to="/edit-address?add=billing">
              Add
            </nuxt-link>
          </div>
        </figure>
      </div>
      <div class="address__content">
        <figure class="lg:mr-5">
          <figcaption class="address__figcaption">Shipping address</figcaption>
          <div class="bubble" v-if="hasShipping">
            <p class="address__text">
              Do you want to update your shipping address?
            </p>
            <nuxt-link class="address__link" to="/edit-address?add=shipping">
              Update
            </nuxt-link>
          </div>
          <div class="bubble" v-else>
            <p class="address__text">
              You have not registered any shipping address
            </p>
            <nuxt-link class="address__link" to="/edit-address?add=shipping">
              Add
            </nuxt-link>
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply w-full lg:ml-8;
}

.address {
  @apply flex flex-col gap-10 p-5 lg:flex-row lg:gap-5;
}

.address__content {
  @apply max-w-full flex-[0_0_100%] lg:max-w-[50%] lg:flex-[0_0_50%];
}

.address__figcaption {
  @apply mb-8 pb-3 font-bold text-color-6 md:text-2xl md:mb-4;
}

.address__text {
  @apply mb-4 text-color-5 text-sm md:mb-0 md:text-base;
}

.address__link {
  @apply text-white px-6 bg-color-3 py-2 rounded-full transition ease-linear text-sm hover:text-opacity-70;
}

.bubble {
  @apply bg-color-2 p-6 !ring-0 !ring-offset-0 !ring-transparent shadow-2xl flex flex-col items-center rounded-md gap-2 md:flex-row md:justify-between;
}
</style>
