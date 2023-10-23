<script lang="ts" setup>
type Props = {
  type?: 'submit' | 'button';
  class?: string;
  disabled?: boolean;
  outline?: boolean;
  loading?: boolean;
};

type Emits = {
  (e: 'click'): void;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
});

const classes = computed(() => {
  if (props.outline) {
    return `btn btn-outline ${props.class && props.class}`;
  }

  return `btn ${props.class && props.class}`;
});

defineEmits<Emits>();

const $ref = ref(null);

defineExpose({
  $ref,
});
</script>

<template>
  <button
    :type="type"
    :class="classes"
    @click.prevent="$emit('click')"
    :disabled="disabled"
    ref="$ref"
  >
    <app-loader v-if="loading" />
    <slot v-else />
  </button>
</template>

<style>
.btn {
  @apply w-full text-center text-white py-2 font-bold inline-block text-xs border-transparent rounded-full bg-color-2 transition ease cursor-pointer md:text-sm hover:(bg-opacity-80) active:(bg-opacity-80) disabled:(opacity-70 text-gray cursor-not-allowed) md:py-2 lg:py-4;
}

.btn--outline {
  @apply flex justify-center border !bg-transparent rounded-full border-color-2 text-color-2 hover:( !bg-color-2 !border-transparent !text-white);
}
</style>
