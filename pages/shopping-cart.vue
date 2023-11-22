<script lang="ts" setup>
import strapiMapper from 'smapper';
import { GetProductById } from '~/graphql/queries';

definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const graphql = useStrapiGraphQL();

const cart = useCartStore();
const product = useProductStore();
// const discount = ref('');

const loadCartProducts = async () => {
  let temp: any[] = [];
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!itemsId.length) return;

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductRequest>(GetProductById, { id })
  );

  const response = await Promise.all(productPromises);

  response.forEach((product) => {
    temp.push(product.data.products.data[0]);
  });

  product.cartProducts = strapiMapper(temp) as Product[];
};

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Shopping cart';

const columns = [
  {
    key: 'product',
    label: 'Product',
  },
  {
    key: 'size',
    label: 'Size',
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
    key: 'total',
    label: 'Total',
  },
  {
    key: 'actions',
  },
];

const products = computed(
  () =>
    product.cartProducts?.map((product) => ({
      ...product,
      id: product!.id,
      product: {
        url: product!.images[0].url,
      },
      sizeData: cart.cartItems.find((item) => item.id === product!.id)
        ?.sizeData,
      price: product!.price,
      amount: cart.cartItems.find((item) => item.id === product!.id)!.quantity,
      total:
        product!.price *
        cart.cartItems.find((item) => item.id === product!.id)!.quantity,
    }))
);

function handleRemoveProductFromCart(item: CartItem) {
  const cartItem = cart.cartItems.find(
    (element) => element.id === item.id
  ) as CartItem;
  cart.removeProductFromCart(cartItem);
}

onMounted(() => {
  loadCartProducts();
});
</script>

<template>
  <section class="shopping-cart">
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
        label: 'There are no products in the cart',
      }"
    >
      <template #product-data="{ row }">
        <img
          class="w-12 h-12 object-cover rounded-full lg:w-20 lg:h-20"
          :src="row.product.url"
        />
      </template>
      <template #size-data="{ row }">
        <span
          v-if="
            row.size_stock?.find((stock) => stock.id === row.sizeData.id)
              .inventario > row.amount
          "
          >{{ row.sizeData.size }}</span
        >
        <UTooltip text="No stock available" v-else>
          <span class="text-red-500 font-semibold">{{
            row.sizeData.size
          }}</span>
        </UTooltip>
      </template>
      <template #amount-data="{ row }">
        <CustomQuantity
          v-model="row.amount"
          @increase="cart.increaseCartItemQuantity(row.id)"
          @descrease="cart.decreaseCartItemQuantity(row.id)"
          :disabled="
            row.size_stock?.find((stock) => stock.id === row.sizeData.id)
              .inventario <= row.amount
          "
        />
      </template>
      <template #actions-data="{ row }">
        <UButton
          color="red"
          variant="ghost"
          icon="i-ph-x"
          @click="handleRemoveProductFromCart(row)"
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
.shopping-cart {
  @apply mt-12 lg:ml-8 lg:w-full lg:mt-6;
}
</style>
