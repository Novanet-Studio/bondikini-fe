<script lang="ts" setup>
import {
  object,
  string,
  minLength,
  nonNullable,
  any,
  type Output,
  email,
} from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { GetAddressByIdAndType } from '~/graphql/queries';
import countries from '~/data/countries.json';
import { AddressType } from '~/config/constants';

const router = useRouter();
const graphql = useStrapiGraphQL();
const auth = useAuthStore();
const checkout = useCheckoutStore();

const state = reactive({
  name: '',
  lastName: '',
  email: '',
  address: '',
  country: '',
  home: '',
  city: '',
  zipCode: '',
  phone: '',
});

const currentCountry = computed(() => {
  return countries.find((country) => country.code === state.country);
});

const form = ref();

const formSchema = object({
  name: string([minLength(1, 'Field is required')]),
  lastName: string([minLength(1, 'Field is required')]),
  email: string([minLength(1, 'Field is required'), email('Email is invalid')]),
  address: string([minLength(1, 'Field is required')]),
  country: any(),
  home: string([minLength(1, 'Field is required')]),
  city: string([minLength(1, 'Field is required')]),
  zipCode: string([minLength(1, 'Field is required')]),
  phone: string([minLength(1, 'Field is required')]),
});

type FormData = Output<typeof formSchema>;

const submit = async function ({ data }: FormSubmitEvent<FormData>) {
  checkout.shippingInfo(data);
  router.push('/shipping');
};

const fillFormFromStorage = () => {
  if (auth.user.email) {
    state.email = auth.user.email;
  }

  if (auth.user.email !== checkout.email) {
    checkout.reset();
    checkout.email = auth.user.email as string;
    return;
  }

  if (!checkout.email) return;

  state.email = checkout.email || '';
  state.name = checkout.name || '';
  state.lastName = checkout.lastName || '';

  if (!checkout.saveInformation) return;

  state.address = checkout.address || '';
  state.country = checkout.country || '';
  state.home = checkout.home || '';
  state.city = checkout.city || '';
  state.zipCode = checkout.zipCode || '';
  state.phone = checkout.phone || '';
  state.country = checkout.country || '';
};

const fillFormFromStrapiShippingData = async () => {
  try {
    const body = {
      id: +auth.user.id,
      type: AddressType.Shipping,
    };

    const { data } = (await graphql<AddressRequest>(
      GetAddressByIdAndType,
      body
    )) as any;

    if (!data?.addresses?.data.length) return;

    const response = data?.addresses?.data[0]?.attributes.address;

    // TODO: set values
    console.log(response);
    // setValues({
    //   ...response,
    // });
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fillFormFromStrapiShippingData();
  fillFormFromStorage();
});
</script>

<template>
  <div>
    <UForm ref="form" :schema="formSchema" :state="state" @submit="submit">
      <h3 class="title">Contact information</h3>
      <UCard
        class="bg-color-4 p-6 mb-12 shadow-xl border-none ring-0 ring-transparent"
      >
        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup class="mb-4" label="Name" name="name">
            <UInput size="lg" v-model="state.name" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Last name" name="lastName">
            <UInput size="lg" v-model="state.lastName" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Email" name="email">
            <UInput type="email" size="lg" v-model="state.email" />
          </UFormGroup>
        </div>
      </UCard>

      <h3 class="title">Shipping information</h3>
      <UCard
        class="bg-color-4 p-6 mb-8 shadow-xl border-none ring-0 ring-transparent"
      >
        <UFormGroup class="mb-4" label="Address" name="address">
          <UInput size="lg" v-model="state.address" />
        </UFormGroup>
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
        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup class="mb-4" label="City" name="city">
            <UInput size="lg" v-model="state.city" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Apartment" name="home">
            <UInput size="lg" v-model="state.home" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Postal code" name="zipCode">
            <UInput size="lg" v-model="state.zipCode" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Contact number" name="phone">
            <UInput size="lg" v-model="state.phone" />
          </UFormGroup>
        </div>

        <UCheckbox
          label="Save information"
          class="mb-4"
          v-model="checkout.saveInformation"
        />

        <div class="flex justify-center">
          <UButton
            color="color-3"
            class="px-8"
            size="lg"
            label="Continue"
            type="submit"
            :ui="{ rounded: 'rounded-full' }"
          />
        </div>
      </UCard>
    </UForm>
    <!-- <form>
      <div class="bg-color-4 mb-12">
        <div class="form__group">
          <label class="form__label"
            >Email<sup class="form__required">*</sup></label
          >
          <AppInput name="email" placeholder="john@doe.com" />
        </div>

        <div class="form__container">
          <div class="form__left">
            <div class="form__group">
              <label class="form__label">Nombre</label>
              <AppInput name="name" placeholder="John" />
            </div>
          </div>
          <div class="form__right">
            <div class="form__group">
              <label class="form__label">Apellido</label>
              <AppInput name="lastName" placeholder="Doe" />
            </div>
          </div>
        </div>
      </div>

      <h3 class="title">Shipping information</h3>

      <div class="bg-color-4">
        <div class="form__group">
          <label class="form__label">Dirección</label>
          <AppInput
            name="address"
            placeholder="Av. Principal con calle Secundaria"
          />
        </div>
        <div class="form__group">
          <label class="form__label">Apartamento</label>
          <AppInput name="home" placeholder="11E" />
        </div>

        <div class="form__group">
          <label class="form__label">Pais</label>
          <app-select
            v-bind="country"
            label="name"
            value-key="code"
            :options="countries"
            placeholder="Selecciona una opción"
            :error="!!errors.country"
            :error-message="errors.country"
          />
        </div>

        <div class="form__grid">
          <div class="form__group-alt">
            <label class="form__label">Ciudad</label>
            <AppInput name="city" placeholder="Caracas" />
          </div>
          <div class="form__group-alt">
            <label class="form__label">Código Postal</label>
            <AppInput name="zipCode" placeholder="1050" />
          </div>
          <div class="form__group">
            <label class="form__label">Numero de contacto</label>
            <AppInput name="phone" placeholder="04120000102" />
          </div>
        </div>

        <div class="form__group">
          <app-checkbox
            label="Guardar informacion"
            v-model="checkout.saveInformation"
          />
        </div>

        <div class="form__btn-group flex justify-center">
          <app-button class="!py-2 !w-40 !text-sm" type="submit" @click="submit"
            >Continuar</app-button
          >
        </div>
      </div>
    </form> -->
  </div>
</template>

<style scoped>
.title {
  @apply font-bold mb-5 text-color-6 lg:text-xl;
}

.form__group-alt {
  @apply mb-4 lg:mb-6;
}

.form__container {
  @apply flex flex-col justify-between md:flex-row;
}

.form__grid {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2;
}

.form__left {
  @apply flex-[0_0_100%] gap-4 md:flex-[0_0_calc(50%-1rem)];
}

.form__right {
  @apply flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)];
}
</style>
