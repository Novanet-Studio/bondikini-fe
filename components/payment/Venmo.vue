<script lang="ts" setup>
const { copied, copy } = useClipboard({
  legacy: true,
});

const cart = useCartStore();
const { state, schema, isSending, submit } = usePaymentForm({
  equalAmountTo: cart.amount.toString(),
  method: 'venmo',
  payment: {
    validation: (form) =>
      Date.parse(form.date) > Date.parse(new Date().toISOString()),
    message: `The payment amount is not valid or the date does not match today`,
  },
});

state.amount = '$ ' + cart.amount.toString();
</script>

<template>
  <div class="mt-6 container">
    <UForm :schema="schema" :state="state" @submit="submit">
      <UCard
        class="bg-color-4 p-6 mb-12 shadow-xl border-none ring-0 ring-transparent"
      >
        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup class="mb-4" label="Account holder name" name="name">
            <UInput size="lg" v-model="state.name" />
          </UFormGroup>
          <UFormGroup
            class="mb-4"
            label="Account holder's last name"
            name="lastName"
          >
            <UInput size="lg" v-model="state.lastName" />
          </UFormGroup>
        </div>
        <UFormGroup class="mb-4" label="Payment date" name="paymentDate">
          <UInput size="lg" type="date" v-model="state.date" />
        </UFormGroup>
        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup class="mb-4" label="Amount" name="amount">
            <UInput
              size="lg"
              disabled
              v-model="state.amount"
              :ui="{
                icon: {
                  trailing: {
                    pointer: '',
                  },
                },
              }"
            >
              <template #trailing>
                <UButton
                  :icon="copied ? 'i-ph-check' : 'i-ph-copy'"
                  :padded="false"
                  variant="link"
                  color="gray"
                  @click="copy(cart.amount.toString().trim())"
                />
              </template>
            </UInput>
          </UFormGroup>
          <UFormGroup class="mb-4" label="Payment ID" name="confirmation">
            <UInput size="lg" v-model="state.confirmation" />
          </UFormGroup>
        </div>

        <p class="text-xs whitespace-normal lg:text-sm text-color-5 mb-8">
          By making this purchase you accept
          <a href="#" class="text-color-6 font-bold hover:underline"
            >our terms and conditions</a
          >.
        </p>

        <UButton
          block
          type="submit"
          :disabled="isSending"
          label="Send"
          color="color-3"
          size="lg"
        >
          <template #leading>
            <AppLoader v-if="isSending" />
          </template>
        </UButton>
      </UCard>
    </UForm>
  </div>
</template>
