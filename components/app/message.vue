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
  <div
    class="w-full relative flex justify-between items-center shadow overflow-hidden rounded-lg"
    :class="classes"
  >
    <div>
      <h3
        class="font-300 py-6 px-6 md:text-xl md:-mb-1 lg:mb-0 lg:text-4xl lg:max-w-[75%] lg:pl-20 lg:py-24"
        :class="mode"
      >
        <slot />
      </h3>
    </div>
    <PalmTree
      :height="220"
      class="hidden absolute bottom-0 right-24 md:block"
      :class="variant === 'primary' ? 'fill-white' : 'fill-color-5'"
    />
  </div>
</template>
