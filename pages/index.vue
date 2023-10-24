<script lang="ts" setup>
const {
  isLoading,
  categories,
  categoryActive,
  categoriesResult,
  filterByCategory,
  removeFilters,
} = useCategory({
  ordered: true,
});
</script>

<template>
  <div class="w-full">
    <AppBanner />
    <section class="mx-24">
      <AppMessage class="mt-10">
        Discover our diverse collection of bikinis, one pieces, and swimwear
        sets that come with matching cover ups.
      </AppMessage>
      <product-loader v-if="isLoading" />
      <template v-else>
        <div class="flex items-center justify-between mt-8">
          <h3 class="ml-5 text-color-6 font-bold text-3xl">Categorías</h3>
          <Transition name="slide-fade">
            <button
              class="block text-xs border border-color-3 px-2 py-1 rounded-xl text-color-3 md:px-4 md:py-2 md:rounded-full lg:transition lg:ease-linear lg:hover:bg-color-3/10"
              @click="removeFilters"
              v-if="!!categoryActive"
            >
              Remover filtro
            </button>
          </Transition>
        </div>
        <div
          class="grid place-items-center place-content-center mt-4 md:max-w-3xl md:mx-auto lg:mx-none lg:grid-cols-4"
        >
          <button
            v-for="category in categories"
            :key="category.id"
            @click="filterByCategory(category.id)"
          >
            <NuxtImg
              class="w-20 h-20 rounded-full object-cover border-3 md:w-30 md:h-30 lg:w-36 lg:h-36"
              :class="
                category.id === categoryActive
                  ? 'border-color-3'
                  : 'border-color-5'
              "
              :src="category.products[0].images[0].url"
            />
            <span
              class="text-xs font-bold md:text-sm lg:text-base lg:block lg:mt-4"
              >{{ category.name }}</span
            >
          </button>
        </div>
        <TransitionGroup name="list" tag="div">
          <product-landing
            v-for="category in categoriesResult"
            :key="category.id"
            :category="category"
            :filtered="!!categoryActive"
          />
        </TransitionGroup>
      </template>
    </section>
  </div>
</template>
