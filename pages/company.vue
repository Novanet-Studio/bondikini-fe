<script setup>
const appConfig = useAppConfig();

definePageMeta({
  name: 'Company',
});
</script>

<template>
  <section>
    <AppSlider :items="appConfig.home.slider" />
    <div class="container mt-16">
      <AppMessage variant="secondary">
        Dive into our stunning range of swimsuits, where style meets
        functionality for every beach lover’s delight. Explore endless options
        today.
      </AppMessage>

      <div class="w-full grid grid-cols-2 mt-16 divide-x divide-color-2">
        <p class="p-8 text-color-[#5A5A5A] text-2xl">
          Welcome to Bondikini where you can bask in the warm rays of
          confidence, chic vibes and fun in the sun! Our company is dedicated to
          providing high-quality, fashionable swimwear that empowers women by
          the beach or by the pool or on a yacht in the middle of the clear blue
          waters.
        </p>
        <p class="p-8 text-color-[#5A5A5A] text-2xl">
          Whether you're looking for subtle sophistication in black and white or
          splashing fun with colors, textures and pearl appliques Bondikini has
          what you're looking for. <br />
          <b>Coming Soon:</b> swimwear accessories and more!
        </p>
      </div>
    </div>
  </section>
</template>
