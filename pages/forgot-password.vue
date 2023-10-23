<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string, minLength, email } from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';

type Form = {
  email: string;
};

definePageMeta({
  layout: 'access',
});

const isLoading = ref(false);
const isDisabled = ref(false);
const { forgotPassword } = useStrapiAuth();
const { $notify } = useNuxtApp();
const router = useRouter();

const schema = toTypedSchema(
  object({
    email: string([
      minLength(1, 'Este campo es requerido'),
      email('Formato de correo invalido'),
    ]),
  })
);

const { handleSubmit } = useForm<Form>({
  validationSchema: schema,
});

const submit = handleSubmit(async (data) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    await forgotPassword({
      email: data.email,
    });

    sessionStorage.setItem('cms.forgot', btoa(data.email));

    $notify({
      group: 'all',
      title: 'Link enviado',
      text: 'Te enviamos un correo para restablecer tu contraseña',
    });

    setTimeout(() => {
      router.push('/link-sent');
    }, 1000);
  } catch (error) {
    console.log(error);
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un problema al intentar enviar el correo',
    });
  } finally {
    isLoading.value = false;
    isDisabled.value = false;
  }
});
</script>

<template>
  <section>
    <div class="auth__content">
      <form class="auth-form">
        <div class="auth-form__wrapper">
          <h5 class="auth-form__title">¿Olvidaste tu contraseña?</h5>
          <p class="text-xs text-balance text-black/50 mb-4">
            Ingrese su correo electrónico y le enviaremos un enlace para
            regresar a su cuenta.
          </p>
          <app-input name="email" placeholder="john@doe.com">
            <template #left>
              <div class="i-ph-envelope-light text-[20px] text-gray-400" />
            </template>
          </app-input>
          <div class="auth-form__footer !mb-0">
            <app-button
              @click="submit"
              :loading="isLoading"
              :disabled="isDisabled"
            >
              Enviar link
            </app-button>
          </div>

          <div class="flex mt-4 justify-center">
            <nuxt-link class="text-xs underline text-color-2" to="/auth/login"
              >Atrás para iniciar sesión</nuxt-link
            >
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.auth__links {
  @apply p-4 flex justify-center;
}

.auth__link {
  @apply text-base font-bold text-dark-50 first:mr-8 md:text-2xl;
}

.auth__link--active {
  @apply text-color-3;
}

.auth__content {
  @apply mt-4 container;
}
</style>
