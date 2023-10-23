import config from '~/config/config.json';
import { AddressType } from '~/config/constants';
import { CreateAddress, UpdateAddress } from '~/graphql/mutations';
import { GetAddressByIdAndType } from '~/graphql/queries';

interface GetAddressParams {
  userId: number;
  type: AddressType;
}

interface Result {
  hasBilling: Ref<boolean>;
  hasShipping: Ref<boolean>;
  isLoading: Ref<boolean>;
}

type Data = Record<string, string>;

const defaultState = {
  email: '',
  name: '',
  lastName: '',
  address: '',
  home: '',
  country: '',
  city: '',
  zipCode: '',
  phone: '',
  saveInformation: false,
};

export const useCheckoutStore = defineStore(
  config.store.checkout,
  () => {
    const info = reactive(defaultState);
    const fullName = computed(() => `${info.name} ${info.lastName}`);
    const fullAddress = computed(
      () => `${info.address}, ${info.city}, ${info.zipCode}`
    );
    const shippingAddress = computed(
      () =>
        `${info.address} ${info.home}, ${info.city}. Zip Code: ${info.zipCode}. ${info.country}`
    );

    const graphql = useStrapiGraphQL();
    const authStore = useAuthStore();
    const router = useRouter();

    const shippingInfo = (payload: ShippingInfo) => {
      Object.assign(info, payload);
    };

    // TODO: improve types
    async function getAddress({
      userId: id,
      type,
    }: GetAddressParams): Promise<any> {
      if (type === AddressType.None) return null;

      const { data } = await graphql<any>(GetAddressByIdAndType, {
        id,
        type,
      });

      if (!data?.addresses?.data?.length) return null;

      const [address] = data.addresses.data;

      return address;
    }

    function checkAddressType(): Result {
      const hasBilling = ref(false);
      const hasShipping = ref(false);
      const isLoading = ref(false);

      const id = Number(authStore.user.id);

      const checkBillingAndShipping = async () => {
        const data = [
          getAddress({ userId: id, type: AddressType.Billing }),
          getAddress({ userId: id, type: AddressType.Shipping }),
        ];

        const [billing, shipping] = await Promise.all(data);

        hasBilling.value = !!billing;
        hasShipping.value = !!shipping;
      };

      onMounted(async () => {
        if (!id) return;

        await checkBillingAndShipping();
      });

      return {
        hasBilling,
        hasShipping,
        isLoading,
      };
    }

    async function createAddress(data: Data) {
      await graphql<any>(CreateAddress, data);

      useToast().add({
        icon: 'i-ph-check',
        title: 'Success!',
        description: 'Direction created with success!',
      });

      router.push('/addresses');
    }

    async function updateAddress(existId: string, data: Data) {
      if (!existId) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Oops!',
          description: 'An error occurred while updating the address',
          color: 'red',
        });
        return;
      }

      const body = {
        id: existId,
        data: {
          user_id: data.userId,
          address: data.address,
          type: data.type,
        },
      };

      const {
        data: {
          updateAddress: { data: result },
        },
      } = await graphql<any>(UpdateAddress, body);

      if (!result) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Oops!',
          description: 'An error occurred while updating the address',
          color: 'red',
        });
        return;
      }

      useToast().add({
        icon: 'i-ph-check',
        title: 'Success!',
        description: 'Direction updated with success!',
      });

      router.push('/addresses');
    }

    function reset() {
      Object.assign(info, defaultState);
    }

    return {
      ...toRefs(info),
      fullName,
      fullAddress,
      shippingAddress,
      shippingInfo,
      getAddress,
      checkAddressType,
      createAddress,
      updateAddress,
      reset,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
