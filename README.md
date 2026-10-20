# Sitio web AGELVIS EU

Sitio en [Astro](https://astro.build) para captar solicitudes técnicas B2B de montaje, traslado, rigging, embalaje y relocalización de maquinaria industrial. Se construyó a partir del brief "Plan integral web y desarrollo comercial" (octubre de 2026).

## Comandos

| Comando           | Acción                                      |
| ----------------- | ------------------------------------------- |
| `npm install`     | Instala dependencias                        |
| `npm run dev`     | Servidor local en `http://localhost:4321`   |
| `npm run build`   | Genera el sitio estático en `dist/`         |
| `npm run preview` | Previsualiza la versión de producción       |

## Dónde se edita cada cosa

- **Datos de la empresa** (teléfonos, WhatsApp, correo, dirección, redes, interruptores): `src/data/site.ts`
- **Sectores, metodología, FAQ y clientes**: `src/data/contenido.ts`
- **Servicios** (una página por archivo): `src/content/servicios/*.md`
- **Casos de proyecto**: `src/content/proyectos/*.md`. Copie `_plantilla.md`. Los casos con `draft: true` solo se ven con `npm run dev` y **no se publican**.
- **Fotos**: `src/assets/fotos/` (en WebP, con nombres descriptivos). Las originales están en `../originales-fotos-agelvis/`, fuera del proyecto.
- **Textos en inglés** (`/en/`): `src/data/en.ts`
- **Página internacional** (ES y EN): `src/components/InternationalPage.astro`
- **Videos**: `public/video/`

## Configuración (`.env`)

Copie `.env.example` a `.env`:

- `PUBLIC_FORM_ENDPOINT`: URL del servicio de formularios (Formspree, Web3Forms, Basin…). Si está vacía, el formulario abre WhatsApp con el resumen de la solicitud.
- `PUBLIC_GA_ID`: ID de Google Analytics 4. Registra los eventos `whatsapp_click`, `phone_click`, `email_click`, `cta_click` y `form_submit`.

## Pendientes antes de publicar (sección 16 del brief)

- [ ] Confirmar razón social, NIT y año de constitución (hoy se muestra "Desde 1996"; el plan de exportación UPB dice 1998)
- [ ] Confirmar si hubo proyectos en Perú (el plan de exportación no lo menciona)
- [ ] Crear el Perfil de Empresa en Google (Google Business Profile) con las fotos nuevas
- [ ] Pasar el formulario de contacto a inglés para `/en/` (hoy usa WhatsApp y correo)
- [ ] Confirmar la línea principal de WhatsApp y la autorización para publicar la dirección
- [ ] Agregar las URL de LinkedIn, Facebook e Instagram en `site.ts`
- [ ] Validar al menos 5 casos reales y cambiarlos a `draft: false`
- [ ] Conseguir autorización para logos de clientes y luego activar `flags.showClientLogos`
- [ ] Revisión legal de la política de datos (`/politica-de-privacidad`)
- [ ] Aprobar la misión, la visión y la metodología propuestas
- [ ] Definir el dominio y el correo corporativo, y luego actualizar `site` en `astro.config.mjs`
- [ ] Dar de alta el sitio en Google Search Console y enviar `sitemap-index.xml`
