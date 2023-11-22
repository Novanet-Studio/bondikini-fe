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
  orientation?: string;
}

const props = withDefaults(defineProps<Props>(), {
  slidesPerView: 1,
  spaceBetween: 1,
  centeredSlides: false,
});

const renderImages = ref(false);
const images = ref<string[]>([]);
const sliders = ref<Slider[]>([]);
const products = ref<Product[]>([]);

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
          <img class="slider__image" :src="image" alt="Bondikini Swimwear" />
        </div>
      </swiper-slide>
    </template>

    <template v-else-if="sliders.length">
      <swiper-slide v-for="(slider, index) in sliders" :key="index">
        <div class="slider__wrapper">
          <h1 v-if="slider.title" :class="`slider__title ${orientation}`">
            {{ slider.title }}
          </h1>
          <p
            v-if="slider.description"
            :class="`slider__description ${orientation}`"
          >
            {{ slider.description }}
          </p>
          <img
            class="slider__image"
            :src="slider.image"
            alt="Bondikini Swimwear"
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
.slider__wrapper {
  @apply relative w-full;
}
.slider__image {
  @apply w-full;
}
.slider__title {
  @apply absolute top-6 text-xl text-color-3 font-semibold
  md:text-5xl md:top-1/4;
}
.slider__description {
  @apply absolute bottom-1/4 pr-14 text-black
  md:text-3xl md:bottom-1/4;
}
.slider-left {
  @apply left-12 md:left-16;
}
.slider-right {
  @apply right-16;
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
