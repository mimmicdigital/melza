export type Lang = 'es' | 'en';

export const site = {
  name: 'Melza',
  url: 'https://melza.eu',
  gaId: 'G-FB2C7TS4Z1',
  email: 'hello@melza.eu',
  phone: '+34 670 726 398',
  phoneHref: 'tel:+34670726398',
  address: { street: 'Avenida Diagonal 601, 8ª planta', city: 'Barcelona', zip: '08028', country: 'ES' },
  linkedin: 'https://www.linkedin.com/company/melza/',
  vimeo: 'https://vimeo.com/480812209',
  careersPage: 'https://www.careers-page.com/melza',
};

// Every page that exists in both languages. Paths are the ones Google already has indexed.
export const routes = {
  home: { es: '/', en: '/en/' },
  candidates: { es: '/encontrar-trabajo/', en: '/en/candidates/' },
  about: { es: '/headhunter-barcelona/', en: '/en/about-melza/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  jobs: { es: '/vacantes-tech-it-empleos/', en: '/en/vacancies-tech-it-jobs/' },
  cv: { es: '/formulario-contacto/', en: '/en/contact-form/' },
  faqs: { es: '/faqs/', en: '/en/faqs/' },
} as const;

export type RouteKey = keyof typeof routes;

// Legal pages and the blog exist only in Spanish.
export const esOnly = {
  blog: '/blog/',
  legal: '/aviso-legal/',
  privacy: '/politica-de-privacidad/',
  cookies: '/politica-de-cookies/',
};

/** Path of an uploaded WordPress file, kept at its original URL so image search links keep working. */
export const up = (path: string) => `/wp-content/uploads/${path}`;

export const ui = {
  es: {
    nav: [
      { label: 'Empresas', href: '/#empresas' },
      { label: 'Candidatos', href: routes.candidates.es },
      { label: 'About', href: routes.about.es },
      { label: 'Contacto', href: routes.contact.es },
      { label: 'Empleos', href: routes.jobs.es },
    ],
    skip: 'Saltar al contenido',
    menu: 'Menú',
    close: 'Cerrar',
    cta: {
      title: '¿Tienes preguntas?',
      lead: 'Queremos ayudarte.',
      text: 'Ya sea para exponer dudas o proponernos nuevos retos de recruiting, ¡escríbenos!',
      button: 'Contáctanos',
    },
    newsletter: {
      title: '¡No te quedes atrás!',
      text: 'Descúbrelo todo sobre el <strong>Método Melza</strong> suscribiéndote a nuestra newsletter.',
      placeholder: 'Tu correo electrónico',
      legal: 'MELZA CONSULTING SL como responsable del tratamiento tratará tus datos con la finalidad de remitirte nuestra newsletter con novedades comerciales sobre nuestros servicios. Puedes acceder, rectificar y suprimir tus datos, así como ejercer otros derechos consultando la información adicional y detallada sobre protección de datos en nuestra',
      accept: 'He leído y acepto las condiciones contenidas en la Política de Privacidad sobre el tratamiento de mis datos para el envío de la newsletter.',
      button: 'Suscribirme',
      thanks: '¡Gracias! Ya estás en la lista.',
    },
    footer: {
      legal: 'Aviso legal',
      privacy: 'Política de privacidad',
      cookies: 'Política de cookies',
      settings: 'Configurar cookies',
      faqs: 'FAQs',
      blog: 'Blog',
      others: 'Otros',
      contact: 'Contacto',
      jobs: 'Ofertas de empleo',
      cv: 'Envíanos tu CV',
      talk: '¿Hablamos?',
      rights: 'Melza Consulting S.L. Todos los derechos reservados.',
    },
    privacyLink: 'Política de Privacidad',
  },
  en: {
    nav: [
      { label: 'Companies', href: '/en/#companies' },
      { label: 'Candidates', href: routes.candidates.en },
      { label: 'About', href: routes.about.en },
      { label: 'Contact', href: routes.contact.en },
      { label: 'Jobs', href: routes.jobs.en },
    ],
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    cta: {
      title: 'Any questions?',
      lead: 'We want to help you.',
      text: 'So whether it is to ask us something or propose us new recruiting challenges, feel free to get in touch with us!',
      button: 'Message us',
    },
    newsletter: {
      title: "Don't fall behind!",
      text: 'Find out everything about the <strong>Melza Method</strong> by subscribing to our newsletter.',
      placeholder: 'Your email address',
      legal: 'MELZA CONSULTING SL, as data controller, will process your data in order to send you our newsletter with commercial news about our services. You can access, rectify and delete your data, as well as exercise other rights by consulting the additional and detailed information on data protection in our',
      accept: 'I have read and accept the conditions contained in the Privacy Policy regarding the processing of my data for sending the newsletter.',
      button: 'Subscribe',
      thanks: "Thanks! You're on the list.",
    },
    footer: {
      legal: 'Legal notice',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
      settings: 'Cookie settings',
      faqs: 'FAQs',
      blog: 'Blog',
      others: 'More',
      contact: 'Contact',
      jobs: 'Job offers',
      cv: 'Send us your CV',
      talk: "Let's talk?",
      rights: 'Melza Consulting S.L. All rights reserved.',
    },
    privacyLink: 'Privacy Policy',
  },
};
