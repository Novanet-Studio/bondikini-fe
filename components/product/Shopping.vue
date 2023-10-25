<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const graphql = useStrapiGraphQL();

const cart = useCartStore();
const productStore = useProductStore();
const wishlist = useWishlistStore();
const router = useRouter();
const selectedSize = ref<SizeStock>();
const quantity = ref<number>(1);

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

const isQuantityGreaterThanTen = computed(() => {
  const existItem = cart.cartItems.find((item) => item.id === product.value.id);
  return existItem?.id && quantity.value + existItem.quantity > 10;
});

const isQuantityGreaterThanStock = computed(() => {
  const existItem = cart.cartItems.find((item) => item.id === product.value.id);
  return (
    existItem?.id &&
    quantity.value + existItem.quantity > selectedSize.value!.inventario
  );
});

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
    description: `${product.value.name} has been added to wishlist`,
    color: 'green',
  });
};

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const handleAddItemToWishlist = () => {
  const item = {
    id: product.value.id,
  };

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
    size: selectedSize.value?.talla as string,
  };

  if (productHasSize.value && !selectedSize.value) {
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
</script>

<template>
  <div class="mt-4">
    <div class="mt-2 lg:mt-4" v-if="productHasSize">
      <div class="font-bold text-color-6">Sizes</div>
      <div class="mt-2 flex gap-4">
        <button
          class="w-10 h-10 rounded-full bg-color-1 text-color-3 text-xs font-bold ring-1 ring-offset-2 ring-offset-[#ecedee] shadow-md lg:w-12 lg:h-12"
          :class="
            selectedSize?.talla === size.talla
              ? 'ring-color-3'
              : 'ring-transparent'
          "
          v-for="(size, index) in product?.size_stock"
          :key="index"
          @click="selectedSize = size"
        >
          {{ size.talla }}
        </button>
      </div>
    </div>

    <div class="flex gap-2 mt-8 md:gap-4">
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
    </div>
    <div class="flex justify-center mt-8 md:justify-initial">
      <UButton
        color="color-3"
        label="Buy"
        class="px-8"
        size="lg"
        :ui="{
          rounded: 'rounded-full',
        }"
        @click="handleAddToCart(true)"
      />
    </div>
  </div>
</template>
