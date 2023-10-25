<script setup lang="ts">
const quantity = defineModel({
  default: 1,
});

withDefaults(
  defineProps<{
    disabled: boolean;
  }>(),
  {
    disabled: false,
  }
);

defineEmits(['increase', 'descrease']);
</script>

<template>
  <div
    class="max-w-[6.25rem] flex items-center justify-between rounded-full shadow-md lg:px-4 bg-white"
  >
    <button
      class="px-2 disabled:opacity-50"
      @click.prevent="$emit('descrease')"
      :disabled="disabled"
    >
      <div class="i-ph-minus-light text-xs text-gray-5 lg:text-sm" />
    </button>
    <input
      v-model="quantity"
      class="h-3 w-4 text-center bg-transparent text-black text-xs lg:text-sm"
      type="text"
      disabled
    />
    <button
      class="px-2 disabled:opacity-50"
      @click.prevent="$emit('increase')"
      :disabled="disabled"
    >
      <div class="i-ph-plus-light text-xs text-gray-5 lg:text-sm" />
    </button>
  </div>
</template>
