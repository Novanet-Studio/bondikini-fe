<script lang="ts" setup>
const appConfig = useAppConfig();

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
  <div>
    <LazyAppSlider :items="appConfig.home.sliders" orientation="slider-left" />
    <div class="default__content">
      <AppMessage class="default__message">
        Discover our diverse collection of bikinis, one pieces, and swimwear
        sets that come with matching cover ups.
      </AppMessage>
      <product-loader v-if="isLoading" />
      <div id="parent" v-else>
        <AppCategories
          :categories="categories"
          :categoryActive="categoryActive"
          :filterByCategory="filterByCategory"
          :removeFilters="removeFilters"
        />
        <TransitionGroup name="list" tag="div">
          <ProductLanding
            v-for="category in categoriesResult"
            :key="category.id"
            :category="category"
            :filtered="!!categoryActive"
            @filter="filterByCategory(category.id, '#parent')"
          />
        </TransitionGroup>

        <AppMessage class="default__message" variant="secondary">
          Bondikini was made with the woman in mind who is comfortable in her
          own skin who wants quality pieces providing the latest styles with a
          touch of elegance.
        </AppMessage>
      </div>
    </div>
  </div>
</template>
