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
    <app-banner />
    <section class="mx-24">
      <!-- <app-message
        title="¿Quieres conocer nuestra colección?"
        subtitle="Tenemos artículos para todos"
      /> -->
      <product-loader v-if="isLoading" />
      <template v-else>
        <div class="flex items-center justify-between mt-8">
          <h3 class="ml-5 text-color-2 font-900 text-2xl">Categorías</h3>
          <transition name="slide-fade">
            <button
              class="block text-xs border border-color-3 px-2 py-1 rounded-xl text-color-3 md:px-4 md:py-2 md:rounded-full lg:transition lg:ease-linear lg:hover:bg-color-3/10"
              @click="removeFilters"
              v-if="!!categoryActive"
            >
              Remover filtro
            </button>
          </transition>
        </div>
        <div
          class="grid grid-cols-3 place-items-center content-center mt-4 md:max-w-3xl md:mx-auto md:grid-cols-5 lg:mx-none lg:grid-cols-6"
        >
          <button
            v-for="category in categories"
            :key="category.id"
            @click="filterByCategory(category.id)"
          >
            <nuxt-img
              class="w-20 h-20 rounded-full object-cover border-3 md:w-30 md:h-30"
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
        <transition-group name="list" tag="div">
          <product-landing
            v-for="category in categoriesResult"
            :key="category.id"
            :category="category"
            :filtered="!!categoryActive"
          />
        </transition-group>
      </template>
    </section>
  </div>
</template>
