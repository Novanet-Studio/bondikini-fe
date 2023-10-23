<script lang="ts" setup>
const props = defineProps<{
  id: string;
}>();

const cart = useCartStore();
const payload = {
  id: props.id,
} as CartItem;

const quantity = computed(() => {
  if (!cart.cartItems.length) return null;

  const cartItem = cart.cartItems.find((item) => item.id === props.id);

  if (!cartItem) return null;

  return cartItem.quantity;
});

const handleIncreaseQuantity = () => {
  cart.increaseCartItemQuantity(payload);
};

const handleDescreaseQuantity = () => {
  cart.decreaseCartItemQuantity(payload);
};
</script>

<template>
  <div class="quantity">
    <button class="quantity__btn" @click.prevent="handleDescreaseQuantity">
      <div class="i-ph-minus-light text-xs" />
    </button>
    <input class="quantity__input" v-model="quantity" type="text" disabled />
    <button class="quantity__btn" @click.prevent="handleIncreaseQuantity">
      <div class="i-ph-plus-light text-xs" />
    </button>
  </div>
</template>

<style scoped>
.quantity {
  @apply max-w-[6.25rem] py-2 flex items-center bg-white border justify-between rounded-full shadow shadow-md;
}

.quantity__btn {
  @apply px-2;
}

.quantity__input {
  @apply h-3 w-4 text-center bg-transparent text-black;
}
</style>
