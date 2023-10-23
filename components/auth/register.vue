<script lang="ts" setup>
import { useForm } from 'vee-validate';
import {
  object,
  string,
  minLength,
  maxLength,
  email,
  regex,
  nonNullable,
} from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';
import { PASSWORD_REGEX } from '~/config/constants';

type Form = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

definePageMeta({
  pageTransition: {
    name: 'page',
  },
});

const REDIRECT_DELAY = 500;

const router = useRouter();
const { $notify } = useNuxtApp();
const auth = useAuthStore();
const state = reactive({
  isLoading: false,
  isDisabled: false,
});
const showPasswords = ref(false);

const schema = toTypedSchema(
  object({
    email: string([
      minLength(1, 'Ingrese su email'),
      email('Formato de email inválido'),
    ]),
    username: nonNullable(
      string([
        minLength(1, 'Este campo es requerido'),
        minLength(2, 'El nombre es muy corto'),
        maxLength(10, 'El nombre es muy largo'),
      ])
    ),
    password: string([
      minLength(1, 'Este campo es requerido'),
      regex(
        PASSWORD_REGEX,
        'Debe ser igual o mayor a 8 carácteres, una letra mayúscula, una minúscula, un número y un carácter especial'
      ),
    ]),
    confirmPassword: string([minLength(1, 'Este campo es requerido')]),
  })
);

const resetState = () => {
  state.isLoading = false;
  state.isDisabled = false;
};

const { handleSubmit, defineInputBinds, setFieldError } = useForm<Form>({
  validationSchema: schema,
});

const password = defineInputBinds('password');
const confirmPassword = defineInputBinds('confirmPassword');

const submit = handleSubmit(async (data, { resetForm }) => {
  try {
    state.isLoading = true;
    state.isDisabled = true;

    const response = await auth.createCustomer(data.username, data.email);

    if (!response.value?.data?.id) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Hubo un error al intentar registrarte',
      });
      resetState();
      return;
    }

    const customerId = response.value.data.id;
    const { confirmPassword: _, ...body } = data;

    await auth.register({
      customerId,
      ...body,
    });

    setTimeout(() => {
      router.push('/');
    }, REDIRECT_DELAY);
  } catch (error) {
    console.log(error);
    $notify({
      group: 'all',
      title: 'Oops',
      text: 'Hubo un problema al registrarte, intente de nuevo',
    });
  } finally {
    resetState();
    resetForm();
  }
});

watchEffect(() => {
  if (
    confirmPassword.value.value &&
    password.value.value &&
    confirmPassword.value.value?.length >= 8 &&
    password.value.value !== confirmPassword.value.value
  ) {
    setFieldError('confirmPassword', 'Las contraseñas no coinciden');
  }
});
</script>

<template>
  <form class="auth-form">
    <div class="auth-form__wrapper">
      <h5 class="auth-form__title">Crear una cuenta</h5>
      <app-input name="username" placeholder="Usuario" icon-left="i-ph-user" />
      <app-input
        name="email"
        placeholder="correo@mail.com"
        icon-left="i-ph-envelope"
      />
      <app-input
        name="password"
        placeholder="Ingresa tu contraseña"
        :type="showPasswords ? 'text' : 'password'"
        :icon-left="showPasswords ? 'i-ph-lock-open' : 'i-ph-lock'"
      />
      <app-input
        name="confirmPassword"
        placeholder="Confirma contraseña"
        :type="showPasswords ? 'text' : 'password'"
        :icon-left="showPasswords ? 'i-ph-lock-open' : 'i-ph-lock'"
      />
      <app-checkbox label="Mostrar contraseñas" v-model="showPasswords" />
      <div class="auth-form__footer !mb-0">
        <app-button @click="submit" :loading="state.isLoading">
          Registrar cuenta
        </app-button>
      </div>
    </div>
  </form>
</template>
