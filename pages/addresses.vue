<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const checkout = useCheckoutStore();
const { hasBilling, hasShipping } = checkout.checkAddressType();

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Dirección';
</script>

<template>
  <div class="wrapper">
    <div class="address">
      <div class="address__content">
        <figure>
          <figcaption class="address__figcaption">
            Dirección de facturación
          </figcaption>
          <div
            class="app-gradient !ring-0 !ring-offset-0 !ring-transparent shadow-2xl shadow-dark flex flex-col items-center gap-2 border md:(flex-row justify-between)"
            v-if="hasBilling"
          >
            <p class="address__text">
              ¿Deseas actualizar tu dirección de facturación?
            </p>
            <nuxt-link class="address__link" to="/edit-address?add=billing">
              Actualizar
            </nuxt-link>
          </div>
          <div
            class="app-gradient !ring-0 !ring-offset-0 !ring-transparent !shadow shadow-2xl flex flex-col items-center gap-2 border md:(flex-row justify-between)"
            v-else
          >
            <p class="address__text">
              No has registrado ningun dirección de facturación
            </p>
            <nuxt-link class="address__link" to="/edit-address?add=billing">
              Agregar
            </nuxt-link>
          </div>
        </figure>
      </div>
      <div class="address__content">
        <figure class="lg:mr-5">
          <figcaption class="address__figcaption">
            Dirección de envío
          </figcaption>
          <div
            class="app-gradient !ring-0 !ring-offset-0 !ring-transparent !shadow shadow-2xl flex flex-col items-center gap-2 border md:(flex-row justify-between)"
            v-if="hasShipping"
          >
            <p class="address__text">
              ¿Deseas actualizar tu dirección de envío?
            </p>
            <nuxt-link class="address__link" to="/edit-address?add=shipping">
              Actualizar
            </nuxt-link>
          </div>
          <div
            class="app-gradient !ring-0 !ring-offset-0 !ring-transparent !shadow shadow-2xl flex flex-col items-center gap-2 border md:(flex-row justify-between)"
            v-else
          >
            <p class="address__text">
              No has registrado ningun dirección de envío
            </p>
            <nuxt-link class="address__link" to="/edit-address?add=shipping">
              Agregar
            </nuxt-link>
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply w-full md:px-8 lg:(ml-8 );
}

.address {
  @apply flex flex-col gap-10 p-5 bg-white lg:(flex-row gap-5);
}

.address__content {
  @apply max-w-full flex-[0_0_100%] lg:(max-w-[50%] flex-[0_0_50%]);
}

.address__figcaption {
  @apply mb-8 pb-3 text-sm font-bold text-color-2 md:(text-2xl mb-4);
}

.address__text {
  @apply mb-4 text-color-2 text-sm md:(mb-0);
}

.address__link {
  @apply text-white px-6 bg-color-2 py-2 rounded-full transition ease text-sm hover:(text-opacity-70);
}
</style>
