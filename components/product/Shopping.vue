<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

// const cart = useCartStore();
const productStore = useProductStore();
// const router = useRouter();
const selectedSize = ref<SizeStock>();
// const quantity = ref<number>(1);

const product = inject(injectKeys.productDetail) as Ref<Product>;

const productHasSize = computed(
  () =>
    product.value.size_stock?.length &&
    product.value.size_stock.filter(
      (size) =>
        !size.talla.toLocaleLowerCase().includes('no_aplica') &&
        size.inventario > 0
    ).length
);
const productHasStock = computed(
  () =>
    product.value.size_stock?.length &&
    product.value.size_stock.filter((stock) => stock.inventario > 0).length
);

// const isQuantityGreaterThanTen = computed(() => {
//   const existItem = cart.cartItems.find((item) => item.id === product.value.id);
//   const existItemQuantity = existItem?.quantity || 0;
//   const totalQuantity = quantity.value + existItemQuantity;

//   return totalQuantity > 10;
// });

// const isQuantityGreaterThanStock = computed(() => {
//   const existItem = cart.cartItems.find((item) => item.id === product.value.id);
//   const existItemQuantity = existItem?.quantity || 0;
//   const stock = selectedSize.value?.inventario || 0;
//   const totalQuantity = quantity.value + existItemQuantity;

//   return totalQuantity > stock;
// });

// const addItemToCart = async (payload: CartItem) => {
//   const temp: Product[] = [];

//   cart.addProductToCart(payload);

//   if (!cart.cartItems.length) return;

//   const itemsList = cart.cartItems.map((item) =>
//     graphql<ProductRequest>(GetProductById, { id: item.id })
//   );

//   const itemsResult = await Promise.all(itemsList);

//   mapper<any[]>(itemsResult).forEach((item) => {
//     temp.push(item.products[0]);
//   });

//   productStore.addCartProducts(temp);

//   useToast().add({
//     icon: 'i-ph-check',
//     title: 'Success!',
//     description: `${product.value.name} has been added to the cart`,
//     color: 'green',
//   });
// };

// const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

// const handleAddToCart = (isBuyNow = false) => {
//   const item = {
//     id: product.value.id,
//     quantity: quantity.value,
//     price: product.value.price,
//     sizeData: {
//       id: selectedSize.value!.id,
//       size: selectedSize.value!.talla,
//     },
//   };

//   if (productHasSize.value && !selectedSize.value) {
//     useToast().add({
//       icon: 'i-ph-warning',
//       title: 'Warning!',
//       description: 'Please select a size',
//       color: 'orange',
//     });
//     return;
//   }

//   if (isQuantityGreaterThanStock.value) {
//     useToast().add({
//       icon: 'i-ph-warning',
//       title: 'Warning!',
//       description: 'There is not enough stock',
//       color: 'orange',
//     });
//     return;
//   }

//   if (isQuantityGreaterThanTen.value) {
//     useToast().add({
//       icon: 'i-ph-warning',
//       title: 'Warning!',
//       description: 'You cannot add more than 10 items',
//       color: 'orange',
//     });
//     return;
//   }

//   if (isBuyNow) goToCheckout();
// };

const actions = ref<{
  handleAddToCart: (isBuyNow?: boolean) => void;
} | null>(null);

onMounted(async () => {
  if (product.value.id) {
    await productStore.getById(product.value.id);
  }
});
</script>

<template>
  <div class="mt-4">
    <div class="mt-2 lg:mt-8" v-if="productHasSize">
      <div class="font-bold text-color-6 lg:text-xl">Sizes</div>
      <ProductSizes v-model="selectedSize" />
    </div>

    <ProductActions
      ref="actions"
      :size="selectedSize!"
      :disabled="!productHasStock"
    />

    <!-- <div class="flex gap-2 mt-8 md:gap-4">
      <CustomQuantity
        v-model="quantity"
        @descrease="handleDescreaseQuantity"
        @increase="handleIncreaseQuantity"
        :disabled="!productHasStock"
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
    </div> -->
    <div class="flex justify-center mt-8 md:justify-start">
      <UButton
        color="color-3"
        label="Buy"
        class="px-8"
        size="lg"
        :ui="{
          rounded: 'rounded-full',
        }"
        @click="actions?.handleAddToCart(true)"
      />
    </div>
  </div>
</template>
