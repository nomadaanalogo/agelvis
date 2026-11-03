/**
 * Mapa de rutas del inicio: continentes (Natural Earth 1:110m vía world-atlas) y ciudades
 * proyectados en un lienzo de 600 × 400 que cubre las Américas y Europa.
 * Se calcula al compilar; el navegador solo recibe el trazado SVG.
 */
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import land from 'world-atlas/land-110m.json';

export const MAPA = { w: 600, h: 400 };
// Ventana equirectangular: 170° de longitud × ~113° de latitud (misma proporción que el lienzo)
const LON0 = -125;
const LON1 = 45;
const LAT1 = 68;
const LAT0 = LAT1 - ((LON1 - LON0) * MAPA.h) / MAPA.w;

export const proyectar = (lon: number, lat: number): [number, number] => [
  ((lon - LON0) / (LON1 - LON0)) * MAPA.w,
  ((LAT1 - lat) / (LAT1 - LAT0)) * MAPA.h,
];

const topo = land as unknown as Topology<{ land: GeometryCollection }>;
const geo = feature(topo, topo.objects.land);

/** Trazado SVG de los continentes, solo los anillos que tocan la ventana. */
export const tierra = (() => {
  const out: string[] = [];
  const features = 'features' in geo ? geo.features : [geo];
  for (const f of features) {
    const g = f.geometry;
    if (!g) continue;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const poly of polys) {
      for (const ring of poly as number[][][]) {
        const pts = ring.map(([lon, lat]) => proyectar(lon, lat));
        const visible = pts.some(([x, y]) => x > -40 && x < MAPA.w + 40 && y > -40 && y < MAPA.h + 40);
        if (!visible || pts.length < 3) continue;
        out.push('M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z');
      }
    }
  }
  return out.join('');
})();

/** Ciudades de referencia por país (lon, lat) y posición de la etiqueta. */
export const ciudades: Record<string, { lon: number; lat: number; dx: number; dy: number; anchor: 'start' | 'end' }> = {
  Colombia: { lon: -76.3, lat: 3.53, dx: 12, dy: 18, anchor: 'start' }, // Palmira
  'México': { lon: -99.13, lat: 19.43, dx: -10, dy: -8, anchor: 'end' },
  Mexico: { lon: -99.13, lat: 19.43, dx: -10, dy: -8, anchor: 'end' },
  'Panamá': { lon: -79.52, lat: 8.98, dx: -10, dy: -6, anchor: 'end' },
  Panama: { lon: -79.52, lat: 8.98, dx: -10, dy: -6, anchor: 'end' },
  Ecuador: { lon: -78.47, lat: -0.18, dx: -10, dy: 6, anchor: 'end' },
  'Perú': { lon: -77.04, lat: -12.05, dx: -10, dy: 5, anchor: 'end' },
  Peru: { lon: -77.04, lat: -12.05, dx: -10, dy: 5, anchor: 'end' },
  Bulgaria: { lon: 23.32, lat: 42.7, dx: -10, dy: 16, anchor: 'end' },
  Ucrania: { lon: 30.52, lat: 50.45, dx: 0, dy: -12, anchor: 'end' },
  Ukraine: { lon: 30.52, lat: 50.45, dx: 0, dy: -12, anchor: 'end' },
};
