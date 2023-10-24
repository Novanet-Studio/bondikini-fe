<script lang="ts" setup>
// import { Tabs as VueTabs, Tab as VueTab } from 'vue3-tabs-component';
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
    <!-- <vue-tabs :options="{ useUrlFragmet: false }">
      <vue-tab v-for="(tab, i) in tabs" :key="i" :name="tab.name">
        <component :is="tab.component" />
      </vue-tab>
    </vue-tabs> -->
  </div>
</template>
