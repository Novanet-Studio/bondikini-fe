<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string, minLength, regex } from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';
import { PASSWORD_REGEX } from '@/config/constants';

type Form = {
  password: string;
  passwordConfirmation: string;
};

definePageMeta({
  layout: 'access',
});

const REDIRECT_DELAY = 500;

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isDisabled = ref(false);
const { resetPassword } = useStrapiAuth();
const { $notify } = useNuxtApp();
const showPasswords = ref(false);

const schema = toTypedSchema(
  object({
    password: string([
      minLength(1, 'Este campo es requerido'),
      regex(
        PASSWORD_REGEX,
        'Debe ser igual o mayor a 8 carácteres, una letra mayúscula, una minúscula, un número y un carácter especial'
      ),
    ]),
    passwordConfirmation: string([minLength(1, 'Este campo es requerido')]),
  })
);

const { handleSubmit, defineInputBinds, setFieldError } = useForm<Form>({
  validationSchema: schema,
});

const password = defineInputBinds('password');
const passwordConfirmation = defineInputBinds('passwordConfirmation');

const submit = handleSubmit(async (data) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    await resetPassword({
      code: route.query.code as string,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });

    $notify({
      group: 'all',
      title: 'Se reestableció su contraseña',
      text: 'Por favor, inicie sesión',
    });

    // remove email saved in session storage
    sessionStorage.removeItem('cms.forgot');

    setTimeout(() => {
      router.push('/auth/login');
    }, REDIRECT_DELAY);
  } catch (error) {
    $notify({
      group: 'all',
      title: 'Error!',
      text: 'Hubo un problema al reestablecer su contraseña',
    });
  } finally {
    isLoading.value = false;
    isDisabled.value = false;
  }
});

watchEffect(() => {
  if (
    passwordConfirmation.value.value &&
    password.value.value &&
    passwordConfirmation.value.value?.length >= 8 &&
    password.value.value !== passwordConfirmation.value.value
  ) {
    setFieldError('passwordConfirmation', 'Las contraseñas no coinciden');
  }
});

onMounted(() => {
  if (!route.query.code) {
    return router.push('/auth/login');
  }
});
</script>

<template>
  <section class="container mt-12">
    <form class="auth-form">
      <div class="auth-form__wrapper">
        <h5 class="auth-form__title font-bold">Reestablece tu contraseña</h5>
        <p class="text-xs text-balance text-black/50 mb-4">
          Reestablezca su contraseña para poder ingresar a su cuenta nuevamente.
        </p>
        <app-input
          name="password"
          placeholder="Nueva contraseña"
          :type="showPasswords ? 'text' : 'password'"
          :icon-left="showPasswords ? 'i-ph-lock-open' : 'i-ph-lock-light'"
        />
        <app-input
          name="passwordConfirmation"
          placeholder="Confirme nueva contraseña"
          :type="showPasswords ? 'text' : 'password'"
          :icon-left="showPasswords ? 'i-ph-lock-open' : 'i-ph-lock-light'"
        />
        <app-checkbox label="Mostrar contraseñas" v-model="showPasswords" />
        <div class="auth-form__footer !mb-0">
          <app-button
            @click="submit"
            :loading="isLoading"
            :disabled="isDisabled"
          >
            Enviar
          </app-button>
        </div>
      </div>
    </form>
  </section>
</template>
