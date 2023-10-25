<script setup lang="ts">
import { FreeMode, Navigation, Mousewheel, Thumbs } from 'swiper/modules';
import { injectKeys } from '~/config/constants';

defineEmits<{
  (e: 'show-lightbox'): void;
}>();

const product = inject(injectKeys.productDetail) as Ref<Product>;
const thumbsSwiper = ref(null);

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1366,
  '3xl': 3600,
});

const swiperThumbsDirection = computed(() =>
  breakpoints.greaterOrEqual('sm').value ? 'vertical' : 'horizontal'
);

const setThumbsSwiper = (swiper: any) => (thumbsSwiper.value = swiper);
</script>

<template>
  <div class="md:flex md:flex-row-reverse md:gap-4">
    <figure>
      <div class="max-w-3xl md:max-w-16rem">
        <!-- Gallery-->
        <div class="relative" @click="$emit('show-lightbox')">
          <swiper-container
            class="main-swiper"
            :space-between="10"
            navigation
            autoplay
            pagination
            thumbs-swiper=".swiper-thumbs"
            free-mode
            :modules="[Navigation, Thumbs, Mousewheel]"
          >
            <swiper-slide v-for="image in product.images" :key="image.id">
              <img
                class="rounded-sm"
                :src="image.url"
                :alt="image.alternativeText"
              />
            </swiper-slide>
          </swiper-container>

          <span
            class="absolute top-0 right-4 w-[3.6875rem] h-[4.375rem] rounded-b-full bg-color-3 p-4 flex items-center justify-center text-lg text-color-2 z-10"
          >
            ${{ product.price }}
          </span>
        </div>
      </div>
    </figure>
    <!-- Thumbnail -->
    <div
      class="max-w-48 mt-5 md:max-w-24 md:mt-0 px-8 flex justify-center gap-2"
    >
      <UButton
        icon="i-ph-caret-left-bold"
        class="prev-btn"
        :ui="{
          icon: {
            base: 'text-2xl w-6 h-6',
          },
        }"
        variant="link"
        :padded="false"
      />
      <div>
        <swiper-container
          class="swiper-thumbs"
          @swiper="setThumbsSwiper"
          :modules="[FreeMode, Navigation]"
          :space-between="10"
          :slides-per-view="3"
          :navigation="{
            prevEl: '.prev-btn',
            nextEl: '.next-btn',
          }"
          thumbs
          :direction="swiperThumbsDirection"
        >
          <swiper-slide v-for="image in product.images" :key="image.id">
            <img
              class="object-contain rounded-sm h-full"
              :src="image.url"
              :alt="image.alternativeText"
            />
          </swiper-slide>
        </swiper-container>
      </div>
      <UButton
        icon="i-ph-caret-right-bold"
        :ui="{
          icon: {
            base: 'text-2xl w-6 h-6',
          },
        }"
        class="next-btn text-xl"
        variant="link"
        :padded="false"
      />
    </div>
  </div>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.main-swiper {
  /* height: 80%; */
  width: 100%;
}

.swiper-thumbs {
  @apply h-[160px] w-[350px] box-border px-0 py-[10px] md:w-[300px] md:h-[400px] lg:w-[300px] lg:h-[400px];
}

.swiper-thumbs .swiper-slide-visible,
.swiper-thumbs .swiper-slide-next,
.swiper-thumbs .swiper-slide-active {
  @apply opacity-40;
}

.swiper-thumbs .swiper-slide-thumb-active {
  @apply opacity-100;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
