<script lang="ts" setup>
import { object, string, email, minLength, type Output } from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

const router = useRouter();

const state = ref({
  fullname: '',
  email: '',
  subject: '',
  message: '',
});

const formSchema = object({
  fullname: string([minLength(1, 'Field is required')]),
  email: string([minLength(1, 'Field is required'), email('Invalid email')]),
  subject: string([minLength(1, 'Field is required')]),
  message: string([minLength(1, 'Field is required')]),
});

type FormData = Output<typeof formSchema>;

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

// const submit = handleSubmit(async (data) => {
//   try {
//     await fetch('/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: encode({
//         'form-name': 'contacto',
//         ...data,
//       }),
//     });
//     router.push('/gracias');
//   } catch (error) {
//     console.log(error);
//   }
// });

const submit = (event: FormSubmitEvent<FormData>) => {
  console.log(event.data);
};
</script>

<template>
  <div class="w-full bg-color-4 px-14 p-16 mt-12 md:px-24 shadow-md">
    <UForm
      :schema="formSchema"
      :state="state"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit="submit"
    >
      <UFormGroup
        class="mb-2"
        label="Name and Surname"
        name="fullname"
        required
      >
        <UInput v-model="state.fullname" />
      </UFormGroup>
      <UFormGroup class="mb-2" label="Email" name="email" required>
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup class="mb-2" label="Subject" name="subject" required>
        <UInput v-model="state.subject" />
      </UFormGroup>
      <UFormGroup class="mb-2" label="Message" name="message" required>
        <UTextarea autoresize v-model="state.message" />
      </UFormGroup>

      <div class="mt-8 flex justify-center">
        <UButton
          type="submit"
          icon="i-ph-paper-plane-tilt"
          size="lg"
          color="color-3"
        >
          Send
        </UButton>
      </div>
    </UForm>
  </div>
  <!-- <div class="w-full mx-auto lg:max-w-[1230px] border p-4 rounded-2xl mt-12">
    <form
      name="contacto"
      class="p-8 rounded-2xl shadow bg-gradient-linear bg-gradient-to-[#E6E7E8] bg-gradient-from-[#FFFFFF] lg:p-18"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit.prevent="submit"
    >
      <div class="form__container">
        <div class="form__left">
          <div class="form__group">
            <label class="form__label">Nombre y Apellido</label>
            <app-input name="fullname" placeholder="John" />
          </div>
        </div>
        <div class="form__right">
          <div class="form__group">
            <label class="form__label">Email</label>
            <app-input name="email" type="email" placeholder="john@doe.com" />
          </div>
        </div>
      </div>

      <div class="form__group">
        <label class="form__label"
          >Asunto<sup class="form__required">*</sup></label
        >
        <app-input name="subject" placeholder="" />
      </div>

      <div class="form__group flex flex-col">
        <label class="form__label">Mensaje</label>
        <textarea
          class="w-full border border-color-7 rounded-md p-4 text-sm outline-none ring-2 ring-transparent focus:ring-color-2"
          cols="15"
          placeholder="Saludos, me gustaría saber..."
          rows="8"
          v-bind="message"
        ></textarea>
      </div>

      <div class="form__btn-group">
        <app-button class="!py-2 self-center" type="submit" @click="submit"
          >Enviar</app-button
        >
      </div>
    </form>
  </div> -->
</template>

<style scoped>
.title {
  @apply font-bold mb-4 text-color-2  text-left md:text-lg md:mb-8 lg:text-2xl;
}

.form__title {
  @apply font-semibold mb-8 text-color-2 text-2xl md:mb-3;
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
