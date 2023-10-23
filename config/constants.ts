type ProductKey = InjectionKey<Product>;
type ProductDetailKey = InjectionKey<Ref<Product>>;

export const injectKeys = Object.freeze({
  product: Symbol('product') as ProductKey,
  productDetail: Symbol('productDetail') as ProductDetailKey,
});

export enum AddressType {
  Billing = 'billing',
  Shipping = 'shipping',
  None = '',
}

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/gm;
