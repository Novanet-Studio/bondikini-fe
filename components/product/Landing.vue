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
  <div class="landing" v-if="products?.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.name }}
        </h3>
        <UButton
          color="color-5"
          variant="link"
          @click="$emit('filter')"
          v-if="!filtered"
          label="see all"
        />
      </div>
      <div class="landing__content">
        <div
          class="flex gap-2 items-center max-w-full"
          :class="[
            products?.length > 5
              ? 'lg:(max-w-[calc(100%-4rem)])'
              : 'lg:max-w-full',
          ]"
          v-if="products.length && !filtered"
        >
          <UButton
            icon="i-ph-caret-left"
            class="disable:opacity-60 hidden w-12 h-12 lg:block"
            size="xl"
            :class="`prev-${category.id}`"
            color="color-5"
            variant="link"
          />
          <swiper-container
            :modules="[Autoplay, Navigation, Pagination]"
            class="w-full h-full lg:(w-[calc(100%-4rem)])"
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
                spaceBetween: 20,
              },
              '480': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '640': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '768': {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              '1024': {
                slidesPerView: 4,
                spaceBetween: 40,
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
          <!-- <AppSlider
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
          >
            <template #default="{ product }">
              <div class="py-4">
                <ProductDefault :product="product" />
              </div>
            </template>
          </AppSlider> -->
          <UButton
            icon="i-ph-caret-right"
            color="color-5"
            variant="link"
            size="xl"
            class="disable:opacity-60 hidden w-12 h-12 lg:block"
            :class="`prev-${category.id}`"
          />
        </div>

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
  @apply mb-0 text-xl inline-block lg:text-3xl font-extrabold text-color-6;
}

.landing__content {
  @apply relative pt-6;
}

.landing__slide {
  @apply !w-[167px] mr-2 md:!w-[180px] md:mr-[10px] lg:!w-[260px] lg:mr-0;
}

swiper-container::part(bullet-active) {
  --swiper-pagination-color: rgba(0, 0, 0, 0.7);
  --swiper-pagination-color: #ddabac;
}
</style>
