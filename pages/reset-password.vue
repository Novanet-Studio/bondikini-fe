<script lang="ts" setup>
import { object, string, minLength, regex, type Output } from 'valibot';
import { PASSWORD_REGEX } from '@/config/constants';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

type FormData = Output<typeof schema>;

definePageMeta({
  layout: 'access',
});

const REDIRECT_DELAY = 500;

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isDisabled = ref(false);
const showPasswords = ref(false);

const { resetPassword } = useStrapiAuth();

const state = reactive({
  password: '',
  passwordConfirmation: '',
});

const formRef = ref();

const schema = object({
  password: string([
    minLength(1, 'Field is required'),
    regex(PASSWORD_REGEX, 'Password not meet requirements'),
  ]),
  passwordConfirmation: string([minLength(1, 'Field is required')]),
});

const submit = async ({ data }: FormSubmitEvent<FormData>) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    await resetPassword({
      code: route.query.code as string,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });

    useToast().add({
      icon: 'i-ph-check',
      title: 'Your password has been reset',
      description: 'Please log in',
      color: 'green',
    });

    // remove email saved in session storage
    sessionStorage.removeItem('bon_forgot');

    setTimeout(() => {
      router.push('/');
    }, REDIRECT_DELAY);
  } catch (error) {
    useToast().add({
      icon: 'i-ph-warning-duotone',
      title: 'Error',
      description: 'There was a problem resetting your password',
      color: 'red',
    });
  } finally {
    isLoading.value = false;
    isDisabled.value = false;
  }
};

watchEffect(() => {
  if (
    state.password &&
    state.passwordConfirmation &&
    state.passwordConfirmation.length >= 8 &&
    state.password !== state.passwordConfirmation
  ) {
    formRef.value.setErrors(
      formRef.value.getErrors().concat({
        message: 'Passwords do not match',
        path: 'passwordConfirmation',
      })
    );
  }
});

onMounted(() => {
  if (!route.query.code) {
    return router.push('/');
  }
});
</script>

<template>
  <UContainer>
    <UCard
      class="max-w-md mx-auto bg-color-4 shadow-xl border-none ring-0 ring-transparent px-4"
    >
      <UForm ref="form" :schema="schema" :state="state" @submit="submit">
        <header class="flex flex-col justify-center mb-4">
          <h5 class="font-bold text-lg mb-2">Reset your password</h5>
          <span class="text-xs text-balance text-black/50">
            Reset your password so you can log into your account again.
          </span>
        </header>

        <UFormGroup class="mb-4" label="Password" name="password">
          <UInput
            icon="i-ph-lock-duotone"
            :type="showPasswords ? 'text' : 'password'"
            size="lg"
            v-model="state.password"
          />
          <template #hint>
            <UPopover :ui="{ width: 'w-64', base: 'p-4' }">
              <UButton
                color="gray"
                icon="i-ph-question-duotone"
                variant="link"
              />
              <template #panel>
                <span class="max-w-xs p-2">
                  Password must be equal or greater than 8 characters, contain
                  at least one uppercase letter, one lowercase letter, one
                  number and one special character
                </span>
              </template>
            </UPopover>
          </template>
        </UFormGroup>

        <UFormGroup
          class="mb-4"
          label="Confirm password"
          name="passwordConfirmation"
        >
          <UInput
            icon="i-ph-lock-duotone"
            :type="showPasswords ? 'text' : 'password'"
            size="lg"
            v-model="state.passwordConfirmation"
          />
        </UFormGroup>

        <div class="mt-8 flex justify-center">
          <UButton
            type="submit"
            size="lg"
            color="color-3"
            :disabled="isDisabled || isLoading"
            >Send
            <template #leading>
              <AppLoader v-if="isLoading" />
            </template>
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>
