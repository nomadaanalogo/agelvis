/**
 * Contenido en inglés. Las fotos de cada servicio salen de la colección en español
 * (src/content/servicios); aquí solo va el texto, indexado por el id del servicio en español.
 */
import type { IconName } from './icons';

export interface EnServicio {
  slug: string;
  title: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  intro: string[];
  sections: { h: string; p: string }[];
  includes: string[];
  faq: { q: string; a: string }[];
}

export const enServicios: Record<string, EnServicio> = {
  'montaje-instalacion-maquinaria-industrial': {
    slug: 'machinery-installation',
    title: 'Industrial machinery installation',
    short: 'Machinery installation',
    seoTitle: 'Industrial machinery installation contractor | Latin America & worldwide | AGELVIS EU',
    seoDescription: 'Receiving, unpacking, positioning, leveling, alignment and mechanical assembly of new and imported industrial machinery and production lines. Colombian crews for projects in Latin America and abroad.',
    summary: 'We receive, position, level and assemble new or imported machinery following the manufacturer’s specifications.',
    intro: [
      'Between a machine’s arrival and its start-up there is unloading, unpacking, inspection, in-plant moving, precise positioning and anchoring. Every step shapes the equipment’s service life and the project schedule.',
      'AGELVIS EU plans that whole path. We review the layout, access routes, floor capacity and the manufacturer’s specifications, and define how each unit reaches its installation point with the lowest possible risk.',
    ],
    sections: [
      { h: 'Installation of imported machinery', p: 'For machinery manufacturers and buyers, we execute the local installation stage: receiving, unpacking, rigging and mechanical assembly, leaving the equipment ready for the manufacturer’s engineer to commission it.' },
      { h: 'Complete production lines', p: 'We sequence the installation of every machine in the line and its alignment with conveyors and peripheral equipment, respecting process tolerances.' },
    ],
    includes: [
      'Receiving and unloading at the plant',
      'Unpacking and visual inspection of components',
      'In-plant moving to the installation point',
      'Positioning, leveling and alignment',
      'Mechanical assembly and anchoring to specification',
      'Installation of complete production lines',
    ],
    faq: [
      { q: 'Do you install imported machinery?', a: 'Yes. We handle receiving, unpacking, moving, positioning and mechanical assembly following the manufacturer’s manual, and can work alongside the OEM engineer during commissioning.' },
      { q: 'Do you handle electrical and pneumatic hook-ups?', a: 'We coordinate them with licensed partners for electrical, compressed air, water and gas networks, as required by each project.' },
    ],
  },
  'desmontaje-traslado-maquinaria': {
    slug: 'machinery-dismantling-relocation',
    title: 'Machinery dismantling and relocation',
    short: 'Dismantling & moving',
    seoTitle: 'Industrial machinery dismantling & relocation between plants and countries | AGELVIS EU',
    seoDescription: 'Controlled dismantling, component tagging, packing, loading and coordinated transport of industrial machinery between plants, cities and countries, with reinstallation at destination.',
    summary: 'We dismantle in a controlled way, tag every component and coordinate transport to the new site.',
    intro: [
      'A good move starts with good information. We record how every machine is assembled, wired and leveled so reinstallation at destination is fast and orderly.',
      'Every AGELVIS EU dismantling job starts with a technical survey: we document the equipment’s condition, tag components and connections, and define the disassembly sequence. Then we protect each part for transport and coordinate loading, shipping and unloading.',
    ],
    sections: [
      { h: 'In-plant moves or transfers to another site', p: 'We handle internal moves (layout changes, expansions) and transfers between plants, cities or countries. The scope can end at delivery or include full reinstallation.' },
    ],
    includes: [
      'Technical survey and machinery inventory',
      'Component and wiring identification and tagging',
      'Controlled mechanical disassembly',
      'Packing and protection for transport',
      'Loading, coordinated transport and unloading',
      'Reinstallation at the new site, as scoped',
    ],
    faq: [
      { q: 'Can you move machinery between countries?', a: 'Yes. We have supported domestic and international transfers. Each case is assessed by distance, customs requirements and resources, working with freight forwarders and customs brokers.' },
      { q: 'How do you avoid losing parts?', a: 'Before disassembly we survey the machine and tag every component, cable and connection. That identification is what allows an orderly reinstallation.' },
    ],
  },
  'relocalizacion-plantas-industriales': {
    slug: 'plant-relocation',
    title: 'Industrial plant relocation',
    short: 'Plant relocation',
    seoTitle: 'Industrial plant relocation services | Nearshoring & line transfers | AGELVIS EU',
    seoDescription: 'Turnkey relocation of industrial plants and production lines: planning, dismantling, export packing, logistics coordination, reinstallation and start-up support in Latin America and abroad.',
    summary: 'We coordinate the full transfer of plants and production lines, from planning to reinstallation.',
    intro: [
      'Relocating a plant is one of the most demanding projects an industrial company faces: stopped production, high-value equipment, several suppliers and a destination site that must be ready on time.',
      'AGELVIS EU can take on the technical coordination of the whole move or part of it. We plan the stages, decide what moves first, how each unit is protected and what the destination needs before arrival.',
    ],
    sections: [
      { h: 'Relocation stages', p: 'Diagnosis of origin and destination plants · Sequencing, resources, risks and schedule · Dismantling and packing with component tagging · Coordinated loading, transport and unloading · Reinstallation and integration in the new layout.' },
      { h: 'Nearshoring and cross-border moves', p: 'Companies moving production closer to North America, or consolidating plants across Latin America, need a contractor that can dismantle at origin and install at destination with the same crew and the same records.' },
    ],
    includes: [
      'Diagnosis of the origin plant and the destination site',
      'Staged relocation plan and risk control',
      'Dismantling, tagging and packing of equipment',
      'Loading, transport and unloading coordination',
      'Reinstallation, leveling and line integration',
      'Start-up support with the client and OEM',
    ],
    faq: [
      { q: 'What does a turnkey relocation include?', a: 'It can include diagnosis, planning, dismantling, packing, logistics, reinstallation and site preparation. The exact scope is defined with the client in the technical proposal.' },
      { q: 'How do you reduce downtime?', a: 'With a staged plan that prioritizes critical lines and prepares the destination in advance, so equipment arrives at a site ready to receive it.' },
    ],
  },
  'embalaje-desembalaje-industrial': {
    slug: 'industrial-export-packing',
    title: 'Industrial export packing and unpacking',
    short: 'Export packing',
    seoTitle: 'Industrial machinery export packing & crating | AGELVIS EU',
    seoDescription: 'Technical packing of industrial machinery for storage, road and sea transport and export: custom wooden crates, moisture and corrosion barriers, container stuffing and unpacking of imported equipment.',
    summary: 'We protect machinery for storage, transport and export, and unpack imported equipment for installation.',
    intro: [
      'With the right packing, machinery arrives in the same condition it left: protected from impact, moisture and corrosion, and ready for start-up.',
      'We design the packing for the trip the equipment will make: road or sea, short or long storage, container or break-bulk. We build custom crates, apply protective barriers and secure the load.',
    ],
    sections: [
      { h: 'Ready for import and export', p: 'We support companies that ship equipment abroad or receive it from overseas: from packing at origin to unpacking, inspection and preparation for installation at destination.' },
    ],
    includes: [
      'Technical packing for destination and storage time',
      'Custom wooden crates and skids',
      'Plastic or foil vapor barriers and anti-corrosion protection',
      'Preparation of machinery for import and export',
      'Unpacking, inspection and preparation for installation',
      'Container loading and securing',
    ],
    faq: [
      { q: 'What packing does a machine need for export?', a: 'It depends on destination, transport mode and storage time. We define the specification per project (crate, barrier, anti-corrosion protection, securing) for those conditions.' },
      { q: 'Do you unpack imported machinery?', a: 'Yes. We open, inspect and prepare equipment for installation, recording its condition at opening.' },
    ],
  },
  'rigging-movimiento-maquinaria-pesada': {
    slug: 'rigging-heavy-machinery-moving',
    title: 'Rigging and heavy machinery moving',
    short: 'Rigging & moving',
    seoTitle: 'Industrial rigging & heavy machinery moving contractor | AGELVIS EU',
    seoDescription: 'Engineered lifts and moves of heavy or delicate industrial equipment with machinery skates, high-capacity forklifts and telescopic cranes up to 300 t through partners.',
    summary: 'We plan and execute lifts and moves of heavy or delicate equipment.',
    intro: [
      'To move a multi-ton machine inside an operating plant we calculate the center of gravity, floor capacity and load path, and define a contingency plan.',
      'AGELVIS EU engineers and executes the complete move: we analyze the load and route, choose the technique (skates, forklifts, crane or a combination) and coordinate the people and resources, our own or from partners.',
    ],
    sections: [
      { h: 'Lift engineering', p: 'Every move is defined before execution: pick points, rigging, route, exclusion zone and responsibilities. That protects the equipment, the client’s facility and the people.' },
    ],
    includes: [
      'Lift and move planning',
      'In-plant moving with machinery skates',
      'Forklift and crane lifts (own or partner equipment)',
      'Moves in tight spaces',
      'Risk control and work-area isolation',
      'Final positioning of the equipment',
    ],
    faq: [
      { q: 'Do you provide the cranes and forklifts?', a: 'We handle the full operation: we plan it, execute it and, depending on the job, use our own tools or coordinate cranes and forklifts with partner suppliers.' },
      { q: 'Can you move equipment in very tight spaces?', a: 'Yes. Machinery skates and controlled moving techniques let us move equipment where a crane has no access.' },
    ],
  },
  'ingenieria-adecuaciones-industriales': {
    slug: 'plant-engineering-site-preparation',
    title: 'Plant engineering, layout and site preparation',
    short: 'Engineering & site prep',
    seoTitle: 'Plant layout design & site preparation for machinery installation | AGELVIS EU',
    seoDescription: 'Plant layout design, site surveys, area preparation, complementary civil works and coordination of utility hook-ups with partners before machinery arrives.',
    summary: 'We prepare the site before the machinery arrives: layout, site works and utility coordination.',
    intro: [
      'A smooth installation starts before assembly: foundations ready, access routes sized for the equipment and utility feeds planned from the design stage.',
      'AGELVIS EU works the project from the layout. We review equipment placement, installation routes and utility needs, and coordinate site works so the plant is ready when the machinery arrives.',
    ],
    sections: [
      { h: 'Support and technical crews', p: 'Beyond installation projects, we carry out specific industrial interventions and supply technical crews according to scope and availability.' },
    ],
    includes: [
      'Plant layout design and adjustment',
      'Site visits and surveys',
      'Area preparation to receive equipment',
      'Complementary civil works',
      'Electrical, air, water and gas coordination with partners',
      'Technical support and specialized crews as scoped',
    ],
    faq: [
      { q: 'Do you design the plant layout?', a: 'Yes. We propose or adjust equipment layout considering process flow, maintenance access and installation routes.' },
      { q: 'Do you do civil works?', a: 'We coordinate complementary civil works (foundations, floors, openings) when the project requires it, with our crew or partners.' },
    ],
  },
};

