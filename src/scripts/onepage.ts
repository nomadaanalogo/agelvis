/**
 * Animaciones del inicio one-page.
 * - Lenis: scroll suave.
 * - GSAP ScrollTrigger: parallax, scroll horizontal de servicios, contadores, pasos, rutas y galería.
 * - Izaje del hero: el scroll sube la carga recortada de la foto, con un zoom leve.
 * Con "reducir movimiento" activado no hay scroll suave, ni pin, ni parallax.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/* ---------- Scroll suave y anclas ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// El menú móvil (SiteHeader) avisa cuando se abre para pausar el scroll suave
document.addEventListener('site:menu', (e) => {
  if ((e as CustomEvent<{ open: boolean }>).detail.open) lenis?.stop(); else lenis?.start();
});

$$<HTMLAnchorElement>('a[data-scroll]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = $(a.getAttribute('href') ?? '');
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -70 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });
});

/* ---------- Izaje del hero ---------- */
// La foto de la grúa está separada en dos capas: el fondo y la carga (gancho + eslingas + máquina).
// Mientras el hero está fijo (un tramo corto de scroll), la carga sube y los cables se acortan.
// En vez de balancearse, la carga "respira": un zoom in / zoom out leve desde el gancho.
const hero = $('[data-hero]');
const load = $<SVGGElement>('#lift-load');
const liftCables = $$<SVGLineElement>('.lift-cable');
/** Recorrido de scroll con el hero fijo: unos dos movimientos de rueda. */
const heroPin = () => Math.round(Math.max(240, window.innerHeight * 0.35));

if (hero && load) {
  const HOOK = { x: 685, y: 460 }; // boca del gancho, en coordenadas de la foto
  const START = 430; // carga abajo, frente a la fachada
  const INTRO = 360; // tras el arranque automático
  const END = -190; // carga arriba, cerca de la punta de la pluma

  let progress = 0;
  let dy = START;
  let scale = 1;
  const start = performance.now();
  let last = start;

  const draw = () => {
    const s = scale.toFixed(4);
    load.setAttribute('transform', `translate(0 ${dy.toFixed(2)}) translate(${HOOK.x} ${HOOK.y}) scale(${s}) translate(${-HOOK.x} ${-HOOK.y})`);
    liftCables.forEach((c) => c.setAttribute('y2', (HOOK.y + dy).toFixed(2)));
  };

  if (reduce) {
    dy = 0;
    draw();
  } else {
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: () => `+=${heroPin()}`,
      pin: true,
      onUpdate: (self) => { progress = self.progress; },
    });

    let sleeping = false;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const intro = Math.min(Math.max((now - start - 500) / 2600, 0), 1);
      const eased = 1 - Math.pow(1 - intro, 3);
      const target = START + (INTRO - START) * eased + (END - INTRO) * progress;
      const prev = dy;
      dy += (target - dy) * Math.min(dt * 5, 1);

      // Zoom leve: ±3 % en ciclos de ~4,5 s, más un pequeño empuje al subir rápido
      const vel = Math.abs(dy - prev) / Math.max(dt, 0.001);
      const targetScale = 1 + 0.03 * Math.sin((now / 4500) * Math.PI * 2) * eased + Math.min(vel * 0.00005, 0.03);
      scale += (targetScale - scale) * Math.min(dt * 3, 1);

      draw();
      if (hero.getBoundingClientRect().bottom > -200) requestAnimationFrame(tick);
      else sleeping = true;
    };
    requestAnimationFrame(tick);
    window.addEventListener('scroll', () => {
      if (sleeping && hero.getBoundingClientRect().bottom > -200) {
        sleeping = false;
        last = performance.now();
        requestAnimationFrame(tick);
      }
    }, { passive: true });
  }
}

/* ---------- Animaciones con GSAP ---------- */
const mm = gsap.matchMedia();

mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)' }, (ctx) => {
  const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
  if (!motion) {
    // Sin movimiento: todo visible y estático
    gsap.set('[data-up], [data-intro]', { clearProps: 'all' });
    $$('[data-step]').forEach((s) => s.classList.add('is-on'));
    return;
  }

  // Entrada del hero
  gsap.from('[data-intro]', { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.15 });

  // Parallax del hero
  gsap.fromTo('[data-ghost]', { xPercent: 0 }, { xPercent: -25, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: () => `+=${heroPin()}`, scrub: true } });

  // Títulos y bloques
  $$('[data-up]').forEach((el) => {
    gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // Servicios: scroll horizontal fijado (solo escritorio)
  const work = $('[data-hscroll]');
  const track = $('[data-htrack]');
  if (desktop && work && track) {
    work.classList.add('is-pinned');
    const distance = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: { trigger: work, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
    });
  }

  // Contadores
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const from = end > 1000 ? end - 30 : 0;
    const obj = { v: from };
    el.textContent = String(from);
    gsap.to(obj, {
      v: end, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
    });
  });

  // Pasos: la foto fija cambia según el paso visible
  const imgs = $$('[data-step-img]');
  const badge = $('[data-step-badge]');
  const steps = $$('[data-step]');
  steps.forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step, start: 'top 60%', end: 'bottom 40%',
      onToggle: (self) => {
        if (!self.isActive) return;
        steps.forEach((s, j) => s.classList.toggle('is-on', j === i));
        imgs.forEach((img, j) => img.classList.toggle('is-on', j === i));
        if (badge) badge.textContent = `${String(i + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
      },
    });
  });

  // Países a la deriva
  $$('[data-drift]').forEach((row) => {
    const dir = Number(row.dataset.drift);
    gsap.fromTo(row, { xPercent: dir < 0 ? 0 : -30 }, { xPercent: dir < 0 ? -30 : 0, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Rutas que se dibujan
  gsap.fromTo('.route', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: 0.15, scrollTrigger: { trigger: '.routes', start: 'top 75%' } });
  gsap.from('.routes .pin', { scale: 0, transformOrigin: 'center', opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.6, scrollTrigger: { trigger: '.routes', start: 'top 75%' } });

  // Galería con columnas a distinta velocidad
  $$('[data-speed]').forEach((col) => {
    const speed = Number(col.dataset.speed);
    gsap.to(col, { yPercent: speed * 100, ease: 'none', scrollTrigger: { trigger: col.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // CTA
  gsap.from('[data-cta-title]', { scale: 0.85, opacity: 0, transformOrigin: 'left center', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '[data-cta-title]', start: 'top 85%' } });

  return () => work?.classList.remove('is-pinned');
});

// Recalcular cuando cargan las imágenes y fuentes
window.addEventListener('load', () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());
