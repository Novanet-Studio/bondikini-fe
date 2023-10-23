<script setup lang="ts">
import strapiMapper from 'smapper';
import { GetProductById } from '~/graphql/queries';

const { $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();

const cart = useCartStore();
const productStore = useProductStore();
const wishlist = useWishlistStore();

const emit = defineEmits(['reload']);

async function handleAddToCart(product: Product) {
  const item = {
    id: product.id,
    quantity: 1,
    price: product.price,
  };

  cart.addProductToCart(item);

  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductRequest>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  const temp: Product[] = [];

  strapiMapper<any[]>(itemsResult).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.addCartProducts(temp);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.name} ha sido agregado al carrito!`,
  });

  handleRemoveItemFromWishlist(product, false);
}

function handleRemoveItemFromWishlist(product: any, notify = true) {
  wishlist.removeItem(product);

  emit('reload');

  if (!notify) return;

  $notify({
    group: 'all',
    title: 'Eliminado',
    text: `${product.name} ha sido eliminado de la lista de deseos!`,
  });
}
</script>

<template>
  <table-wrapper>
    <table class="table">
      <thead class="bg-color-3">
        <tr class="rounded-t-3xl">
          <th scope="col" class="table-th">Producto</th>
          <th scope="col" class="table-th">Precio</th>
          <th scope="col" class="table-th">Talla</th>
          <th scope="col" class="table-th">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-tr"
          v-for="item in productStore.wishlistItems"
          :key="item?.id"
        >
          <td class="product-td max-w-15rem text-color-2">
            <div class="flex gap-6 items-center">
              <nuxt-img
                v-if="item?.images.length"
                :src="item?.images[0].url"
                :alt="item?.name"
                :placeholder="[100, 50, 10]"
                sizes="sm:100vw md:50vw lg:200px"
                fit="outside"
                class="h-full w-full object-contain rounded-sm bg-transparent ring ring-offset-5 ring-color-4 ring-offset-color-6 md:w-20"
              />
              <h5>{{ item?.name }}</h5>
            </div>
          </td>
          <td class="price-td">$ {{ item?.price.toFixed(2) }}</td>
          <td class="price-td">
            {{
              item?.size_stock?.[0].talla
                .toLocaleLowerCase()
                .includes('no_aplica')
                ? 'N/A'
                : cleanupSize(item?.size_stock?.[0].talla as string)
            }}
          </td>
          <td class="flex items-center !h-full mt-6 md:mt-8 lg:mt-10">
            <app-button class="!text-xs !w-32" @click="handleAddToCart(item!)">
              Añadir al carrito
            </app-button>
            <button
              class="text-color-2 ml-4"
              @click="handleRemoveItemFromWishlist(item)"
            >
              <div class="i-ph-x-light"></div>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </table-wrapper>
</template>

<style scoped>
.table {
  @apply min-w-full;
}

.t-head {
  @apply border-b;
}

.table-th {
  @apply text-sm font-bold text-white px-6 py-4 text-left lg:text-base;
}

.table-tr {
  @apply border-b transition duration-300 ease-in-out bg-color-6 even:bg-color-5 hover:bg-color-8 group;
}

.product-td {
  @apply px-6 py-4 text-sm font-bold text-black md:(pr-0) lg:(text-base);
}

.price-td {
  @apply text-sm text-black font-bold px-6 py-4 whitespace-nowrap lg:text-base;
}

.actions-td {
  @apply text-sm text-color-6 font-light px-6 py-4 lg:text-base flex items-center h-full;
}
</style>
