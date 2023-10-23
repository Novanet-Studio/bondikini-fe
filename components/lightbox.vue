<script lang="ts" setup>
import {
  FreeMode,
  Navigation,
  Pagination,
  Mousewheel,
  Thumbs,
} from 'swiper/modules';

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();
const props = defineProps<{ modelValue: boolean; images: Image[] }>();

const active = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const lightboxThumbsSwiper = ref(null);

const setLightboxThumbsSwiper = (swiper: any) =>
  (lightboxThumbsSwiper.value = swiper);

function close() {
  emit('close');
  active.value = false;
}
</script>

<template>
  <app-modal v-model="active">
    <div class="lightbox">
      <a class="lightbox__icon" @click="close">
        <div class="i-ph-x-light" />
      </a>
      <div class="md:(flex flex-row-reverse gap-4)">
        <figure>
          <div class="ps-wrapper max-w-3xl md:max-w-16rem">
            <!-- Gallery-->
            <div class="ps-product__gallery relative">
              <swiper-container
                class="lightbox-swiper"
                :space-between="10"
                navigation
                autoplay
                pagination
                thumbs-swiper=".lightbox-thumbs"
                :modules="[Navigation, Thumbs, Mousewheel, Pagination]"
              >
                <swiper-slide v-for="image in images" :key="image.id">
                  <img
                    class="rounded-2xl"
                    :src="image.url"
                    :alt="image.alternativeText"
                  />
                </swiper-slide>
              </swiper-container>
            </div>
          </div>
        </figure>
        <!-- Thumbnail -->
        <div class="ps-product__variants max-w-full mt-5 md:(max-w-32 mt-0)">
          <swiper-container
            class="lightbox-thumbs"
            @swiper="setLightboxThumbsSwiper"
            :modules="[FreeMode, Navigation]"
            :space-between="10"
            :slides-per-view="4"
            free-mode
            watch-slides-progress
            autoplay
            navigation
            pagination
            thumbs
          >
            <swiper-slide v-for="image in images" :key="image.id">
              <img
                class="object-contain rounded-xl h-90px"
                :src="image.url"
                :alt="image.alternativeText"
              />
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </div>
  </app-modal>
</template>

<style scoped>
.lightbox {
  @apply p-4 relative lg:p-6;
}

.lightbox__icon {
  @apply absolute top-3 right-4 cursor-pointer z9;
}

.lightbox-thumbs {
  /* @apply h-100px box-border px-0 py-10px md:(w-300px h-400px) lg:(w-100px w-300px h-400px); */
}

.lightbox-thumbs .swiper-slide-visible {
  @apply opacity-40 !border-2 !border-gray rounded-md;
  /* width: 25%;
  @apply h-100px; */
}

.lightbox-thumbs .swiper-slide-thumb-active {
  /* opacity: 1; */
  @apply !border-2 !border-red-9 opacity-100;
}
</style>
