<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const value = defineModel<SizeStock>({
  default: {},
});

const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="mt-2 flex gap-4">
    <template v-for="size in product?.size_stock" :key="size.id">
      <UTooltip
        v-if="!size.inventario"
        :text="`No stock for '${size.talla}' size`"
        :popper="{ placement: 'top' }"
      >
        <button
          class="w-10 h-10 rounded-full bg-color-1 text-color-3 text-xs font-bold ring-1 ring-offset-2 ring-offset-[#ecedee] ring-transparent shadow-md lg:w-14 lg:h-14 lg:text-sm"
          :class="[size.inventario ? '' : 'opacity-60 cursor-default']"
          @click="value = size"
        >
          {{ size.talla }}
        </button>
      </UTooltip>
      <button
        v-else
        class="w-10 h-10 rounded-full bg-color-1 text-color-3 text-xs font-bold ring-1 ring-offset-2 ring-offset-[#ecedee] shadow-md lg:w-14 lg:h-14 lg:text-sm"
        :class="[
          value?.talla === size.talla ? 'ring-color-3' : 'ring-transparent',
          size.inventario ? '' : 'opacity-60 cursor-default',
        ]"
        @click="value = size"
      >
        {{ size.talla }}
      </button>
    </template>
  </div>
</template>
