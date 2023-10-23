<script setup lang="ts">
definePageMeta({
  layout: 'account',
});

const wishlist = useWishlistStore();
const productStore = useProductStore();

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Lista de deseos';

onMounted(() => {
  wishlist.load();
});
</script>

<template>
  <wishlist-wrapper>
    <h5
      v-if="!productStore?.wishlistItems?.length"
      class="text-sm font-bold text-color-7 text-center mb-12"
    >
      No tienes articulos en tu lista de deseos
    </h5>
    <wishlist-table @reload="wishlist.load" v-else />
  </wishlist-wrapper>
</template>
