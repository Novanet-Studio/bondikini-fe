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
  <div>
    <AppBanner />
    <div class="default__content">
      <AppMessage class="default__message">
        Discover our diverse collection of bikinis, one pieces, and swimwear
        sets that come with matching cover ups.
      </AppMessage>
      <product-loader v-if="isLoading" />
      <div id="parent" v-else>
        <div class="default__categories-header">
          <h3>Categories</h3>
          <Transition name="slide-fade">
            <button @click="removeFilters" v-if="!!categoryActive">
              Remove filter
            </button>
          </Transition>
        </div>
        <div class="default__categories-grid">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="filterByCategory(category.id)"
          >
            <NuxtImg
              :class="
                category.id === categoryActive ? 'ring-color-3' : 'ring-color-4'
              "
              :src="category.products[0].images[0].url"
            />
            <span>{{ category.name }}</span>
          </button>
        </div>
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
