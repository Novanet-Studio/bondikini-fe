<script lang="ts" setup>
import { useField } from 'vee-validate';
const { bcvUsd } = await useGetBcvUsd();

const cartStore = useCartStore();
const amountRate = computed(() => cartStore.amount * bcvUsd.value);

const { copied, copy } = useClipboard({
  legacy: true,
});

const formatToVES = (value: number) =>
  new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
  }).format(value);

const { isSending, hasError, submit } = usePaymentForm({
  equalAmountTo: amountRate.value.toString(),
  method: 'pago_movil',
  payment: {
    validation: (data) =>
      Date.parse(data.date) > Date.parse(new Date().toISOString()),
    message: `El monto del pago debe ser de ${formatToVES(
      amountRate.value
    )} y la fecha debe concordar con el dia de hoy!`,
  },
});

const field = useField<string>('amountToPay');
const ves = formatToVES(amountRate.value).replace('Bs.S', 'Bs.D') as string;
field.setValue(ves);

watch(
  () => cartStore.amount,
  () => {
    field.setValue(formatToVES(amountRate.value).replace('Bs.S', 'Bs.D'));
  }
);
</script>

<template>
  <section class="mt-6 container">
    <template v-show="false">
      <div>
        <figure>
          <p>Nombre:</p>
          <p>Numero de telefono:</p>
          <p>Banco:</p>
          <p>RIF:</p>
          <p>Motivo:</p>
        </figure>
        <figure>
          <figcaption>
            <strong>Subtotal en Bs</strong>
            <small>24.40</small>
          </figcaption>
        </figure>
      </div>
      <div>
        <strong
          >No disponemos de este metodo actualmente, por favor, seleccione
          otro.</strong
        >
      </div>
    </template>
    <form class="app-gradient" @submit.prevent="submit">
      <div class="form__group">
        <label class="form__label"
          >Nombre del titular de cuenta<sup class="form__required"
            >*</sup
          ></label
        >
        <app-input name="name" placeholder="John" />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Apellido del titular de cuenta<sup class="form__required"
            >*</sup
          ></label
        >
        <app-input name="lastName" placeholder="Doe" />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Fecha<sup class="form__required">*</sup></label
        >
        <app-input name="date" type="date" />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Monto en Bs<sup class="form__required">*</sup></label
        >
        <p class="text-xs max-w-full text-wrap font-bold whitespace-normal">
          La tasa del día BCV es de {{ bcvUsd }} BsD. El monto del pago debe ser
          de:
        </p>
        <app-input name="amountToPay" disabled>
          <template #right>
            <button
              class="flex items-center justify-center"
              @click="copy(formatToVES(amountRate).replace('Bs.S', ''))"
              :disabled="copied"
            >
              <div class="i-ph-copy-bold" v-if="!copied"></div>
              <div class="i-ph-check-bold" v-else></div>
            </button>
          </template>
        </app-input>
      </div>
      <div class="form__group">
        <label class="form__label"
          >Numero de confirmacion<sup class="form__required">*</sup></label
        >
        <app-input name="confirmation" />
      </div>
      <p class="text-xs whitespace-normal lg:text-sm">
        Al realizar esta compra usted acepta
        <a href="#" class="text-color-2">nuestros términos y condiciones</a>.
      </p>
      <div class="form__btn-group mt-4">
        <app-button
          type="submit"
          @click="submit"
          :loading="isSending"
          :disabled="hasError"
        >
          Enviar
        </app-button>
      </div>
    </form>
  </section>
</template>
