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
        link: 'https://wa.me/message/XTA7RUDHZKT4C1',
        icon: 'whatsapp',
        text: '+58 424-154-8330',
      },
      {
        link: 'https://www.instagram.com/bondikini',
        icon: 'instagram',
        text: '@bondikini',
      },
      {
        link: 'mailto:bondikini@gmail.com',
        icon: 'email',
        text: 'bondikini',
      },
    ],
  },
  home: {
    slider: ['/img/home/1.jpg', '/img/home/2.jpg'],
  },
});