/** Busca la entrada en inglés por su slug en inglés. */
export const enServicioPorSlug = (slug: string) => Object.entries(enServicios).find(([, s]) => s.slug === slug);

export const enSectores: { nombre: string; icono: IconName }[] = [
  { nombre: 'Food & beverage', icono: 'cup' },
  { nombre: 'Pharmaceutical', icono: 'pill' },
  { nombre: 'Paper & tissue', icono: 'paper' },
  { nombre: 'Packaging', icono: 'package' },
  { nombre: 'Printing & graphic arts', icono: 'printer' },
  { nombre: 'Plastics', icono: 'bottle' },
  { nombre: 'Glass', icono: 'glass' },
  { nombre: 'Metalworking', icono: 'gear' },
  { nombre: 'Chemicals & manufacturing', icono: 'flask' },
];

export const enFaq = [
  { q: 'Do you work outside Colombia?', a: 'Yes. AGELVIS EU has executed or supported projects in Mexico, Ecuador, Panama, Bulgaria and Ukraine. Each international project is assessed by location, requirements and resources, and crews travel from Colombia with local partners at destination.' },
  { q: 'Can you move a complete production line to another country?', a: 'Yes. We can scope a turnkey job: dismantling and tagging at origin, export packing, container loading, coordination with freight forwarders and customs brokers, receiving at destination, reinstallation and start-up support.' },
  { q: 'Can we hire only part of the project?', a: 'Yes. We quote specific tasks (for example, only unpacking or a single rigging operation) or full turnkey packages.' },
  { q: 'Do you include transport and cranes?', a: 'They can be coordinated within the scope, using our own tools or specialized suppliers depending on each lift.' },
  { q: 'Which languages do you work in?', a: 'Spanish and English. We work from the manufacturer’s manuals and drawings and coordinate with international service teams.' },
  { q: 'How is a quotation prepared?', a: 'From the technical information on the equipment and, when needed, a site inspection to define scope, risks, resources and schedule.' },
];
