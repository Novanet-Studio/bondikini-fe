<script lang="ts" setup>
import { object, string, email, minLength, type Output } from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

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

const submit = async ({ data }: FormSubmitEvent<FormData>) => {
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...data,
      }),
    });

    useToast().add({
      icon: 'i-ph-check',
      title: 'Done',
      description: 'Message sent successfully',
      color: 'green',
    });
  } catch (error) {
    useToast().add({
      icon: 'i-ph-warning',
      title: 'Error',
      description: 'An error occurred while sending the message',
      color: 'red',
    });
  }
};
</script>

<template>
  <div class="form">
    <UForm
      :schema="formSchema"
      :state="state"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit="submit"
      name="contact"
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
</template>

<style scoped>
.title {
  @apply font-bold mb-4 text-color-2  text-left md:text-lg md:mb-8 lg:text-2xl;
}

.form {
  @apply w-full bg-color-4 px-14 p-16 mt-12 md:px-24 shadow-md;
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
