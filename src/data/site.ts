/**
 * Datos corporativos de AGELVIS EU.
 * Todo lo marcado con "VALIDAR" proviene del formulario y debe confirmarse
 * antes de publicar (ver sección 16 del brief).
 */
export const site = {
  name: 'AGELVIS EU',
  legalName: 'José Luis Agelvis Bolaños Empresa Unipersonal', // VALIDAR con certificado vigente
  nit: '', // VALIDAR: agregar NIT cuando se confirme
  tagline: 'Gestión de proyectos · Embalajes, traslados y montajes de maquinaria industrial',
  promise:
    'Soluciones integrales para mover, montar y relocalizar maquinaria y plantas industriales con planificación técnica, seguridad y precisión.',
  foundingYear: 1996, // VALIDAR: el plan de exportación UPB (2026) dice "fundada en 1998"
  founder: 'Ing. José Luis Agelvis Bolaños',

  phones: [
    { label: '+57 350 716 0667', href: 'tel:+573507160667' },
    { label: '+57 315 562 5972', href: 'tel:+573155625972' },
  ],
  whatsapp: {
    number: '573507160667', // VALIDAR línea principal de cotizaciones
    label: '+57 350 716 0667',
    defaultMessage:
      'Hola AGELVIS EU, quisiera solicitar una evaluación técnica para un proyecto de maquinaria industrial.',
  },
  email: 'mercadeo.agelvis@gmail.com', // Recomendado: correo con dominio propio
  address: {
    street: 'Carrera 39A # 36-49',
    city: 'Palmira',
    region: 'Valle del Cauca',
    country: 'Colombia',
    countryCode: 'CO',
    publish: true, // VALIDAR autorización para publicar la dirección
  },
  hours: 'Lunes a sábado, 8:00 a. m. – 5:00 p. m.', // VALIDAR
  hoursSchema: 'Mo-Sa 08:00-17:00',
  social: {
    // VALIDAR: reemplazar por las URL exactas de los perfiles
    linkedin: '',
    facebook: '',
    instagram: '',
  },
  areaServed: ['Palmira', 'Cali', 'Yumbo', 'Valle del Cauca', 'Colombia', 'Latinoamérica'],
  internationalExperience: ['México', 'Ecuador', 'Panamá', 'Perú', 'Bulgaria', 'Ucrania'], // VALIDAR Perú: no figura en el plan de exportación UPB
  /** Mismos países en inglés, en el mismo orden. */
  internationalExperienceEn: ['Mexico', 'Ecuador', 'Panama', 'Peru', 'Bulgaria', 'Ukraine'],

  /** Cifras del plan de exportación UPB 2026 (información suministrada por la empresa). */
  stats: {
    crewSize: 12, // técnicos por cuadrilla movilizable al exterior
    ownLiftTons: 50, // cargas movidas con herramientas propias
    craneTons: 300, // grúas telescópicas coordinadas con aliados
  },

  /**
   * Interruptores editoriales. Mantener en false hasta tener soporte documental
   * o autorización escrita (sección 7 y 16 del brief).
   */
  flags: {
    showClientLogos: false, // Autorización de uso de logos de clientes
    showInternationalCountries: true, // Experiencia internacional reportada
  },
} as const;

export const whatsappUrl = (message: string = site.whatsapp.defaultMessage) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const yearsOfExperience = () => new Date().getFullYear() - site.foundingYear;

export const navEn = [
  { label: 'Services', href: '/en/services' },
  { label: 'International projects', href: '/en/international' },
  { label: 'For OEMs', href: '/en/oem' },
];

export const nav = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Sectores', href: '/sectores' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Internacional', href: '/proyectos-internacionales' },
  { label: 'Fabricantes OEM', href: '/fabricantes-oem' },
  { label: 'Nosotros', href: '/nosotros' },
];
