<script lang="ts" setup>
type Props = {
  shipping?: boolean;
};

const cart = useCartStore();
const product = useProductStore();

withDefaults(defineProps<Props>(), {
  shipping: false,
});
</script>

<template>
  <div v-if="cart.cartItems?.length">
    <h3 class="order-summary__title" v-if="!shipping">Tu Orden</h3>
    <div class="order-summary__content">
      <figure class="order-summary__figure">
        <figcaption class="order-summary__figcaption">
          <strong class="order-summary__strong-text">Producto</strong>
          <strong class="order-summary__strong-text">total</strong>
        </figcaption>
      </figure>
      <figure class="order-summary__figure grid grid-cols-[70%_1fr]">
        <template v-for="(item, index) in product.cartProducts" :key="index">
          <nuxt-link
            :to="`/product/${item!.id}`"
            class="order-summary__link flex-1"
          >
            {{ item!.name }}
          </nuxt-link>
          <p class="order-summary__price flex justify-end">
            {{ cart.cartItems[index]?.quantity }} x ${{
              item!.price.toFixed(2)
            }}
          </p>
        </template>
      </figure>
      <figure class="order-summary__figure !border-none !mb-0 !pb-0">
        <figcaption class="order-summary__figcaption">
          <strong class="order-summary__strong-text">Subtotal</strong>
          <small>$ {{ cart.amount }}</small>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.order-summary__title {
  @apply font-bold mb-3 text-color-2 text-sm lg:text-base;
}

.order-summary__content {
  @apply px-6 py-8 mb-3 rounded-3xl shadow-md border border-color-7;
}

.order-summary__figure {
  @apply mb-6 pb-6 border-b-2 border-b-light-600;
}

.order-summary__figcaption {
  @apply flex justify-between font-normal;
}

.order-summary__strong-text {
  @apply text-sm text-color-2 font-bold;
}

.order-summary__link {
  @apply py-3 flex justify-between w-full text-sm;
}

.order-summary__price {
  @apply text-xs text-dark-100;
}
</style>
