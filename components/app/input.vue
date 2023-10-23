<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  name: string;
  placeholder?: string;
  class?: string;
  type?: 'text' | 'password' | 'email' | 'date';
  iconLeft?: string;
  iconRight?: string;
  disabled?: boolean;
};

const focus = ref(false);

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="input-group" :class="class">
    <div
      class="flex items-center border p-3 rounded-md bg-white lg:p-4"
      :class="[
        errorMessage?.length && 'border-red-5',
        focus && 'border-color-2',
        disabled && 'opacity-70',
      ]"
    >
      <div class="mr-3" v-if="$slots.left && !iconLeft">
        <slot name="left" />
      </div>
      <div class="mr-3" v-if="!$slots.left && iconLeft">
        <div class="text-black/40" :class="iconLeft"></div>
      </div>
      <input
        class="w-4/5 text-xs md:w-full outline-none md:text-sm"
        :type="type"
        v-model="value"
        @focus="focus = true"
        @blur="focus = false"
        :placeholder="placeholder"
        height="50"
        :disabled="disabled"
      />
      <div v-if="$slots.right && !iconRight">
        <slot name="right" />
      </div>
      <div v-if="!$slots.right && iconRight">
        <div class="text-black/40" :class="iconRight"></div>
      </div>
    </div>
    <div class="text-xs pt-1 text-red-500" v-if="errorMessage?.length">
      {{ errorMessage }}
    </div>
  </div>
</template>
