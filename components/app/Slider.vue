<script lang="ts" setup>
import { Navigation } from 'swiper/modules';
import 'swiper/element/css/navigation';

type Slider = {
  image: string;
  title: string;
  description: string;
};

interface Props {
  items: string[] | Product[] | Slider[];
  slidesPerView?: number;
  spaceBetween?: number;
  centeredSlides?: boolean;
  breakpoints?: Record<number, Record<string, unknown>>;
}

const props = withDefaults(defineProps<Props>(), {
  slidesPerView: 1,
  spaceBetween: 1,
  centeredSlides: false,
});

const renderImages = ref(false);
const images = ref<string[]>([]);
const sliders = ref<Slider[]>();
const products = ref<Product[]>();

watchEffect(() => {
  const isString = typeof props!.items[0] === 'string';
  const isSlider = (props?.items[0] as Slider)?.image;

  if (isString) {
    renderImages.value = true;
    images.value = props.items as string[];
    return;
  }

  if (isSlider) {
    sliders.value = props.items as Slider[];
    return;
  }

  renderImages.value = false;
  products.value = props.items as Product[];
});
</script>

<template>
  <swiper-container
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :centered-slides="centeredSlides"
    :breakpoints="breakpoints"
    loop
    :navigation="true"
    :modules="[Navigation]"
  >
    <template v-if="renderImages">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <div>
          <img class="slider__image" :src="image" alt="Products of the brand" />
        </div>
      </swiper-slide>
    </template>

    <template v-else-if="sliders.lenght > 0">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <div>
          <img
            class="slider__image"
            :src="slider.image"
            alt="Products of the brand"
          />
        </div>
      </swiper-slide>
    </template>

    <template v-else>
      <swiper-slide
        v-for="item in products"
        :key="item.id"
        class="landing__slide"
      >
        <slot :product="item" />
      </swiper-slide>
    </template>
  </swiper-container>
</template>

<style scoped>
.slider__image {
  @apply w-full;
}

:global(:root) {
  --swiper-navigation-color: white;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  --swiper-navigation-size: 10px;
}

:root {
  --swiper-navigation-color: white;
  --swiper-pagination-color: white;
}
</style>