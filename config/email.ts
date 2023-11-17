export function receiptTemplateConfig() {
  return {
    subject: 'Purchase receipt for %customer% - Order ID: %orderId%',
    text: 'Purchase receipt',
    template: {
      preview: 'Bondikini - Purchase receipt',
      theme: {
        primary: '#643130',
        primaryTop: '#643130',
        secondary: '#672f2e',
        secondaryInfo: '#fff',
        foreground: '#efeef1',
        info: '#fff',
      },
      header: {
        icon: {
          url: 'https://raw.githubusercontent.com/Novanet-Studio/bondikini-fe/main/static/favicon.png',
          alt: 'Bondikini',
        },
        contact: {
          email: 'bondikini@gmail.com',
          instagram: '@bondikini',
          phone: '+1 234 567 89 00',
        },
      },
      footer: {
        cta: {
          link: 'https://bondikini.netlify.app/',
          text: 'Go to store',
        },
        social: [
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/x.png',
            link: '#',
          },
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/facebook.png',
            link: '#',
          },
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/whatsapp.png',
            link: '#',
          },
        ],
        copyright: {
          text: '© 2023 Bondikini',
          location: 'Miami, EEUU',
        },
      },
    },
  };
}

export function merchantTemplateConfig() {
  return {
    subject: 'New orden - Order ID: %orderId%',
    text: 'New order',
    template: {
      preview: 'Bondikini - New order',
      theme: {
        primary: '#643130',
        primaryTop: '#643130',
        secondary: '#672f2e',
        secondaryInfo: '#fff',
        foreground: '#efeef1',
        info: '#fff',
      },
      header: {
        icon: {
          url: 'https://raw.githubusercontent.com/Novanet-Studio/bondikini-fe/main/static/favicon.png',
          alt: 'Bondikini',
        },
      },
      footer: {
        cta: {
          link: 'https://bondikini-be.herokuapp.com/',
          text: 'Go to admin panel',
        },
        copyright: {
          text: '© 2023 Bondikini',
          location: 'Miami, EEUU',
        },
      },
    },
  };
}
