"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Jasmine } from "@/components/atoms/Ornaments";
import { OPEN_EVENT } from "@/components/molecules/MusicPlayer";

type Petal = { left: number; size: number; dur: number; d: number; sway: number; rot: number; flower: boolean };

const COUNT = 28;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Kelopak & kuntum melati berjatuhan sekali saat "Buka Undangan", lalu dilepas dari DOM.
// Berada di luar SmoothScroll karena position: fixed rusak di dalam konten yang di-transform.
export default function PetalShower() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onOpen = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const next = Array.from({ length: COUNT }, (_, i) => ({
        left: rand(-2, 98),
        size: rand(16, 28),
        dur: rand(4.2, 6.8),
        d: rand(0, 1.8),
        sway: rand(18, 46),
        rot: rand(180, 560) * (i % 2 ? 1 : -1),
        flower: i % 4 === 0,
      }));
      setPetals(next);
      timer = setTimeout(() => setPetals([]), 9000);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      clearTimeout(timer);
    };
  }, []);

  if (!petals.length) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute -top-8"
          style={
            {
              left: `${p.left}%`,
              width: p.flower ? p.size * 1.25 : p.size * 0.6,
              "--dur": `${p.dur}s`,
              "--d": `${p.d}s`,
              "--sway": `${p.sway}px`,
              "--rot": `${p.rot}deg`,
            } as CSSProperties
          }
        >
          <span className="block">
            <Jasmine petal={!p.flower} />
          </span>
        </span>
      ))}
    </div>
  );
}
