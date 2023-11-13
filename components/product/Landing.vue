<script lang="ts" setup>
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

type Props = {
  category: Category;
  filtered: boolean;
};

type Emits = {
  (e: 'filter'): void;
};

defineEmits<Emits>();
const props = defineProps<Props>();
const productStore = useProductStore();
const products = ref<Product[] | null>(null);

onMounted(async () => {
  const result = await productStore.getByCategory(props.category.id);
  products.value = result;
});
</script>

<template>
  <div class="category" v-if="products?.length">
    <div class="category__wrapper">
      <div class="category__header">
        <h3 class="category__title">
          {{ category.name }}
        </h3>
        <UButton
          color="color-5"
          variant="link"
          @click="$emit('filter')"
          v-if="!filtered"
          label="see all"
          size="lg"
        />
      </div>
      <div class="category__content">
        <div v-if="products.length && !filtered">
          <UButton
            icon="i-ph-caret-left"
            class="category__button category__button--left disable:opacity-60"
            size="xl"
            :class="`prev-${category.id}`"
            color="color-5"
            variant="link"
          />
          <swiper-container
            :modules="[Autoplay, Navigation, Pagination]"
            class="category__swiper"
            :space-between="10"
            :slides-per-view="2"
            :pagination="true"
            :navigation="{
              prevEl: `.prev-${category.id}`,
              nextEl: `.next-${category.id}`,
            }"
            :breakpoints="{
              '375': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '480': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '640': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '768': {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              '1024': {
                slidesPerView: 4,
                spaceBetween: 20,
                pagination: false,
              },
            }"
          >
            <swiper-slide
              v-for="product in products"
              :key="product.id"
              class="py-10"
            >
              <ProductDefault :product="product" />
            </swiper-slide>
          </swiper-container>
          <UButton
            icon="i-ph-caret-right"
            color="color-5"
            variant="link"
            size="xl"
            class="category__button category__button--right disable:opacity-60"
            :class="`prev-${category.id}`"
          />
        </div>

        <div class="category__filtered" v-if="filtered">
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
.category {
  @apply mt-6;
}

.category__header {
  @apply flex flex-nowrap justify-between items-center py-4 border-b-2 border-b-color-1;
}

.category__title {
  @apply mb-0 text-xl inline-block lg:text-3xl font-extrabold text-color-6;
}

.category__content {
  @apply relative pt-6;
}

.category__button {
  @apply block top-[50%] absolute;
}

.category__button--right {
  @apply right-0;
}

.category__button--left {
  @apply left-0;
}

.category__swiper {
  @apply flex w-[80%] md:w-[90%];
}

.category__filtered {
  @apply grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4;
}

swiper-container::part(bullet-active) {
  --swiper-pagination-color: rgba(0, 0, 0, 0.7);
  --swiper-pagination-color: #ddabac;
}
</style>
