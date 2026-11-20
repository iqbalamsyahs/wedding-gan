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
