<script setup lang="ts">
definePageMeta({
  layout: 'account',
});

const wishlist = useWishlistStore();
const globalStore = useGlobalStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const selected = ref<Product | null>(null);

const { showProductQuickView, isContinueShopping } = storeToRefs(globalStore);

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Wishlist';

const columns = [
  {
    key: 'product',
    label: 'Product',
  },
  {
    key: 'price',
    label: 'Price',
  },
  {
    key: 'amount',
    label: 'Amount',
  },
  {
    key: 'actions',
  },
];

const products = computed(
  () =>
    productStore.wishlistItems?.map((product) => ({
      ...product,
      id: product!.id,
      name: product?.name,
      product: {
        url: product!.images[0].url,
      },
      price: product!.price,
      amount:
        cartStore.cartItems.find((item) => item.id === product!.id)?.quantity ||
        0,
    }))
);

async function handleAddToCart(product: Product) {
  productStore.product = product;
  selected.value = product;
  showProductQuickView.value = true;
}

function handleRemoveItemFromWishlist(row: any) {
  wishlist.removeItem(row);
  wishlist.load();
}

watch(isContinueShopping, (value) => {
  console.log('isContinueShopping.value => ', isContinueShopping.value);
  if (value) {
    handleRemoveItemFromWishlist(selected.value);

    setTimeout(() => {
      selected.value = null;
    }, 1000);
  }
});

onMounted(() => {
  wishlist.load();
});
</script>

<template>
  <section class="wishlist">
    <UTable
      class="lg:max-w-3xl"
      :columns="columns"
      :rows="products"
      :ui="{
        thead: '[&>tr]:!bg-color-2  [&>tr]:!text-color-5',
        divide: 'divide-white divide-y-2',
        tbody: 'divide-white divide-y-2',
        tr: {
          base: 'odd:bg-[#f7f6f5] even:bg-[#E6E7E8]',
        },
      }"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'There are no products in the wishlist',
      }"
    >
      <template #product-data="{ row }">
        <img
          class="w-12 h-12 object-cover rounded-full lg:w-20 lg:h-20"
          :src="row.product.url"
        />
      </template>
      <template #amount-data="{ row }">
        <CustomQuantity
          :v-model="row.amount"
          @increase="cartStore.increaseCartItemQuantity(row.id)"
          @descrease="cartStore.decreaseCartItemQuantity(row.id)"
        />
      </template>
      <template #actions-data="{ row }">
        <UButton
          icon="i-ph-shopping-bag"
          :ui="{ rounded: 'rounded-full' }"
          @click="handleAddToCart(row)"
        />
        <UButton
          color="red"
          variant="ghost"
          icon="i-ph-x"
          @click="handleRemoveItemFromWishlist(row)"
        />
      </template>
      <template #loading-state>
        <div class="flex flex-col items-center justify-center mt-12">
          <AppLoader />
          <span>Loading...</span>
        </div>
      </template>
    </UTable>
  </section>
</template>

<style scoped>
.wishlist {
  @apply mt-12 lg:ml-8 lg:w-full lg:mt-6;
}
</style>
