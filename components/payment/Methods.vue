<script lang="ts" setup>
const items = [
  {
    slot: 'squareup',
    label: 'Square Up',
  },
  {
    slot: 'paypal',
    label: 'Paypal',
  },
  {
    slot: 'trans-bofa',
    label: 'Trans BoFa',
  },
  {
    slot: 'venmo',
    label: 'Venmo',
  },
  {
    slot: 'zelle',
    label: 'Zelle',
  },
];
</script>

<template>
  <UTabs :items="items" class="w-full">
    <template #squareup>
      <LazyPaymentVisa />
    </template>
    <template #paypal>
      <LazyPaymentPaypal />
    </template>
    <template #trans-bofa>
      <LazyPaymentTransBofa />
    </template>
    <template #venmo>
      <LazyPaymentVenmo />
    </template>
    <template #zelle>
      <LazyPaymentZelle />
    </template>
  </UTabs>
</template>
