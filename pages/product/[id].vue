<script lang="ts" setup>
import strapiMapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const graphql = useStrapiGraphQL();
const route = useRoute();

const id = route.params.id as string;
const isLoading = ref(false);
const product = ref<Product>();

const load = async () => {
  try {
    isLoading.value = true;

    const { data } = await graphql<ProductRequest>(GetProductById, {
      id,
    });

    product.value = strapiMapper(data.products.data[0]);
  } catch (error) {
    console.log(error);
    useToast().add({
      icon: 'i-ph-warnin-duotone',
      title: 'Error',
      description: 'An error occurred while loading the product',
      color: 'red',
    });
  } finally {
    isLoading.value = false;
  }
};

provide(injectKeys.productDetail, product as Ref<Product>);

onMounted(async () => {
  await load();
});
</script>

<template>
  <div class="wrapper">
    <Transition name="page">
      <ProductDetail v-if="product" />
    </Transition>
  </div>
</template>

<style scoped>
.wrapper {
  @apply container;
}
</style>
