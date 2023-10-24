export default defineAppConfig({
  ui: {
    primary: 'color-1',
    gray: 'color-5',
  },
  header: {
    logo: 'logo.png',
  },
  footer: {
    copyright: {
      site: 'bondikini.com',
    },
    widgets: [
      {
        link: 'https://www.instagram.com/cms/',
        icon: 'instagram',
        text: '@bondikini',
      },
      {
        link: 'https://wa.me/message/XTA7RUDHZKT4C1',
        icon: 'whatsapp',
        text: '+58 424-154-8330',
      },
      {
        link: 'https://www.facebook.com/bondikini',
        icon: 'facebook',
        text: 'bondikini',
      },
    ],
  },
  home: {
    slider: ['/img/home/1.jpg', '/img/home/2.jpg'],
  },
});
