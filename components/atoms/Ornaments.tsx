import type { CSSProperties } from "react";

// Ornamen sketsa tinta yang "hidup" di margin undangan: kupu-kupu hinggap lalu melayang,
// burung layang-layang melintas di celah antar section. Garis #554740 sama dengan ranting & bunga.
// Murni CSS (globals.css: .bf-*, .bird-*), diam saat prefers-reduced-motion.

const INK = "#554740";

const TINTS = {
  rose: "rgba(168, 55, 78, 0.16)",
  sage: "rgba(155, 155, 109, 0.28)",
  none: "transparent",
};

// Satu sisi sayap (kiri); sisi kanan = cermin. Badan di x=20.
function Wing({ fill }: { fill: string }) {
  return (
    <>
      <path d="M20 14.5C16.5 6 9.5 1.6 5 3.4 1.6 4.8 2.4 10.4 6.6 13.4c3.6 2.5 8.6 2.4 13.4 1.9Z" fill={fill} />
      <path d="M20 16.6c-4.6.4-9.8 2.6-11 6.6-.9 3.1 1.3 5.6 4.2 4.6 3.3-1.1 5.8-5.6 6.8-10.6Z" fill={fill} />
      <path d="M19.4 14.6C15.6 10.8 11.2 7.6 6.4 6.6M19.2 16.9c-2.6 1.6-5 3.8-6.6 6.9" strokeWidth="0.7" />
      <circle cx="8.4" cy="7.8" r="0.9" fill={INK} stroke="none" />
    </>
  );
}

export function Butterfly({
  className = "",
  tint = "rose",
  delay = 0,
}: {
  className?: string;
  tint?: keyof typeof TINTS;
  delay?: number;
}) {
  const fill = TINTS[tint];
  return (
    <div
      aria-hidden="true"
      className={`bf pointer-events-none absolute ${className}`}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      <svg viewBox="0 0 40 32" fill="none" stroke={INK} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="h-auto w-full overflow-visible">
        <g className="bf-wing">
          <Wing fill={fill} />
        </g>
        <g className="bf-wing bf-wing-r">
          <g transform="matrix(-1 0 0 1 40 0)">
            <Wing fill={fill} />
          </g>
        </g>
        <path d="M20 11.4v11.2" strokeWidth="1.8" />
        <path d="M20 11.6c-.6-3-2.2-5.4-4.4-6.8M20 11.6c.6-3 2.2-5.4 4.4-6.8" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

function Bird() {
  return (
    <svg viewBox="0 0 28 14" fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-auto w-full overflow-visible">
      <path className="bird-wing" d="M14 8.2C11.4 3.6 6.4 1.8 1.4 3.4" />
      <path className="bird-wing bird-wing-r" d="M14 8.2c2.6-4.6 7.6-6.4 12.6-4.8" />
      <path d="M12.8 8.6 14 10l1.2-1.4" strokeWidth="1" />
    </svg>
  );
}

// Tiga burung dengan jarak, ukuran, dan tempo berbeda supaya tidak terlihat seperti barisan robot
const FLOCK = [
  { top: "0%", w: "w-7 lg:w-11", dur: 26, delay: -4, bob: 0, rest: "58vw" },
  { top: "34%", w: "w-5 lg:w-8", dur: 26, delay: -5.2, bob: 0.4, rest: "53vw" },
  { top: "62%", w: "w-6 lg:w-9", dur: 26, delay: -6.1, bob: 0.9, rest: "61vw" },
];

export function Flock({ className = "", offset = 0 }: { className?: string; offset?: number }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 h-16 lg:h-24 ${className}`}>
      {FLOCK.map((b, i) => (
        <div
          key={i}
          className={`bird absolute left-0 ${b.w}`}
          style={{ top: b.top, "--dur": `${b.dur}s`, "--d": `${b.delay + offset}s`, "--bob": `${b.bob}s`, "--rest": b.rest } as CSSProperties}
        >
          <div className="bird-bob opacity-75">
            <Bird />
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Not balok: hanya bergerak selama musik diputar (MusicPlayer memasang <html data-music="on">) ----

function Note({ beamed }: { beamed?: boolean }) {
  return beamed ? (
    <svg viewBox="0 0 22 20" className="h-auto w-full overflow-visible">
      <ellipse cx="4.6" cy="16" rx="3.4" ry="2.5" transform="rotate(-20 4.6 16)" fill={INK} />
      <ellipse cx="15.6" cy="14" rx="3.4" ry="2.5" transform="rotate(-20 15.6 14)" fill={INK} />
      <path d="M7.7 15.2V4.4M18.7 13.2V2.4" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7.7 4.6 18.7 2.6" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 14 20" className="h-auto w-full overflow-visible">
      <ellipse cx="4.6" cy="16" rx="3.4" ry="2.5" transform="rotate(-20 4.6 16)" fill={INK} />
      <path d="M7.7 15.2V2.6c1.4 2.6 4.4 3.2 4.6 6.6" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Tiga not bergantian naik dari satu titik (headphone / piringan), arah & putaran berbeda
const NOTES = [
  { beamed: false, d: 0, x: "-22px", r: "-16deg", w: "w-3" },
  { beamed: true, d: 1.3, x: "16px", r: "12deg", w: "w-4.5" },
  { beamed: false, d: 2.6, x: "-6px", r: "20deg", w: "w-2.5" },
];

export function MusicNotes({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`notes pointer-events-none absolute h-0 w-0 ${className}`}>
      {NOTES.map((n, i) => (
        <span
          key={i}
          className={`note absolute bottom-0 left-0 ${n.w}`}
          style={{ "--d": `${n.d}s`, "--x": n.x, "--r": n.r } as CSSProperties}
        >
          <Note beamed={n.beamed} />
        </span>
      ))}
    </div>
  );
}

// ---- Pesawat kertas & kelopak melati (dipakai imperatif / oleh PetalShower) ----

export const PAPER_PLANE_SVG = `<svg viewBox="0 0 32 24" fill="none" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round" style="width:100%;height:auto;overflow:visible"><path d="M2 3 30 12 2 21 8 12Z" fill="#fbf7ee"/><path d="M8 12h22M8 12l4 7.5"/></svg>`;

export function Jasmine({ petal }: { petal?: boolean }) {
  if (petal)
    return (
      <svg viewBox="0 0 10 18" className="h-auto w-full overflow-visible">
        <path d="M5 1C8.6 4.6 8.4 12.4 5 17 1.6 12.4 1.4 4.6 5 1Z" fill="#fffdf7" stroke={INK} strokeOpacity="0.7" strokeWidth="0.8" />
        <path d="M5 4.5v9" stroke={INK} strokeOpacity="0.2" strokeWidth="0.5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" className="h-auto w-full overflow-visible">
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d="M10 10C7.6 7.2 7.8 2.6 10 .9c2.2 1.7 2.4 6.3 0 9.1Z"
          transform={`rotate(${deg} 10 10)`}
          fill="#fffdf7"
          stroke={INK}
          strokeOpacity="0.7"
          strokeWidth="0.7"
        />
      ))}
      <circle cx="10" cy="10" r="1.6" fill="#c9c58f" />
    </svg>
  );
}
