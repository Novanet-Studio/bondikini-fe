import config from '~/config/config.json';
import accountLinks from '~/data/account-links.json';

type Currency = '$' | '€' | 'Bs';

export const useGlobalStore = defineStore(config.store.global, () => {
  const links = ref(accountLinks.data);
  const currency = ref<Currency>('$');
  const showProductQuickView = ref(false);
  const isContinueShopping = ref(false);

  function setIsContinueShopping(value: boolean) {
    isContinueShopping.value = value;

    setTimeout(() => {
      isContinueShopping.value = false;
    }, 5000);
  }

  return {
    currency,
    links,
    isContinueShopping,
    showProductQuickView,
    setIsContinueShopping,
  };
});
