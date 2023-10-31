<template>
  <div class="contact">
    <AppMessage class="default__message">
      Our collections offer a diverse selection of sizes and styles to suit the
      sophisticated yet fun woman who is always in style.
    </AppMessage>

    <h2 class="contact__header">Get in touch</h2>

    <div class="contact__touch">
      <ContactForm />
      <ContactInfo />
    </div>

    <AppMessage class="default__message" variant="secondary">
      Whether you're looking for something elegant or playful, we have the
      swimwear for you. For a limited time only the same price for any swimsuit
      in its category!
    </AppMessage>
  </div>
</template>

<style scoped>
.contact {
  @apply container mt-14 md:mt-24;
}

.contact__header {
  @apply text-3xl font-bold border-b-2 border-b-color-1 pb-2 mt-12;
}

.contact__touch {
  @apply grid gap-12 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_30%] lg:gap-24;
}
</style>
