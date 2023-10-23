<script setup>
defineProps({
  title: String,
  subtitle: String,
  class: String,
});
</script>

<template>
  <div
    class="w-full rounded-xl p-6 bg-gradient-linear bg-gradient-to-[#E6E7E8] bg-gradient-from-[#FFFFFF] flex flex-col justify-center items-center shadow lg:py-24"
    :class="class"
  >
    <h3 class="-mb-2 md:(text-xl -mb-1 font-700) lg:(mb-0 text-3xl)">
      {{ title }}
    </h3>
    <h4 class="font-900 md:text-xl lg:(text-3xl mb-1)">{{ subtitle }}</h4>
    <logo-dots />
  </div>
</template>
