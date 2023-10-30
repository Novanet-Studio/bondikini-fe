<script setup lang="ts">
interface Props {
  class?: string;
  variant?: 'primary' | 'secondary';
  mode?: 'normal' | 'small';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  mode: 'normal',
});

const classes = computed(() => {
  const variant =
    props.variant === 'primary'
      ? 'bg-color-1 text-white'
      : 'bg-color-2 text-color-5';
  return `${props.class} ${variant}`;
});

const mode = computed<string>(() => {
  return props.mode === 'normal' ? 'py-25' : 'py-15';
});
</script>

<template>
  <div :class="classes">
    <h3 :class="mode">
      <slot />
    </h3>

    <PalmTree
      :width="640"
      :height="538"
      :class="variant === 'primary' ? 'fill-white' : 'fill-color-5'"
    />
  </div>
</template>

<style scoped>
.default__message {
  @apply w-full relative flex justify-between items-center shadow overflow-hidden rounded-lg mt-10;
}
.default__message h3 {
  @apply py-6 px-6 md:text-xl md:-mb-1 lg:mb-0 lg:text-4xl lg:pl-20 lg:py-24;
}
.default__message svg {
  @apply absolute top-0 right-0 opacity-20;
}
</style>
