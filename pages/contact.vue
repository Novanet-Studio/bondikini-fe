<template>
  <section class="container mt-14 md:mt-24">
    <AppMessage variant="secondary">
      Our collections offer a diverse selection of sizes and styles to suit the
      sophisticated yet fun woman who is always in style.
    </AppMessage>

    <header class="w-full border-b-2 border-b-color-1 mt-12">
      <h2 class="text-3xl font-bold pb-2">Get in touch</h2>
    </header>

    <div
      class="grid gap-12 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_30%] lg:gap-24"
    >
      <ContactForm />
      <ContactInfo />
    </div>

    <AppMessage class="my-16 lg:mt-24" variant="secondary">
      Whether you're looking for something elegant or playful, we have the
      swimwear for you. For a limited time only the same price for any swimsuit
      in its category!
    </AppMessage>
  </section>
</template>
