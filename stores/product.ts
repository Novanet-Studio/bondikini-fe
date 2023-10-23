import strapiMapper from 'smapper';
import config from '~/config/config.json';
import { UpdateProduct } from '~/graphql/mutations';
import { GetProductById, GetProductsByCategoryId } from '~/graphql/queries';

export const useProductStore = defineStore(
  config.store.product,
  () => {
    const product = ref<Product | null>(null);
    const products = ref<Product[] | null>([]);
    const cartProducts = ref<Partial<Product[]> | null>([]);
    const wishlistItems = ref<Partial<Product[]> | null>([]);
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

    async function checkStock() {
      const validProducts: Product[] = [];
      const noStockProducts: Product[] = [];
      const temp = await getProductsFromCart();

      // Crea una function que verifique si hay stock de cada producto
      temp.forEach((product) => {
        const item = cartStore.cartItems.find((item) => item.id === product.id);
        const found = product.size_stock?.find(
          (stock) => stock.talla === item?.size
        );

        if (found!.inventario > 0 && item!.quantity < found!.inventario) {
          validProducts.push(product);
        } else {
          noStockProducts.push(product);
        }
      });

      return [validProducts, noStockProducts];
    }

    async function update() {
      const temp = await getProductsFromCart();

      const products = temp.map((product) => {
        const item = cartStore.cartItems.find((item) => item.id === product.id);

        return {
          ...product,
          size_stock: product.size_stock?.map((productStock) => ({
            ...productStock,
            inventario:
              item!.size === productStock.talla
                ? productStock.inventario - item!.quantity
                : productStock.inventario,
          })) as SizeStock[],
        };
      });

      products.forEach(async (product) => {
        await graphql(UpdateProduct, {
          id: product.id,
          data: {
            size_stock: product.size_stock,
          },
        });
      });
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
      checkStock,
      wishlistItems,
      loading,
      getByCategory,
      addCartProducts,
      update,
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
