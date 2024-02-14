<script lang="ts" setup>
import { object, string, minLength, email, type Output } from 'valibot';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({
  layout: 'access',
});

const isLoading = ref(false);
const isDisabled = ref(false);
const { forgotPassword } = useStrapiAuth();
const router = useRouter();

const state = reactive({
  email: '',
});

const formSchema = object({
  email: string([email(), minLength(1, 'Field is required')]),
});

type FormData = Output<typeof formSchema>;

const resetState = () => {
  isLoading.value = false;
  isDisabled.value = false;
};

const submit = async ({ data }: FormSubmitEvent<FormData>) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    await forgotPassword({
      email: data.email,
    });

    sessionStorage.setItem('bon_forgot', btoa(data.email));

    useToast().add({
      icon: 'i-ph-check',
      title: 'Link sent',
      description: 'We send you an email to reset your password',
      color: 'green',
    });

    setTimeout(() => {
      router.push('/link-sent');
    }, 1000);
  } catch (error) {
    console.log(error);
    useToast().add({
      icon: 'i-ph-warning-duotone',
      title: 'Error',
      description: 'An error occurred while sending email',
      color: 'red',
    });
  } finally {
    resetState();
  }
};
</script>

<template>
  <UContainer class="lg:px-4">
    <UCard class="max-w-sm mx-auto border-none shadow-none ring-0">
      <UForm :schema="formSchema" :state="state" @submit="submit">
        <header class="flex flex-col justify-center mb-4">
          <h5 class="font-bold text-center text-lg mb-2">
            Did you forget your password?
          </h5>
          <span class="text-xs text-center text-black/50">
            Enter your email
          </span>
        </header>

        <UFormGroup class="mb-4" label="Email" name="email">
          <UInput
            icon="i-ph-envelope-duotone"
            size="lg"
            v-model="state.email"
          />
        </UFormGroup>

        <div class="mt-8 flex justify-center">
          <UButton
            type="submit"
            class="w-full justify-center"
            size="lg"
            color="color-3"
            :disabled="isDisabled || isLoading"
            >Send link
            <template #leading>
              <AppLoader v-if="isLoading" />
            </template>
          </UButton>
        </div>
      </UForm>
      <section class="flex justify-center mt-12">
        <UButton
          label="Go back to login"
          color="black"
          variant="link"
          @click="$emit('click')"
        />
      </section>
    </UCard>
  </UContainer>
</template>
