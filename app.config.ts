export default defineAppConfig({
  ui: {
    primary: 'color-1',
    gray: 'color-5',
    notifications: {
      position: 'top-0 bottom-auto',
    },
  },
  header: {
    logo: 'logo.png',
  },
  footer: {
    copyright: {
      site: 'bondikini.com',
    },
    widgets: [
      /* {
        link: 'https://wa.me/message/XTA7RUDHZKT4C1',
        icon: 'whatsapp',
        text: '+58 424-154-8330',
      },
      {
        link: 'https://www.facebook.com/bondikini',
        icon: 'phone',
        text: '+1 754-2528080',
      }, */
      {
        link: 'mailto:contact@bondikini.com',
        icon: 'email',
        text: 'contact@bondikini.com',
      },
      {
        link: 'https://instagram.com/bondikiniswim',
        icon: 'instagram',
        text: '@bondikiniswim',
      },
    ],
  },
  home: {
    slider: [
      '/img/home/bondikini-women-swimwear-1.webp',
      '/img/home/bondikini-women-swimwear-2.webp',
    ],
    sliders: [
      {
        image: '/img/home/bondikini-women-swimwear-1.webp',
        title: 'Bondikini is a swimwear brand',
        description:
          'We draw inspiration from the iconic Bondi beach in Sydney',
      },
      {
        image: '/img/home/bondikini-women-swimwear-2.webp',
        title: 'Our designs',
        description:
          'Are breathtaking, artistic, and fun while also staying classically on trend.',
      },
    ],
  },
});
