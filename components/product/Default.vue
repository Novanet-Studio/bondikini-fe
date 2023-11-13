<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
const router = useRouter();
const graphql = useStrapiGraphQL();
const pruductStore = useProductStore();

async function handleAddToCart() {
  const newProduct = {
    id: props.product.id,
    quantity: 1,
    price: props.product.price,
    size: '',
  };

  if (props.product.size_stock?.length) {
    useToast().add({
      icon: 'i-ph-warning-duotone',
      title: 'Warning',
      description: 'You must select a size',
      color: 'orange',
    });
    setTimeout(() => {
      router.push(`/product/${props.product.id}`);
    }, 500);
    return;
  }

  cart.addProductToCart(newProduct);

  const itemsList = cart.cartItems.map((item) => {
    return graphql<ProductRequest>(GetProductById, { id: item.id });
  });

  const itemsResult = await Promise.all(itemsList);

  const temp: any[] = [];

  mapper<any[]>(itemsResult).map((item) => {
    temp.push(item.products[0]);
  });

  pruductStore.addCartProducts(temp);

  useToast().add({
    icon: 'i-ph-check',
    title: 'Success!',
    description: `Product ${newProduct.id} has been added to the cart!`,
  });
}

provide(injectKeys.product, props.product);
</script>

<template>
  <UCard
    :ui="{
      background: 'bg-color-4',
      divide: 'divide-none',
      ring: 'ring-0 ring-transparent',
      rounded: 'rounded-sm',
      header: { padding: '!px-0 !py-0' },
    }"
  >
    <template #header>
      <div class="category__item">
        <ProductThumbnailImage />
        <span
          class="absolute top-0 right-4 w-[3.6875rem] h-[4.375rem] rounded-b-full bg-color-3 p-4 flex items-center justify-center text-lg text-color-2"
        >
          ${{ product.price }}
        </span>
      </div>
    </template>
    <section class="flex flex-col items-center justify-center gap-4">
      <h5 class="text-center text-xl text-color-3 font-bold">
        {{ product.name }}
      </h5>
      <UButton
        icon="i-ph-shopping-bag"
        size="lg"
        label="Buy"
        @click="handleAddToCart"
      />
    </section>
  </UCard>
</template>

<style scoped>
.category__item {
  @apply h-72 relative;
}
</style>
