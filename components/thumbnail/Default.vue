<script setup lang="ts">
import { Navigation, Mousewheel, Thumbs } from 'swiper/modules';
import { injectKeys } from '~/config/constants';

defineEmits<{
  (e: 'show-lightbox'): void;
}>();

const product = inject(injectKeys.productDetail) as Ref<Product>;
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper: any) => (thumbsSwiper.value = swiper);
</script>

<template>
  <div class="product__gallery">
    <div class="product__image">
      <!-- Gallery-->
      <div class="product__image-wrapper" @click="$emit('show-lightbox')">
        <swiper-container
          class="swiper-main"
          thumbs-swiper=".swiper-thumbnails"
          :modules="[Navigation, Thumbs, Mousewheel]"
          :space-between="0"
          :slides-per-view="1"
        >
          <swiper-slide v-for="image in product.images" :key="image.id">
            <nuxt-img
              class="swiper-main__image"
              :src="image.url"
              :alt="image.alternativeText"
            />
          </swiper-slide>
        </swiper-container>
        <span class="product__price"> ${{ product.price }} </span>
      </div>
    </div>
    <!-- Thumbnail -->
    <swiper-container
      class="swiper-thumbnails"
      @swiper="setThumbsSwiper"
      :modules="[Navigation]"
      navigation="true"
      :space-between="3"
      :slides-per-view="3"
      thumbs
    >
      <swiper-slide v-for="image in product.images" :key="image.id">
        <nuxt-img
          class="swiper-thumb-image"
          :src="image.url"
          :alt="image.alternativeText"
        />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style scoped>
.product__image {
  @apply max-w-3xl md:max-w-[20rem] lg:max-w-[30rem];
}
.product__image-wrapper {
  @apply relative md:min-h-full;
}
.product__price {
  @apply absolute top-0 right-4 w-[3.6875rem] h-[4.375rem] rounded-b-full bg-color-3 p-4 flex items-center justify-center text-lg text-color-2 z-10;
}
.swiper-main {
  @apply w-full;
}
.swiper-main__image {
  @apply w-full;
}
.swiper-thumbnails-old {
  @apply flex w-full mt-5 md:max-w-[10rem] md:mt-0 md:flex-col md:justify-start md:items-center md:px-4 md:py-8;
}
.swiper-thumbnails {
  @apply h-[10em] py-[.5em]
   md:w-[20em] md:py-0 lg:w-[30em];
}
.swiper-thumbnails .swiper-slide-visible,
.swiper-thumbnails .swiper-slide-next,
.swiper-thumbnails .swiper-slide-active {
  @apply opacity-40;
}
.swiper-thumbnails .swiper-slide-thumb-active {
  @apply opacity-100;
}
.swiper-thumb-image {
  @apply object-cover w-full h-full;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  --swiper-navigation-size: 1.8rem;
  padding: 0.5em;
  border-radius: 50%;
  width: 0.8em;
  height: 0.8em;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  background-color: black;
}
</style>
