<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';

const props = defineProps<{ size?: SizeStock; disabled?: boolean }>();

import { GetProductById } from '~/graphql/queries';

const router = useRouter();
const graphql = useStrapiGraphQL();

const cart = useCartStore();
const wishlist = useWishlistStore();
const productStore = useProductStore();
const globalStore = useGlobalStore();

const quantity = ref<number>(1);

const product = inject(injectKeys.productDetail) as Ref<Product>;

const handleIncreaseQuantity = () => quantity.value++;
const handleDescreaseQuantity = () =>
  quantity.value > 1 ? quantity.value-- : quantity;

const addItemToCart = async (payload: CartItem) => {
  const temp: Product[] = [];

  cart.addProductToCart(payload);

  if (!cart.cartItems.length) return;

  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductRequest>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  mapper<any[]>(itemsResult).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.addCartProducts(temp);

  useToast().add({
    icon: 'i-ph-check',
    title: 'Success!',
    description: `${product.value.name} has been added to the cart`,
    color: 'green',
  });

  globalStore.setIsContinueShopping(true);
};

const isQuantityGreaterThanTen = computed(() => {
  const existItem = cart.cartItems.find((item) => item.id === product.value.id);
  const existItemQuantity = existItem?.quantity || 0;
  const totalQuantity = quantity.value + existItemQuantity;

  return totalQuantity > 10;
});

const isQuantityGreaterThanStock = computed(() => {
  const existItem = cart.cartItems.find((item) => item.id === product.value.id);
  const existItemQuantity = existItem?.quantity || 0;
  const stock = props.size?.inventario || 0;
  const totalQuantity = quantity.value + existItemQuantity;

  return totalQuantity > stock;
});

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const handleAddItemToWishlist = () => {
  const item = {
    id: product.value.id,
  };

  // if (isQuantityGreaterThanStock.value) {
  //   useToast().add({
  //     icon: 'i-ph-warning',
  //     title: 'Warning!',
  //     description: 'There is not enough stock',
  //     color: 'orange',
  //   });
  //   return;
  // }

  // if (isQuantityGreaterThanTen.value) {
  //   useToast().add({
  //     icon: 'i-ph-warning',
  //     title: 'Warning!',
  //     description: 'You cannot add more than 10 items',
  //     color: 'orange',
  //   });
  //   return;
  // }

  wishlist.addItem(item);

  useToast().add({
    icon: 'i-ph-check',
    title: 'Success!',
    description: `${product.value.name} has been added to wishlist`,
    color: 'green',
  });
};

const handleAddToCart = (isBuyNow = false) => {
  const item = {
    id: product.value.id,
    quantity: quantity.value,
    price: product.value.price,
    sizeData: {
      id: props.size?.id || '',
      size: props.size?.talla || '',
    },
  };

  if (!item?.id) return;

  if (!props.size?.id) {
    useToast().add({
      icon: 'i-ph-warning',
      title: 'Warning!',
      description: 'Please select a size',
      color: 'orange',
    });
    return;
  }

  if (isQuantityGreaterThanStock.value) {
    useToast().add({
      icon: 'i-ph-warning',
      title: 'Warning!',
      description: 'There is not enough stock',
      color: 'orange',
    });
    return;
  }

  if (isQuantityGreaterThanTen.value) {
    useToast().add({
      icon: 'i-ph-warning',
      title: 'Warning!',
      description: 'You cannot add more than 10 items',
      color: 'orange',
    });
    return;
  }

  addItemToCart(item);

  if (isBuyNow) goToCheckout();
};

defineExpose({
  addItemToCart,
  handleAddToCart,
});
</script>

<template>
  <div class="flex gap-2 mt-8 md:gap-4">
    <CustomQuantity
      v-model="quantity"
      @descrease="handleDescreaseQuantity"
      @increase="handleIncreaseQuantity"
      :disabled="disabled"
    />
    <UButton
      icon="i-ph-bag"
      color="white"
      class="ring-0 ring-transparent shadow-xl"
      size="lg"
      label="Add to cart"
      :ui="{
        rounded: 'rounded-full',
      }"
      @click="handleAddToCart(false)"
    />

    <UButton
      icon="i-ph-heart"
      color="white"
      class="ring-0 ring-transparent shadow-xl"
      size="lg"
      :ui="{
        rounded: 'rounded-full',
      }"
      @click="handleAddItemToWishlist"
    />
  </div>
</template>
