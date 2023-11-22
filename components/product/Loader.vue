<script lang="ts" setup>
withDefaults(defineProps<{ items?: number }>(), {
  items: 2,
});
</script>

<template>
  <div class="skeleton">
    <!-- Categories -->
    <div class="ml-4">
      <div class="skeleton__c-header" />
      <div class="skeleton__c-wrapper">
        <div class="skeleton__c-card" v-for="i in 3" :key="i">
          <div class="skeleton__c-img" />
          <div class="skeleton__c-name" />
        </div>
      </div>
    </div>
    <!-- Product -->
    <div class="mt-12">
      <div class="skeleton__header" />
      <div class="skeleton__wrapper">
        <div class="skeleton-card" v-for="i in items" :key="i" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  @apply animate-pulse my-8 flex flex-col;
}

.skeleton__c-header {
  @apply w-40 h-8 ml-4 bg-gray-200;
}

.skeleton__c-wrapper {
  @apply grid grid-cols-2 place-items-center place-content-center gap-4 md:max-w-3xl md:mx-auto lg:mx-0 lg:grid-cols-4;
}

.skeleton__c-card {
  @apply flex flex-col items-center gap-3;
}

.skeleton__c-img {
  @apply w-20 h-20 rounded-full mt-4 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-gray-200;
}

.skeleton__c-name {
  @apply w-28 h-3 bg-gray-200;
}

.skeleton__header {
  @apply w-full h-12 bg-gray-200;
}

.skeleton__wrapper {
  @apply flex gap-8;
}

.skeleton-card {
  @apply w-[24.9688rem] h-[26.25rem] mt-8 flex flex-col items-center p-4 bg-gray-200;
}
</style>
