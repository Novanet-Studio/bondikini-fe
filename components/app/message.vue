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
  const variant = props.variant === 'primary' ? 'bg-color-1' : 'bg-color-2';
  return `${props.class} ${variant}`;
});

const mode = computed<string>(() => {
  return props.mode === 'normal' ? 'py-25' : 'py-15';
});
</script>

<template>
  <div
    class="w-full text-white relative flex justify-between items-center shadow overflow-hidden px-28 rounded-lg"
    :class="classes"
  >
    <h3 class="font-300 md:text-xl md:-mb-1 lg:mb-0 lg:text-3xl" :class="mode">
      <slot />
    </h3>
    <div class="relative w-60 h-60 block">
      <img
        class="lg:h-60 absolute top-0 right-0"
        src="/palm.svg"
        alt="Palm Tree"
      />
    </div>
  </div>
</template>
