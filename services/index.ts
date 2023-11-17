import { merchantTemplateConfig, receiptTemplateConfig } from '~/config/email';

const {
  public: {
    services: { url },
  },
} = useRuntimeConfig();

interface CreateCustomerPayload {
  idempotencyKey: string;
  givenName: string;
  emailAddress: string;
}

async function createCustomer(payload: CreateCustomerPayload) {
  return useFetch(`${url}/api/create-customer`, {
    method: 'post',
    body: payload,
  });
}

async function generatePayment(payload: any) {
  return useFetch(`${url}/api/payment`, {
    method: 'post',
    body: payload,
  });
}

async function sendReceiptEmail(payload: any) {
  return useFetch(`${url}/api/receipt-email`, {
    method: 'post',
    body: {
      ...payload,
      config: receiptTemplateConfig(),
    },
  });
}

async function sendMerchantEmail(payload: any) {
  return useFetch(`${url}/api/merchant-email`, {
    method: 'post',
    body: {
      ...payload,
      config: merchantTemplateConfig(),
    },
  });
}

export default {
  createCustomer,
  generatePayment,
  sendReceiptEmail,
  sendMerchantEmail,
};
