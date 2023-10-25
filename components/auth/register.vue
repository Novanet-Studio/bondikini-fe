<script lang="ts" setup>
import {
  object,
  string,
  minLength,
  maxLength,
  email,
  regex,
  nonNullable,
  type Output,
} from 'valibot';
import { PASSWORD_REGEX } from '~/config/constants';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

definePageMeta({
  pageTransition: {
    name: 'page',
  },
});

const REDIRECT_DELAY = 500;

const isLoading = ref(false);
const isDisabled = ref(false);
const showPasswords = ref(false);

const state = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
});

const router = useRouter();
const auth = useAuthStore();

const formRef = ref();

const formSchema = object({
  email: string([minLength(1, 'Field is required'), email('Email is invalid')]),
  username: nonNullable(
    string([
      minLength(1, 'Field is required'),
      minLength(2, 'Username is too short'),
      maxLength(10, 'Username is too long'),
    ])
  ),
  password: string([
    minLength(1, 'Field is required'),
    regex(PASSWORD_REGEX, 'Password not meet requirements'),
  ]),
  confirmPassword: string([minLength(1, 'Field is required')]),
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

    console.log(event.data);

    // const response = (await auth.createCustomer(
    //   event.data.username,
    //   event.data.email
    // )) as Ref<Record<any, any>>;

    // if (!response.value?.data?.id) {
    //   useToast().add({
    //     icon: 'i-ph-x-circle-duotone',
    //     title: 'Error',
    //     description:
    //       'An error has occurred while registering, please try again',
    //     color: 'red',
    //   });
    //   resetState();
    //   return;
    // }

    // const customerId = response.value.data.id;
    // const { confirmPassword: _, ...body } = event.data;

    // await auth.register({
    //   customerId,
    //   ...body,
    // });

    // setTimeout(() => {
    //   router.push('/');
    // }, REDIRECT_DELAY);
  } catch (error) {
    console.log(error);
    useToast().add({
      icon: 'i-ph-x-circle-duotone',
      title: 'Error',
      description: 'An error occurred while registering, please try again',
      color: 'red',
    });
  } finally {
    resetState();
  }
};

watchEffect(() => {
  if (
    state.password &&
    state.confirmPassword &&
    state.confirmPassword.length >= 8 &&
    state.password !== state.confirmPassword
  ) {
    formRef.value.setErrors(
      formRef.value.getErrors().concat({
        message: 'Passwords do not match',
        path: 'confirmPassword',
      })
    );
  }
});
</script>

<template>
  <UContainer>
    <UCard
      class="max-w-md mx-auto bg-color-4 shadow-xl border-none ring-0 ring-transparent px-4"
    >
      <UForm ref="formRef" :schema="formSchema" :state="state" @submit="submit">
        <header class="flex justify-center mb-6">
          <h5 class="font-bold text-lg">Sign in to your account</h5>
        </header>

        <UFormGroup class="mb-4" label="User" name="user">
          <UInput icon="i-ph-user-duotone" size="lg" v-model="state.username" />
        </UFormGroup>

        <UFormGroup class="mb-4" label="Email" name="email">
          <UInput
            icon="i-ph-envelope-duotone"
            size="lg"
            v-model="state.email"
          />
        </UFormGroup>

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
          name="confirmPassword"
        >
          <UInput
            icon="i-ph-lock-duotone"
            :type="showPasswords ? 'text' : 'password'"
            size="lg"
            v-model="state.confirmPassword"
          />
        </UFormGroup>

        <UCheckbox label="Show passwords" v-model="showPasswords" />

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
