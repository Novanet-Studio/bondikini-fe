export function receiptTemplateConfig() {
  return {
    subject: 'Purchase receipt for %customer% - Order ID: %orderId%',
    text: 'Purchase receipt',
    template: {
      preview: 'Purchase receipt',
      theme: {},
      header: {},
      body: {},
      footer: {},
    },
  };
}

export function merchantTemplateConfig() {
  return {
    subject: 'New orden - Order ID: %orderId%',
    text: 'New order',
    template: {
      preview: 'New order',
      theme: {},
      header: {},
      body: {},
      footer: {},
    },
  };
}
