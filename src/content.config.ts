import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicios = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/servicios' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      tituloCorto: z.string(),
      seoTitle: z.string(),
      seoDescription: z.string(),
      resumen: z.string(),
      icono: z.string(),
      orden: z.number(),
      imagen: image(),
      imagenAlt: z.string(),
      incluye: z.array(z.string()),
      galeria: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    }),
});

/**
 * Casos de proyecto. Un caso con `draft: true` solo se ve en desarrollo
 * (npm run dev) y NO se publica hasta que se validen datos y autorizaciones.
 */
const proyectos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string(),
      draft: z.boolean().default(true),
      destacado: z.boolean().default(false),
      sector: z.string(),
      ubicacion: z.string(),
      anio: z.string().optional(),
      cliente: z.string().optional(), // Solo con autorización escrita
      servicios: z.array(z.string()),
      maquinaria: z.string(),
      imagen: image(),
      imagenAlt: z.string(),
      galeria: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

export const collections = { servicios, proyectos };
