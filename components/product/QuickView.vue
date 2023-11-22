<script setup>
import { injectKeys } from '~/config/constants';

const productStore = useProductStore();
const globalStore = useGlobalStore();

const { showProductQuickView } = storeToRefs(globalStore);

const size = ref({});
const actions = ref(null);

const product = computed(() => productStore.product);

function closeQuickView() {
  showProductQuickView.value = false;
}

provide(injectKeys.productDetail, product);
</script>

<template>
  <USlideover v-model="showProductQuickView" prevent-close>
    <UCard
      class="flex flex-col flex-1 divide-y-0 divide-none"
      :ui="{
        body: { base: 'flex-1', ring: '' },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg md:text-2xl text-color-6">
            {{ product?.name }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="closeQuickView"
          />
        </div>
      </template>
      <div class="flex-1">
        <NuxtLink :to="`/product/${product.id}`">
          <NuxtImg
            :src="product?.images[0]?.url"
            :alt="product.name"
            :placeholder="[208, 232, 10]"
            sizes="sm:0.625em md:13.125em"
            fit="outside"
            class="h-72 w-full object-cover"
          />
        </NuxtLink>

        <div class="mt-6">
          <ProductInformation short-description :show-title="false" />
        </div>
        <div class="mt-6">
          <ProductSizes v-model="size" />
          <ProductActions ref="actions" :size="size" />
        </div>
      </div>
      <template #footer>
        <UButton
          block
          color="color-3"
          size="lg"
          @click="actions.handleAddToCart(true)"
          label="Continue"
        />
      </template>
    </UCard>
  </USlideover>
</template>
