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

const swiperPrevBtnIcon = computed(() =>
  breakpoints.greaterOrEqual('sm').value
    ? 'i-ph-caret-up-bold'
    : 'i-ph-caret-left-bold'
);

const swiperNextBtnIcon = computed(() =>
  breakpoints.greaterOrEqual('sm').value
    ? 'i-ph-caret-down-bold'
    : 'i-ph-caret-right-bold'
);

const setThumbsSwiper = (swiper: any) => (thumbsSwiper.value = swiper);
</script>

<template>
  <div class="md:flex md:flex-row md:gap-4">
    <figure class="md:min-h-full">
      <div class="max-w-3xl md:max-w-[20rem] md:min-h-full lg:max-w-[30rem]">
        <!-- Gallery-->
        <div class="relative md:min-h-full" @click="$emit('show-lightbox')">
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
            <swiper-slide
              class="md:min-h-full"
              v-for="image in product.images"
              :key="image.id"
            >
              <img
                class="rounded-sm md:h-[33rem] lg:min-h-[40rem]"
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
      class="max-w-48 mt-5 px-8 flex justify-center gap-2 md:max-w-[10rem] md:mt-0 md:flex-col md:justify-start md:items-center md:px-4 md:py-8"
    >
      <UButton
        :icon="swiperPrevBtnIcon"
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
              class="object-contain rounded-sm h-full lg:min-w-[19rem]"
              :src="image.url"
              :alt="image.alternativeText"
            />
          </swiper-slide>
        </swiper-container>
      </div>
      <UButton
        :icon="swiperNextBtnIcon"
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
  @apply h-[160px] w-[350px] box-border px-0 py-[10px] md:w-[72px] md:h-[400px] md:py-0 lg:w-full lg:h-[500px];
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
