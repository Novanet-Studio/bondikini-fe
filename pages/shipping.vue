<template>
  <section class="block mt-20 container mb-20">
    <header class="b-header">
      <h1 class="b-title">Shipment information</h1>
    </header>
    <div class="b-content">
      <div class="b-left md:mt-8">
        <ResumeInformation />
        <div class="b-link-wrapper">
          <NuxtLink
            to="/checkout"
            class="flex items-center text-sm lg:text-base"
          >
            <div class="i-ph-arrow-left-light mr-2" />
            Return
          </NuxtLink>
          <NuxtLink to="/payment" class="ps-btn">
            <UButton
              class="px-8 rounded-full"
              label="Continue with payment"
              color="color-3"
              size="lg"
              @click="$router.push('/payment')"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="b-right">
        <AppOrderSummary :shipping="false" />
      </div>
    </div>
  </section>
</template>
