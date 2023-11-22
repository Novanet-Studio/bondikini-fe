import config from '~/config/config.json';
import accountLinks from '~/data/account-links.json';

type Currency = '$' | '€' | 'Bs';

export const useGlobalStore = defineStore(config.store.global, () => {
  const links = ref(accountLinks.data);
  const currency = ref<Currency>('$');
  const showSlide = ref(true);

  return {
    currency,
    links,
    showSlide,
  };
});
