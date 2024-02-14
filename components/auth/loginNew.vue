<script setup lang="ts">
import { object, string, type Output } from 'valibot';
import type { FormSubmitEvent } from '#ui/types';

type Emits = {
  (e: 'newClientClick'): void;
  (e: 'forgetClick'): void;
};

defineEmits<Emits>();

const router = useRouter();
const auth = useAuthStore();
const showPassword = ref(false);

const isLoading = ref(false);
const isDisabled = ref(false);

const state = reactive({
  email: '',
  password: '',
});

const formSchema = object({
  email: string(),
  password: string(),
});

type FormData = Output<typeof formSchema>;

const resetState = () => {
  isLoading.value = false;
  isDisabled.value = false;
};

const submit = async (event: FormSubmitEvent<FormData>) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    const success = await auth.login(event.data.email, event.data.password);

    if (!success) {
      useToast().add({
        icon: 'i-ph-x-circle-duotone',
        title: 'Error',
        description: 'An error has occurred, please try again',
        color: 'red',
      });
      return;
    }

    router.push('/');
  } catch (error) {
    useToast().add({
      icon: 'i-ph-x-circle-duotone',
      title: 'Error',
      description: 'An error occurred while logging in, please try again',
      color: 'red',
    });
  } finally {
    resetState();
  }
};
</script>

<template>
  <UContainer>
    <UCard class="max-w-sm mx-auto border-none shadow-none ring-0">
      <UForm :schema="formSchema" :state="state" @submit="submit">
        <header class="flex justify-center mb-6">
          <h5 class="font-bold text-lg">Connect to my account</h5>
        </header>

        <UFormGroup class="mb-4" label="Email" name="email">
          <UInput
            icon="i-ph-envelope-duotone"
            size="lg"
            v-model="state.email"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            icon="i-ph-lock-duotone"
            :type="showPassword ? 'text' : 'password'"
            size="lg"
            v-model="state.password"
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
                :icon="
                  !showPassword ? 'i-ph-eye-duotone' : 'i-ph-eye-slash-duotone'
                "
                bg-color-4
                :padded="false"
                variant="link"
                color="gray"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormGroup>

        <div class="mt-8 flex justify-center">
          <UButton
            type="submit"
            size="lg"
            color="color-3"
            class="w-full justify-center"
            :disabled="isDisabled || isLoading"
            >Send
            <template #leading>
              <AppLoader v-if="isLoading" />
            </template>
          </UButton>
        </div>
      </UForm>

      <section class="mt-6">
        <div class="text-sm text-center">
          New client?
          <UButton
            label="Create account"
            color="black"
            variant="link"
            @click="$emit('newClientClick')"
          />
        </div>
        <div class="text-sm text-center">
          Password forget?
          <UButton
            label="Recover password"
            color="black"
            variant="link"
            @click="$emit('forgetClick')"
          />
        </div>
      </section>
    </UCard>
  </UContainer>
</template>
