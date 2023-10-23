<script lang="ts" setup>
import { Tabs as VueTabs, Tab as VueTab } from 'vue3-tabs-component';
import PagoMovil from './pago-movil.vue';
import Paypal from './paypal.vue';
import TransBofa from './trans-bofa.vue';
import Venmo from './venmo.vue';
import Visa from './visa.vue';
import Zelle from './zelle.vue';

const tabs = [
  {
    name: 'Square Up',
    component: Visa,
  },
  {
    name: 'Paypal',
    component: Paypal,
  },
  {
    name: 'Pago movil',
    component: PagoMovil,
  },
  {
    name: 'Trans BoFa',
    component: TransBofa,
  },
  {
    name: 'Venmo',
    component: Venmo,
  },
  {
    name: 'Zelle',
    component: Zelle,
  },
];
</script>

<template>
  <div class="whitespace-nowrap md:w-full">
    <vue-tabs :options="{ useUrlFragmet: false }">
      <vue-tab v-for="(tab, i) in tabs" :key="i" :name="tab.name">
        <component :is="tab.component" />
      </vue-tab>
    </vue-tabs>
  </div>
</template>

<style scoped>
:deep(.tabs-component) {
  /* @apply border; */
}

:deep(.tabs-component-tabs) {
  @apply grid max-w-26rem md:(w-full max-w-full) rounded-l-2xl rounded-r-2xl shadow shadow-md border-2 grid-cols-3 lg:(grid-cols-6 rounded-l-3xl rounded-r-3xl);
}

:deep(.tabs-component-tab) {
  @apply px-4 py-3 border-b text-xs text-color-7 flex-1 text-center lg:text-sm;
}

:deep(.is-active:not(a)) {
  @apply px-4 py-3 bg-color-2 text-white font-bold first:(bg-color-2 rounded-tl-2xl) last:(bg-color-2 rounded-br-2xl) [&:nth-child(3)]:(bg-color-2 rounded-tr-2xl) [&:nth-child(4)]:(bg-color-2 rounded-bl-2xl) lg:(first:(rounded-l-3xl) last:(rounded-r-3xl) [&:nth-child(3)]:(rounded-none) [&:nth-child(4)]:(rounded-none));
}

:deep(.is-disabled:not(a)) {
  @apply px-4 py-3 bg-color-2 text-white font-bold;
}

:deep(.tabs-component-panels) {
  @apply py-6;
}
</style>
