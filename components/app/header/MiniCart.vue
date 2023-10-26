<script lang="ts" setup>
const cartStore = useCartStore();
const productStore = useProductStore();

const isLoadingCart = ref(false);
const total = computed(() => cartStore.total);
const amount = computed(() => cartStore.amount);
const cartProducts = computed(() => productStore.cartProducts);

const isOpen = ref(false);
const miniCartRef = ref(null);

function toggleIsOpen() {
  isOpen.value = !isOpen.value;
}

onClickOutside(miniCartRef, () => {
  isOpen.value = false;
});
</script>

<template>
  <div class="mini-cart__wrapper">
    <button @click.prevent="toggleIsOpen">
      <div class="header-actions__link">
        <UIcon name="i-ph-bag" class="header-actions__icon" />
        <span class="header-actions__indicator-wrapper">
          <i class="header-actions__indicator">{{ total }}</i>
        </span>
      </div>
    </button>

    <!-- Menu -->
    <transition name="slide-fade">
      <template v-if="isOpen">
        <div class="mini-cart" ref="miniCartRef">
          <div v-if="total > 0">
            <div class="mini-cart__body">
              <app-loader v-if="isLoadingCart" />
              <template v-else-if="cartProducts?.length">
                <div v-for="(product, index) in cartProducts" :key="index">
                  <product-mini-cart :product="product!" />
                </div>
              </template>
            </div>
            <div class="mini-cart__footer">
              <h3 class="mini-cart__footer-title">
                Sub total:
                <strong class="mini-cart__amount">${{ amount }}</strong>
              </h3>
              <figure class="mini-cart__wrapper">
                <div class="mini-cart__left">
                  <nuxt-link to="/shopping-cart" class="btn">
                    Ver carrito
                  </nuxt-link>
                </div>
                <div class="mini-cart__right">
                  <nuxt-link to="/checkout" class="btn btn--outline">
                    Pagar
                  </nuxt-link>
                </div>
              </figure>
            </div>
          </div>
          <div v-else class="mini-cart__empty">
            No hay productos en el carrito
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<style scoped>
.mini-cart__wrapper {
  @apply relative;
}
.mini-cart {
  @apply absolute min-w-[16em] -left-44 right-0 z-30 mt-32 transition ease-linear rounded-xl shadow-xl 
  md:min-w-[18em] md:-left-48 
  lg:min-w-[20em] lg:-left-32;
}

.mini-cart__body {
  @apply min-h-[10em] relative p-5 max-h-[20em] overflow-auto bg-white border border-white border-b-transparent;
}

.mini-cart__footer {
  @apply p-[10px_20px_20px] border-t-0 bg-white;
}

.mini-cart__footer-title {
  @apply block mb-5 text-base font-semibold flex justify-between;
}

.mini-cart__amount {
  @apply text-red-600 font-bold;
}

.mini-cart__empty {
  @apply min-h-[3.5em] relative p-3 overflow-auto bg-white border border-white border-b-transparent;
}

.mini-cart__wrapper {
  @apply flex flex-nowrap justify-between items-center;
}

.mini-cart__left {
  @apply max-w-[50%] pr-1 flex basis-full;
}

.mini-cart__right {
  @apply max-w-[50%] pl-1 basis-full;
}
</style>
