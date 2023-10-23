<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const { $notify } = useNuxtApp();
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

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.value.name} ha sido agregado al carrito!`,
  });
};

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const handleAddItemToWishlist = () => {
  const item = {
    id: product.value.id,
  };

  if (isQuantityGreaterThanStock.value) {
    $notify({
      group: 'all',
      title: 'Advertencia',
      text: `No hay suficiente productos en el inventario`,
    });
    return;
  }

  if (isQuantityGreaterThanTen.value) {
    $notify({
      group: 'all',
      title: 'Advertencia!',
      text: `No puede añadir más de 10 elementos`,
    });
    return;
  }

  wishlist.addItem(item);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.value.name} ha sido agregado a la lista de deseos!`,
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
    $notify({
      group: 'all',
      title: 'Advertencia',
      text: `Seleccione una talla`,
    });
    return;
  }

  if (isQuantityGreaterThanStock.value) {
    $notify({
      group: 'all',
      title: 'Advertencia',
      text: `No hay suficiente productos en el inventario`,
    });
    return;
  }

  if (isQuantityGreaterThanTen.value) {
    $notify({
      group: 'all',
      title: 'Advertencia!',
      text: `No puede añadir más de 10 elementos`,
    });
    return;
  }

  addItemToCart(item);

  if (isBuyNow) goToCheckout();
};
</script>

<template>
  <div>
    <div class="mt-2 lg:mt-4" v-if="productHasSize">
      <div class="text-sm font-bold lg:text-base">Tallas</div>
      <div class="mt-2 flex justify-evenly">
        <button
          class="w-10 h-10 rounded-full bg-color-3 text-white text-xs font-bold ring-1 ring-offset-2 ring-offset-[#ecedee] shadow shadow-md lg:(w-12 h-12)"
          :class="
            selectedSize?.talla === size.talla
              ? 'ring-color-3'
              : 'ring-transparent'
          "
          v-for="(size, index) in product?.size_stock"
          :key="index"
          @click="selectedSize = size"
        >
          {{ cleanupSize(size.talla) }}
        </button>
      </div>
    </div>

    <div class="flex gap-2 mt-4 md:gap-4">
      <div
        class="max-w-[6.25rem] flex items-center justify-between rounded-full shadow shadow-md lg:px-4 bg-white"
      >
        <button
          class="px-2 disabled:opacity-50"
          @click.prevent="handleDescreaseQuantity"
          :disabled="!productHasStock"
        >
          <div class="i-ph-minus-light text-xs text-gray-5 lg:text-sm" />
        </button>
        <input
          v-model="quantity"
          class="h-3 w-4 text-center bg-transparent text-black text-xs lg:text-sm"
          type="text"
          disabled
        />
        <button
          class="px-2 disabled:opacity-50"
          @click.prevent="handleIncreaseQuantity"
          :disabled="!productHasStock"
        >
          <div class="i-ph-plus-light text-xs text-gray-5 lg:text-sm" />
        </button>
      </div>
      <button
        class="bg-white shadow shadow-md text-xs font-bold px-2.5 py-2 rounded-full flex items-center justify-center md:(px-4) lg:(px-8 text-sm)"
        @click="handleAddToCart(false)"
      >
        Agregar al carrito
        <!-- <span class="i-ph-shopping-cart text-lg"></span> -->
      </button>
      <button
        class="bg-white shadow shadow-md text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50"
        @click="handleAddItemToWishlist"
        :disabled="!productHasStock"
      >
        <span class="i-ph-heart text-lg"></span>
      </button>
    </div>
    <div class="flex justify-center mt-8 md:justify-initial">
      <button
        class="px-6 py-2 text-sm bg-color-2 text-white font-bold rounded-full md:px-10 lg:px-12 disabled:opacity-50"
        :disabled="!productHasStock"
        @click="handleAddToCart(true)"
      >
        Comprar
      </button>
    </div>
  </div>
</template>
