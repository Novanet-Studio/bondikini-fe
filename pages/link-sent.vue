<script lang="ts" setup>
definePageMeta({
  layout: 'access',
});

const email = ref('');
const router = useRouter();

const formattedEmail = computed(() => {
  if (!email.value) return;

  const [username, domain] = email.value.split('@');
  const usernameLength = username.length - 2;
  let formatted = `${username[0]}${'*'.repeat(usernameLength)}${
    username[username.length - 1]
  }@${domain}`;

  return formatted;
});

onMounted(() => {
  const value = sessionStorage.getItem('cms.forgot');

  if (!value) return router.push('/forgot-password');

  email.value = atob(value);
});
</script>

<template>
  <section class="container">
    <h6 class="font-bold text-center">Email enviado</h6>
    <p class="text-sm mt-4 text-black/70">
      Enviamos un correo electrónico a
      <span class="font-bold">{{ formattedEmail }}</span> con un enlace para
      volver a ingresar a su cuenta.
    </p>

    <div class="flex justify-center mt-8">
      <button
        class="font-extrabold text-color-2"
        @click="$router.push('/forgot-password')"
      >
        OK
      </button>
    </div>
  </section>
</template>

<style scoped>
.auth__links {
  @apply p-4 flex justify-center;
}

.auth__link {
  @apply text-base font-bold text-black/50 first:mr-8 md:text-2xl;
}

.auth__link--active {
  @apply text-color-3;
}

.auth__content {
  @apply mt-4 container;
}
</style>
