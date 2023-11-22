<script setup>
import { injectKeys } from '~/config/constants';

const isOpen = ref(true);
const productStore = useProductStore();
const size = ref({});

const product = computed(() => productStore.product);
provide(injectKeys.productDetail, product);
</script>

<template>
  <UButton @click="isOpen = !isOpen">Open</UButton>
  <USlideover v-model="isOpen" prevent-close>
    <UCard
      class="flex flex-col flex-1 divide-y-0 divide-none"
      :ui="{
        body: { base: 'flex-1', ring: '' },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg md:text-2xl text-color-6">
            {{ product.name }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
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
            class="h-60 w-full object-cover"
          />
        </NuxtLink>

        <!-- <ProductInformationDefault /> -->
        <ProductInformation :show-title="false" />
        <ProductSizes v-model="size" />
      </div>
      <template #footer>
        <UButton block color="color-3" size="lg">Continue</UButton>
      </template>
    </UCard>
  </USlideover>
</template>
