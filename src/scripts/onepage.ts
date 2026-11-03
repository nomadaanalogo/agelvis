/**
 * Animaciones del inicio one-page.
 * - Lenis: scroll suave.
 * - GSAP ScrollTrigger: parallax, scroll horizontal de servicios, contadores, pasos, rutas y galería.
 * - Grúa: péndulo con física simple; el scroll sube el guacal y desplaza el carro.
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

const header = $('[data-op-header]');
const burger = $<HTMLButtonElement>('[data-op-burger]');
const menu = $('[data-op-nav]');
const setMenu = (open: boolean) => {
  burger?.setAttribute('aria-expanded', String(open));
  menu?.classList.toggle('is-open', open);
  if (open) lenis?.stop(); else lenis?.start();
};
burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

$$<HTMLAnchorElement>('a[data-scroll]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = $(a.getAttribute('href') ?? '');
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    if (lenis) lenis.scrollTo(target, { offset: -70 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });
});

const onScroll = () => header?.classList.toggle('is-solid', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Grúa ---------- */
const hero = $('[data-hero]');
const trolley = $<SVGGElement>('#crane-trolley');
const pend = $<SVGGElement>('#crane-pend');
const load = $<SVGGElement>('#crane-load');
const cables = $$<SVGLineElement>('.crane-cable');

if (hero && trolley && pend && load) {
  const REST = 504; // guacal apoyado en la plataforma
  const LIFT = 430; // altura tras el arranque
  const TOP = 120; // altura con el hero fuera de pantalla
  const X0 = 330;
  const X1 = 460;

  let L = REST;
  let x = X0;
  let angle = 0; // grados
  let angVel = 0;
  let intro = 0; // 0 → 1 durante el arranque
  const start = performance.now();
  let last = start;

  const draw = () => {
    trolley.setAttribute('transform', `translate(${x.toFixed(2)} 160)`);
    pend.setAttribute('transform', `translate(${x.toFixed(2)} 172) rotate(${angle.toFixed(3)})`);
    load.setAttribute('transform', `translate(0 ${L.toFixed(2)})`);
    cables.forEach((c) => c.setAttribute('y2', L.toFixed(2)));
  };

  if (reduce) {
    L = LIFT;
    draw();
  } else {
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      intro = Math.min((now - start - 600) / 2400, 1);
      const eased = intro <= 0 ? 0 : 1 - Math.pow(1 - intro, 3);
      const p = Math.min(Math.max(window.scrollY / (hero.offsetHeight * 0.85), 0), 1);

      const targetL = REST + (LIFT - REST) * eased + (TOP - LIFT) * p;
      const targetX = X0 + (X1 - X0) * p;
      const prevX = x;
      L += (targetL - L) * Math.min(dt * 5, 1);
      x += (targetX - x) * Math.min(dt * 3, 1);

      // Péndulo amortiguado: la aceleración del carro empuja la carga
      const accel = (x - prevX) / Math.max(dt, 0.001);
      const length = (L + 200) / 300;
      angVel += (-(9 / length) * angle - 1.4 * angVel + accel * 0.06) * dt;
      angle += angVel * dt * 10;
      angle += Math.sin(now / 1100) * 0.004 * eased; // brisa
      angle = Math.max(-7, Math.min(7, angle));

      draw();
      if (hero.getBoundingClientRect().bottom > -200) requestAnimationFrame(tick);
      else heroSleeping = true;
    };
    let heroSleeping = false;
    requestAnimationFrame(tick);
    // Si el hero vuelve a la vista, se reanuda la física
    window.addEventListener('scroll', () => {
      if (heroSleeping && hero.getBoundingClientRect().bottom > -200) {
        heroSleeping = false;
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
  gsap.to('[data-parallax]', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.fromTo('[data-ghost]', { xPercent: 0 }, { xPercent: -25, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });

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
