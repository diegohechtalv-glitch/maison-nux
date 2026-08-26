"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { bands, SALT_PARTICLES } from "./bands";
import fotoHero from "@/public/img/bolsa-120g.jpg";

// El héroe animado corre también en celular (decisión de Juan Fran,
// fase 1). El estático es respaldo, con dos vías:
// 1. reduced motion: media query idéntica carácter por carácter a la de
//    globals.css, evaluada en vivo en CSS y JS.
// 2. conexión lenta o equipo corto: solo se puede saber desde JS, así que
//    el JS pone la clase hero-degradado en <html> y el CSS la obedece.
const GATES = ["(prefers-reduced-motion: reduce)"];

function equipoCorto(): boolean {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  const con = nav.connection;
  if (con?.saveData) return true;
  if (con?.effectiveType && /(^|-)2g$/.test(con.effectiveType)) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return true;
  return false;
}

const smoothstep = (p: number, e0: number, e1: number) => {
  const t = Math.min(1, Math.max(0, (p - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export default function HeroScrub() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const bandEls = bands.map(
      (b) => root.querySelector<HTMLElement>(`[data-band="${b.id}"]`)!
    );
    const cache = bands.map(() => ({ op: -1, k: -1 }));

    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let onScreen = true;
    let armed = false;
    let loadK = 0;
    let loadStart = 0;
    let loadRaf: number | null = null;

    const heroProgress = () => {
      const rect = root.getBoundingClientRect();
      const range = root.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / range));
    };

    const paint = (p: number) => {
      bands.forEach((b, i) => {
        const f = Math.min(0.02, (b.b - b.a) / 3);
        let op =
          smoothstep(p, b.a, b.a + f) * (1 - smoothstep(p, b.b - f, b.b));
        if (i === 0) op = 1 - smoothstep(p, b.b - f, b.b); // banda 1 abre asentada
        if (i === bands.length - 1) op = smoothstep(p, b.a, b.a + f); // banda 4 cierra asentada
        const ramp = Math.min(0.025, (b.b - b.a) * 0.35);
        let k = Math.min(1, Math.max(0, (p - b.a) / ramp));
        if (i === 0) k = Math.max(k, loadK); // rampa única de carga, solo banda 1
        const c = cache[i];
        if (Math.abs(op - c.op) > 0.008) {
          c.op = op;
          bandEls[i].style.opacity = op.toFixed(3);
        }
        if (Math.abs(k - c.k) > 0.008) {
          c.k = k;
          bandEls[i].style.setProperty("--k", k.toFixed(3));
        }
      });
    };

    // lerp con rAF que descansa: normalizado a 60 fps para que se sienta
    // igual en cualquier pantalla, y se detiene al converger
    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      paint(shown);
    };

    const onScroll = () => {
      target = heroProgress();
      if (rafId === null && onScreen) rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && armed) onScroll();
    });
    io.observe(root);

    const runLoadRamp = (now: number) => {
      if (!loadStart) loadStart = now;
      // 300 ms de retraso y después el fade, como pide el band map
      loadK = Math.min(1, Math.max(0, (now - loadStart - 300) / 600));
      paint(shown);
      loadRaf = loadK < 1 ? requestAnimationFrame(runLoadRamp) : null;
    };

    const degradado = equipoCorto();
    document.documentElement.classList.toggle("hero-degradado", degradado);

    const mqls = GATES.map((q) => matchMedia(q));
    const enable = () => {
      if (armed) return;
      armed = true;
      addEventListener("scroll", onScroll, { passive: true });
      cache.forEach((c) => {
        c.op = -1;
        c.k = -1;
      });
      target = heroProgress();
      shown = target;
      paint(shown);
      if (loadK < 1 && loadRaf === null)
        loadRaf = requestAnimationFrame(runLoadRamp);
    };
    const disable = () => {
      if (!armed) return;
      armed = false;
      removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
    const applyMode = () => {
      if (degradado || mqls.some((m) => m.matches)) disable();
      else enable();
    };
    mqls.forEach((m) => m.addEventListener("change", applyMode));
    applyMode();

    return () => {
      disable();
      io.disconnect();
      mqls.forEach((m) => m.removeEventListener("change", applyMode));
      if (loadRaf !== null) cancelAnimationFrame(loadRaf);
    };
  }, []);

  return (
    <section ref={rootRef} className="hero-scrub" aria-label="Maison Nux">
      <div className="hero-stage">
        <Image
          src={fotoHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          aria-hidden="true"
        />
        <div className="hero-veil" aria-hidden="true" />
        {bands.map((b, i) => (
          <div
            key={b.id}
            data-band={b.id}
            className={`band band-${b.kind} lane-${b.lane}`}
          >
            {b.kind === "salt" && (
              <div className="salt" aria-hidden="true">
                {SALT_PARTICLES.map((s, j) => (
                  <span
                    key={j}
                    style={
                      {
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size,
                        height: s.size,
                        "--fall": `${s.fall}px`,
                        "--th": s.th,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}
            {i === 0 ? (
              <h1 className="band-titulo">{b.titulo}</h1>
            ) : (
              <p className="band-titulo" role="heading" aria-level={2}>
                {b.titulo}
              </p>
            )}
            {b.kind === "rise" && (
              <span className="band-filete" aria-hidden="true" />
            )}
            {b.kind === "settle" && (
              <a href="#presentaciones" className="btn-primario band-cta">
                Ver presentaciones
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
