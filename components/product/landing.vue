<script lang="ts" setup>
type Props = {
  category: Category;
  filtered: boolean;
};

const props = defineProps<Props>();
const productStore = useProductStore();
const products = ref<Product[] | null>(null);

onMounted(async () => {
  const result = await productStore.getByCategory(props.category.id);
  products.value = result;
});
</script>

<template>
  <div class="landing" v-if="products?.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.name }}
        </h3>
      </div>
      <div class="landing__content">
        <AppSlider
          :items="products"
          :slides-per-view="2"
          :space-between="4"
          :breakpoints="{
            768: {
              slidesPerView: 4,
              spaceBetween: 1,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 4,
            },
          }"
          v-if="products.length && !filtered"
        >
          <template #default="{ product }">
            <div class="py-4">
              <ProductDefault :product="product" />
            </div>
          </template>
        </AppSlider>

        <div
          class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
          v-if="filtered"
        >
          <ProductDefault
            v-for="product in products"
            :product="product"
            :key="product.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing {
  @apply mt-6;
}

.landing__header {
  @apply flex flex-nowrap justify-between items-center pr-5 py-4 border-b-2 border-b-color-1 mx-6;
}

.landing__title {
  @apply mb-0 inline-block text-3xl font-extrabold text-color-6;
}

.landing__content {
  @apply relative pt-6;
}

.landing__slide {
  @apply !w-[167px] mr-2 md:!w-[180px] md:mr-[10px] lg:!w-[260px] lg:mr-0;
}
</style>
