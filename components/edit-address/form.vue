<script lang="ts" setup>
import {
  object,
  string,
  minLength,
  nonNullable,
  any,
  type Output,
} from 'valibot';
import countries from '~/data/countries.json';
import { AddressType } from '~/config/constants';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

const props = defineProps<{ type: AddressType }>();
const auth = useAuthStore();
const checkout = useCheckoutStore();

const haveLastAddress = ref(false);
const existentId = ref('');

const isLoading = ref(false);
const isDisabled = ref(false);

const type = computed(() =>
  [AddressType.Billing, AddressType.Shipping].includes(props.type)
    ? props.type
    : AddressType.None
);

const title = computed(() =>
  type.value === AddressType.Billing ? 'Billing Address' : 'Shipping Address'
);

const currentCountry = computed(() => {
  return countries.find((country) => country.code === state.country);
});

const state = reactive({
  country: '',
  streetAddress: '',
  state: '',
  postcode: '',
});

const formRef = ref();

const formSchema = object({
  country: nonNullable(any()),
  streetAddress: string([minLength(1, 'Este campo es requerido')]),
  state: string([minLength(1, 'Este campo es requerido')]),
  postcode: string([minLength(1, 'Este campo es requerido')]),
});

type FormData = Output<typeof formSchema>;

const resetState = () => {
  isLoading.value = false;
  isDisabled.value = false;
};

const sendAddress = async (data: Record<string, string>) => {
  if (haveLastAddress.value) {
    checkout.updateAddress(existentId.value, data);
    return;
  }

  checkout.createAddress(data);
};

const submit = async ({ data }: FormSubmitEvent<FormData>) => {
  if (type.value === AddressType.None) return;

  const info = {
    address: data.streetAddress,
    country: data.country,
    city: data.state,
    zipCode: data.postcode,
  };

  console.log('INFO => ', info);

  const body = {
    type: type.value,
    userId: +auth.user.id,
    address: info,
  };

  // sendAddress(body as unknown as Record<string, string>);
};

const getLastAddress = async () => {
  const id = Number(auth.user.id);
  const address = await checkout.getAddress({ userId: id, type: type.value });

  if (!address) return;

  haveLastAddress.value = true;
  existentId.value = address.id;

  state.country = address.attributes.address.country;
  state.state = address.attributes.address.city;
  state.streetAddress = address.attributes.address.address;
  state.postcode = address.attributes.address.zipCode;
};

onMounted(() => {
  getLastAddress();
});
</script>

<template>
  <section>
    <header class="address-form__header">
      <h3 class="address-form__title">
        {{ title }}
      </h3>
    </header>
    <UContainer>
      <UCard
        class="w-full bg-color-4 shadow-xl border-none ring-0 ring-transparent px-4 lg:px-20"
      >
        <UForm
          ref="formRef"
          :schema="formSchema"
          :state="state"
          @submit="submit"
        >
          <UFormGroup class="mb-4" label="Country" name="country">
            <USelectMenu
              searchable
              searchable-placeholder="Search"
              v-model="state.country"
              placeholder="Select a country"
              value-attribute="code"
              size="lg"
              option-attribute="name"
              :options="countries"
              :ui="{
                options: {
                  active: 'bg-color-1 text-color-6',
                },
              }"
            >
              <template #label>
                {{ currentCountry?.name || 'Select a country' }}
              </template>
            </USelectMenu>
          </UFormGroup>

          <UFormGroup class="mb-4" label="Street Address" name="streetAddress">
            <UInput size="lg" v-model="state.streetAddress" />
          </UFormGroup>

          <UFormGroup class="mb-4" label="State" name="state">
            <UInput size="lg" v-model="state.state" />
          </UFormGroup>

          <UFormGroup class="mb-4" label="Postal Code" name="postcode">
            <UInput size="lg" v-model="state.postcode" />
          </UFormGroup>

          <div class="mt-8 flex justify-center">
            <UButton
              type="submit"
              size="lg"
              color="color-3"
              :disabled="isDisabled || isLoading"
              >Save
              <template #leading>
                <AppLoader v-if="isLoading" />
              </template>
            </UButton>
          </div>
        </UForm>
      </UCard>

      <UButton
        class="mt-8"
        icon="i-ph-arrow-left"
        variant="link"
        color="color-6"
        @click="$router.back()"
        >address</UButton
      >
    </UContainer>
  </section>
</template>

<style scoped>
.address-form__header {
  @apply mb-8 pb-3 md:pb-0;
}

.address-form__title {
  @apply text-xl font-bold text-color-6 md:text-2xl;
}

.address-form__group {
  @apply mb-5 lg:mb-10;
}

.address-form__label {
  @apply mb-6 text-black/80 text-xs font-bold;
}

.address-form__required {
  @apply ml-1 text-red-500;
}

.address-form__group-btn {
  @apply mb-2 flex justify-center;
}
</style>
