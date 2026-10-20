import { getCollection } from 'astro:content';

export const getServicios = async () =>
  (await getCollection('servicios')).sort((a, b) => a.data.orden - b.data.orden);

/** En producción solo se publican los casos con draft: false. */
export const getProyectos = async () =>
  getCollection('proyectos', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
