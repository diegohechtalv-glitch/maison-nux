"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { bands, SALT_PARTICLES, KRAFT_RAMP } from "./bands";
import posterHero from "@/public/video/heroe-poster.jpg";

// El héroe animado corre también en celular (decisión de Juan Fran,
// fase 1). El estático es respaldo, con dos vías:
// 1. reduced motion: media query idéntica carácter por carácter a la de
//    globals.css, evaluada en vivo en CSS y JS.
// 2. conexión lenta o equipo corto: solo se puede saber desde JS, así que
//    el JS pone la clase hero-degradado en <html> y el CSS la obedece.
const GATES = ["(prefers-reduced-motion: reduce)"];

// Fase 5: el video se baja completo como Blob (muchos hosts no soportan
// descargas parciales y sin esto el scrub no busca ningún cuadro). Los
// tamaños son los bytes reales de cada archivo: el respaldo cuando el
// servidor no manda Content-Length. WebM (VP9) pesa menos y va primero
// cuando el navegador lo domina; MP4 (h264) es el respaldo universal.
const VIDEOS = {
  webm: {
    escritorio: { url: "/video/heroe-escritorio.webm", bytes: 3204366 },
    celular: { url: "/video/heroe-celular.webm", bytes: 1789524 },
  },
  mp4: {
    escritorio: { url: "/video/heroe-escritorio.mp4", bytes: 7733824 },
    celular: { url: "/video/heroe-celular.mp4", bytes: 2919559 },
  },
};
const RING_C = 126; // circunferencia del anillo de carga (r=20)

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

// Color del kraft plano interpolado sobre la rampa medida del video.
function kraftEn(p: number): string {
  const r = KRAFT_RAMP;
  let i = 1;
  while (i < r.length - 1 && p > r[i].p) i++;
  const a = r[i - 1];
  const b = r[i];
  const t = Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p || 1)));
  const mix = a.rgb.map((c, j) => Math.round(c + (b.rgb[j] - c) * t));
  return `rgb(${mix[0]} ${mix[1]} ${mix[2]})`;
}

export default function HeroScrub() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const ring = ringRef.current;
    if (!root || !video || !ring) return;
    const stage = root.querySelector<HTMLElement>(".hero-stage")!;
    const bandEls = bands.map(
      (b) => root.querySelector<HTMLElement>(`[data-band="${b.id}"]`)!
    );
    const cache = bands.map(() => ({ op: -1, k: -1 }));
    let kraftCache = "";

    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let onScreen = true;
    let armed = false;
    let loadK = 0;
    let loadStart = 0;
    let loadRaf: number | null = null;

    // --- compuerta de seeks: nunca escribir currentTime con uno en vuelo ---
    let seekBusy = false;
    let pendingTime = null as number | null;
    const requestSeek = (t: number) => {
      if (!video.duration || !videoListo) return;
      if (seekBusy) {
        pendingTime = t;
        return;
      }
      seekBusy = true;
      video.currentTime = t;
    };
    const onSeeked = () => {
      seekBusy = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    };
    const onVideoError = () => {
      seekBusy = false;
      pendingTime = null;
    };
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onVideoError);

    // --- descarga del video como Blob con anillo de progreso ---
    let videoListo = false;
    let fetchIniciado = false;
    let objectUrl: string | null = null;
    let watchdog: ReturnType<typeof setTimeout> | null = null;

    const failVideo = () => {
      // sin video la página sigue completa sobre el póster
      ring.style.opacity = "0";
      stage.classList.add("video-fallo");
    };

    const cargarVideo = async () => {
      const formato =
        video.canPlayType('video/webm; codecs="vp9"') === "probably"
          ? "webm"
          : "mp4";
      const fuente = matchMedia("(max-width: 720px)").matches
        ? VIDEOS[formato].celular
        : VIDEOS[formato].escritorio;
      const ctrl = new AbortController();
      watchdog = setTimeout(() => ctrl.abort(), 20000);
      const res = await fetch(fuente.url, { signal: ctrl.signal });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const total = Number(res.headers.get("Content-Length")) || fuente.bytes;
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      let got = 0;
      let lastRing = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (watchdog) clearTimeout(watchdog); // se rearma con cada trozo:
        watchdog = setTimeout(() => ctrl.abort(), 20000); // 20 s sin avance aborta
        chunks.push(value);
        got += value.length;
        const frac = Math.min(1, got / total);
        const now = performance.now();
        if (now - lastRing > 100 || frac === 1) {
          lastRing = now;
          ring.style.setProperty("--ld", String(Math.round(RING_C * (1 - frac))));
        }
      }
      if (watchdog) clearTimeout(watchdog);
      watchdog = null;
      ring.style.setProperty("--ld", "0");
      objectUrl = URL.createObjectURL(new Blob(chunks as BlobPart[]));
      video.src = objectUrl;
      video.load();
      video.addEventListener(
        "canplay",
        () => {
          videoListo = true;
          requestSeek(shown * video.duration); // caer en la posición actual
          stage.classList.add("video-listo"); // CSS funde el video sobre el póster
          ring.style.opacity = "0";
        },
        { once: true }
      );
    };

    const iniciarFetch = () => {
      if (fetchIniciado) return;
      fetchIniciado = true;
      cargarVideo().catch(failVideo);
    };

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
      // el kraft plano sigue el tono del borde del video en este punto
      const kraft = kraftEn(p);
      if (kraft !== kraftCache) {
        kraftCache = kraft;
        stage.style.setProperty("--hero-kraft", kraft);
      }
      if (video.duration && videoListo) requestSeek(p * video.duration);
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
      kraftCache = "";
      target = heroProgress();
      shown = target;
      paint(shown);
      if (loadK < 1 && loadRaf === null)
        loadRaf = requestAnimationFrame(runLoadRamp);
      iniciarFetch(); // el video solo se descarga en la vía animada
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
      if (watchdog) clearTimeout(watchdog);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onVideoError);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <section ref={rootRef} className="hero-scrub" aria-label="Maison Nux">
      <div className="hero-stage">
        <div className="hero-foto-wrap" aria-hidden="true">
          <Image
            src={posterHero}
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 100vw, 62vw"
            className="hero-poster object-cover"
            placeholder="blur"
          />
          <video
            ref={videoRef}
            className="hero-video"
            muted
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
          />
          <svg
            ref={ringRef}
            className="hero-anillo"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={RING_C}
              style={{ strokeDashoffset: "var(--ld, 126)" }}
            />
          </svg>
        </div>
        {bands.map((b, i) => (
          <div
            key={b.id}
            data-band={b.id}
            className={`band band-${b.kind}`}
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
