import strapiMapper from 'smapper';
import config from '~/config/config.json';
import { UpdateProduct } from '~/graphql/mutations';
import { RestoreProduct } from '~/graphql/mutations';
import { GetProductById, GetProductsByCategoryId } from '~/graphql/queries';

export const useProductStore = defineStore(
  config.store.product,
  () => {
    const product = ref<Product | null>(null);
    const products = ref<Product[] | null>([]);
    const cartProducts = ref<Partial<Product[]> | null>([]);
    const wishlistItems = ref<Partial<Product[]> | null>([]);
    const beforeUpdate = ref<
      {
        id: string;
        size_stock: SizeStock[];
      }[]
    >([]);
    const loading = ref(false);
    const cartStore = useCartStore();
    const graphql = useStrapiGraphQL();

    async function getProductsFromCart() {
      const temp: Product[] = [];

      const itemsList = cartStore.cartItems.map((item) =>
        graphql<ProductRequest>(GetProductById, { id: item.id })
      );

      const itemsResult = await Promise.all(itemsList);

      strapiMapper<any[]>(itemsResult).forEach((item) => {
        temp.push(item.products[0]);
      });

      return temp;
    }

    async function getByCategory(
      categoryId: string
    ): Promise<Product[] | null> {
      try {
        loading.value = true;
        const gql = useStrapiGraphQL();
        const { data } = await gql<ProductRequest>(GetProductsByCategoryId, {
          id: categoryId,
        });

        return strapiMapper<Product[]>(data.products.data);
      } catch (error) {
        return null;
      } finally {
        loading.value = false;
      }
    }

    function addCartProducts(product: Partial<Product[]>) {
      cartProducts.value = product;
    }

    async function update() {
      try {
        const products = await getProductsFromCart();

        // Save for rollback
        beforeUpdate.value = products.map((product) => ({
          id: product.id,
          size_stock: product.size_stock!,
        }));

        const items = cartStore.cartItems.map((item) => ({
          id: item.id,
          item: {
            id: item.sizeData.id,
            quantity: item.quantity,
          },
        }));

        const result = await Promise.all(
          items.map(({ id, item }) =>
            graphql(UpdateProduct, { id, data: { item } })
          )
        );

        return result;
      } catch (error) {
        console.log('from update -> ', error);
      }
    }

    async function rollback() {
      const items = beforeUpdate.value.map(({ id, size_stock }) => ({
        id,
        size_stock,
      }));

      const result = await Promise.all(
        items.map(({ id, size_stock }) =>
          graphql(RestoreProduct, { id, data: { size_stock } })
        )
      );

      return result;
    }

    function clear() {
      product.value = null;
      products.value = [];
      cartProducts.value = [];
      wishlistItems.value = [];
      loading.value = false;
    }

    function $reset() {
      product.value = null;
      products.value = [];
      cartProducts.value = [];
      wishlistItems.value = [];
      loading.value = false;
    }

    return {
      product,
      products,
      cartProducts,
      wishlistItems,
      loading,
      getByCategory,
      addCartProducts,
      update,
      rollback,
      clear,
      $reset,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
