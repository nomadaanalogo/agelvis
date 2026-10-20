// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio actual. Cambiar aquí si se migra a un dominio nuevo.
  site: 'https://www.montajesindustrialesagelviseu.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/gracias'),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es', en: 'en' },
      },
    }),
  ],
});
