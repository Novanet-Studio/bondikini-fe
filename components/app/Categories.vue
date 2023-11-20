<script lang="ts" setup>
interface Props {
  categories: Category[];
  categoryActive: string;
  filterByCategory: (id: string) => void;
  removeFilters: () => void;
}

defineProps<Props>();
</script>

<template>
  <section class="mt-12">
    <div class="categories__header">
      <h3 class="categories__title">Categories</h3>
      <Transition name="slide-fade">
        <button
          class="categories__btn"
          @click="removeFilters"
          v-if="!!categoryActive"
        >
          Remove filters
        </button>
      </Transition>
    </div>
    <div class="categories__grid">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="filterByCategory(category.id)"
      >
        <NuxtImg
          class="categories__img"
          :class="
            category.id === categoryActive ? 'ring-color-1' : 'ring-transparent'
          "
          :src="category.products[0].images[0].url"
        />
        <span class="categories__name">{{ category.name }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.categories__header {
  /* @apply flex items-center justify-between mt-8 border-b-2 border-b-color-2 mx-6 pb-4; */
  @apply flex items-center justify-between mt-8;
}

.categories__title {
  /* @apply text-xl text-color-1 font-normal lg:text-4xl; */
  @apply text-xl ml-5 text-color-6 font-bold lg:text-3xl;
}

.categories__btn {
  /* @apply block text-xs border border-red-500 px-2 py-1 rounded-xl text-red-500 md:px-4 md:py-2 md:rounded-full lg:transition lg:ease-linear lg:hover:bg-color-1/10; */
  @apply block text-xs border border-color-3 px-2 py-1 rounded-xl text-color-3 md:px-4 md:py-2 md:rounded-full lg:transition lg:ease-linear lg:hover:bg-color-3/10;
}

.categories__grid {
  /* @apply grid place-items-center place-content-center gap-4 mt-4 grid-cols-2 md:max-w-3xl md:mx-auto lg:mx-0 lg:grid-cols-8 lg:max-w-full lg:mt-8; */
  @apply grid place-items-center place-content-center gap-4 mt-4 grid-cols-2 md:max-w-3xl md:mx-auto lg:mx-0 lg:grid-cols-4;
}

.categories__img {
  /* @apply w-20 h-20 rounded-full object-cover ring-[3px] ring-offset-2 ring-offset-white md:w-32 md:h-32 lg:w-36 lg:h-36; */
  @apply w-20 h-20 rounded-full object-cover ring-[3px] ring-offset-2 ring-offset-white md:w-32 md:h-32 lg:w-36 lg:h-36;
}

.categories__name {
  /* @apply text-xs text-gray-600 font-medium md:text-sm lg:text-base lg:block lg:mt-4; */
  @apply text-xs font-bold md:text-sm lg:text-base lg:block lg:mt-4;
}
</style>
