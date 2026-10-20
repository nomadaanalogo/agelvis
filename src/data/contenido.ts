/** Contenido compartido entre páginas: sectores, metodología, FAQ y clientes. */
import type { IconName } from './icons';

export const sectores = [
  { nombre: 'Alimentos y bebidas', icono: 'cup' as IconName, detalle: 'Líneas de proceso, llenado, envasado y empaque.' },
  { nombre: 'Farmacéutico', icono: 'pill' as IconName, detalle: 'Equipos de proceso y empaque en áreas controladas.' },
  { nombre: 'Papel y tissue', icono: 'paper' as IconName, detalle: 'Conversión, rebobinado y líneas de papel.' },
  { nombre: 'Empaques', icono: 'package' as IconName, detalle: 'Flexibles, cartón, corrugado y envases rígidos.' },
  { nombre: 'Impresión y artes gráficas', icono: 'printer' as IconName, detalle: 'Prensas offset, acabado y encuadernación.' },
  { nombre: 'Plásticos', icono: 'bottle' as IconName, detalle: 'Extrusión, inyección, soplado y películas.' },
  { nombre: 'Vidrio', icono: 'glass' as IconName, detalle: 'Formado, inspección y manejo de envases.' },
  { nombre: 'Metalmecánica', icono: 'gear' as IconName, detalle: 'Centros de mecanizado, CNC, prensas y troqueladoras.' },
  { nombre: 'Químicos y manufactura', icono: 'flask' as IconName, detalle: 'Equipos de proceso y plantas de manufactura.' },
];

export const metodologia = [
  { titulo: 'Diagnóstico y visita técnica', icono: 'search' as IconName, texto: 'Levantamos información de la maquinaria, el sitio, los accesos y las restricciones operativas.' },
  { titulo: 'Ingeniería y planificación', icono: 'ruler' as IconName, texto: 'Definimos alcance, secuencia de intervención, maniobras, recursos y cronograma.' },
  { titulo: 'Preparación de recursos y controles', icono: 'shield' as IconName, texto: 'Coordinamos personal, herramientas, equipos de elevación y controles de riesgo.' },
  { titulo: 'Ejecución de maniobras', icono: 'crane' as IconName, texto: 'Desmontamos, movemos, embalamos o posicionamos según el plan aprobado.' },
  { titulo: 'Reinstalación e integración', icono: 'wrench' as IconName, texto: 'Montaje, nivelación, alineación y anclaje según especificaciones y alcance.' },
  { titulo: 'Verificación y entrega', icono: 'check' as IconName, texto: 'Revisión conjunta con el cliente y entrega del frente de trabajo.' },
];

export const faqGeneral = [
  { q: '¿Trabajan en toda Colombia?', a: 'Sí. AGELVIS evalúa y ejecuta proyectos en distintas regiones de Colombia, según alcance, disponibilidad y condiciones técnicas. Nuestra base de operaciones está en Palmira, Valle del Cauca.' },
  { q: '¿Atienden proyectos internacionales?', a: 'Sí. Tenemos experiencia en proyectos en México, Ecuador, Panamá, Bulgaria y Ucrania, y movilizamos cuadrillas especializadas desde Colombia. Podemos asumir la cadena completa: desmontaje en origen, embalaje de exportación, coordinación con agentes de aduana y forwarders, y montaje en destino. Cada oportunidad se evalúa según ubicación, requisitos y recursos.' },
  { q: '¿Pueden trasladar una línea de producción completa?', a: 'Sí. Podemos estudiar un alcance integral que incluya desmontaje, identificación, embalaje, movimiento, logística coordinada y reinstalación.' },
  { q: '¿Se puede contratar solo una parte del proyecto?', a: 'Sí. Cotizamos intervenciones específicas (por ejemplo, solo desembalaje o solo una maniobra de rigging) o paquetes integrales, de acuerdo con la necesidad.' },
  { q: '¿Realizan instalación de maquinaria importada?', a: 'Podemos evaluar recepción, desembalaje, movimiento, posicionamiento y montaje mecánico, siguiendo las especificaciones del fabricante.' },
  { q: '¿Incluyen transporte y grúas?', a: 'Pueden coordinarse dentro del alcance, utilizando recursos propios o proveedores especializados según los requerimientos de cada maniobra.' },
  { q: '¿Cómo se prepara una cotización?', a: 'A partir de la información técnica del equipo y, cuando corresponde, una visita de inspección para definir alcance, riesgos, recursos y cronograma.' },
  { q: '¿Realizan conexiones eléctricas y de servicios?', a: 'Se coordinan con aliados especializados en electricidad, aire comprimido, agua, gas y otras redes, según los requerimientos y habilitaciones aplicables.' },
  { q: '¿Cuánto tarda un proyecto?', a: 'Depende de la maquinaria, el alcance, las condiciones de la planta y la programación acordada. El cronograma se define en la propuesta técnica.' },
  { q: '¿Pueden trabajar durante paradas programadas?', a: 'Sí, estudiamos la viabilidad conforme al cronograma de la planta, las condiciones de seguridad y la disponibilidad de recursos.' },
];

/** Solo se muestran si site.flags.showClientLogos = true (requiere autorización). */
export const clientes = [
  'Carvajal Empaques', 'Unilever', 'Johnson & Johnson', 'Essity', 'Grupo Familia', 'Greif',
  'AB InBev', 'Peldar', 'Plasticel', 'Plafilm', 'Idemia', 'Industria Gráfica Latinoamérica',
];
