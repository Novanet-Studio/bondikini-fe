<template>
  <div class="block mt-20 container mb-15">
    <header class="b-header">
      <h1 class="b-title">Payment method</h1>
    </header>
    <div class="b-content">
      <div class="b-left">
        <ResumeInformation />
        <h4 class="b-subtitle mt-12">Selecciona el método de pago</h4>
        <PaymentMethods />
        <div class="b-link-wrapper">
          <NuxtLink class="flex items-center text-sm underline" to="/shipping">
            <div class="i-ph-arrow-left-light mr-2" />
            Return
          </NuxtLink>
        </div>
      </div>
      <div class="b-right">
        <AppOrderSummary :shipping="false" />
      </div>
    </div>
  </div>
</template>
