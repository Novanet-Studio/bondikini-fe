import services from '~/services';
import config from '~/config/config.json';
import { LoginQuery, RegisterQuery } from '~/graphql/mutations';
import type { StrapiUser } from '@nuxtjs/strapi/dist/runtime/types';

type User = StrapiUser & {
  customerId: string;
};

export const useAuthStore = defineStore(
  config.store.auth,
  () => {
    const strapiToken = useStrapiToken();
    const { setToken, fetchUser } = useStrapiAuth();
    const graphql = useStrapiGraphQL();

    const cart = useCartStore();
    const product = useProductStore();
    const router = useRouter();

    const token = ref('');
    const user = reactive<User>({
      id: null,
      customerId: '',
    });

    const authenticated = ref(false);

    async function login(
      identifier: string,
      password: string
    ): Promise<boolean> {
      const { data } = await graphql<LoginRequest>(LoginQuery, {
        identifier,
        password,
      });

      if (!data) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Oops!',
          description: 'User or password invalid',
          color: 'red',
        });
        return false;
      }

      setToken(data.login.jwt);
      authenticated.value = true;
      token.value = data.login.jwt;
      Object.assign(user, data.login.user);

      useToast().add({
        icon: 'i-ph-check',
        title: 'Success!',
        description: 'Log in is successful!',
      });

      return true;
    }

    async function register(user: Partial<User>): Promise<boolean> {
      const { data } = await graphql<RegisterRequest>(RegisterQuery, user);

      if (!data) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Oops!',
          description: 'User or email already exists',
          color: 'red',
        });
        return false;
      }

      setToken(data.register.jwt);
      authenticated.value = true;
      Object.assign(user, data.register.user);

      useToast().add({
        icon: 'i-ph-check',
        title: 'Success!',
        description: 'Registration is successful!',
      });

      return true;
    }

    async function refresh() {
      const userData = await fetchUser();

      if (!userData?.value?.id) return;

      token.value = strapiToken.value;
      authenticated.value = true;
      Object.assign(user, userData.value);
    }

    async function createCustomer(user: string, email: string) {
      try {
        const idempotencyKey = crypto.randomUUID();
        const data = {
          idempotencyKey,
          givenName: user,
          emailAddress: email,
        };

        const { data: result } = await services.createCustomer(data);

        return result;
      } catch (error) {
        throw new Error('Failed to create customer');
      }
    }

    function logout(alert = true) {
      $reset();
      cart.$reset();
      product.$reset();
      router.push({
        path: '/',
        force: true,
      });

      if (!alert) return;

      useToast().add({
        icon: 'i-ph-check',
        title: 'Logout is successful!',
      });
    }

    function $reset() {
      token.value = '';
      authenticated.value = false;
      Object.assign(user, { id: 0, customerId: '' });
    }

    return {
      token,
      user,
      authenticated,
      login,
      register,
      createCustomer,
      $reset,
      logout,
      refresh,
    };
  },
  { persist: true }
);
