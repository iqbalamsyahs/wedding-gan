"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Typography from "@/components/atoms/Typography";
import { useGsap } from "@/lib/useGsap";

const TARGET = new Date("2026-11-29T09:00:00+07:00").getTime();

type Vals = { days: number; hours: number; minutes: number; seconds: number };

function diff(): Vals {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  };
}

const LABELS: [keyof Vals, string][] = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minute"],
  ["seconds", "Second"],
];

// Satu digit: kolom angka 0–9 yang bergeser vertikal ke digit baru (efek odometer).
// digit null = belum ada waktu (render server), kolom diam di 0 agar HTML awal sama.
function RollDigit({ digit }: { digit: number | null }) {
  const column = useRef<HTMLSpanElement>(null);
  const mounted = useRef(false);

  useLayoutEffect(() => {
    const el = column.current;
    if (!el || digit === null) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mounted.current || reduce) {
      gsap.set(el, { yPercent: -digit * 10 });
      mounted.current = true;
      return;
    }
    gsap.to(el, { yPercent: -digit * 10, duration: 0.9, ease: "expo.out", overwrite: true });
  }, [digit]);

  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top leading-none">
      <span ref={column} data-digit={digit ?? 0} className="cd-col flex flex-col">
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block h-[1em] leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

function RollNumber({ value }: { value: number | null }) {
  const digits = value === null ? ["0", "0"] : String(value).padStart(2, "0").split("");
  return (
    <span className="inline-flex tabular-nums">
      {digits.map((d, i) => (
        <RollDigit key={i} digit={value === null ? null : Number(d)} />
      ))}
    </span>
  );
}

export default function Countdown() {
  const [vals, setVals] = useState<Vals | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVals(diff());
    const id = setInterval(() => setVals(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  // Intro: setiap unit masuk dengan blur, lalu semua digit berputar dari 9 ke nilainya
  useGsap(rootRef, (root) => {
    const trigger = { trigger: root, start: "top 85%", once: true };
    const cols = root.querySelectorAll<HTMLElement>(".cd-col");

    gsap
      .timeline({ scrollTrigger: trigger })
      .from(root.querySelectorAll(".cd-unit"), {
        y: 36,
        autoAlpha: 0,
        filter: "blur(8px)",
        stagger: 0.14,
        duration: 1.2,
        ease: "power3.out",
      }, 0)
      .fromTo(
        cols,
        { yPercent: -90 },
        {
          yPercent: (_, el: HTMLElement) => -Number(el.dataset.digit) * 10,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.1,
          immediateRender: false,
        },
        0.2,
      );
  });

  return (
    <div ref={rootRef} className="flex items-center justify-center gap-9 lg:gap-14">
      {LABELS.map(([key, label]) => (
        <div key={key} className="cd-unit flex flex-col items-center">
          <Typography
            variant="body-bold"
            className="text-[32px] leading-none text-[#934646] tracking-[-0.02em] lg:text-[40px]"
          >
            <RollNumber value={vals ? vals[key] : null} />
          </Typography>
          <Typography
            variant="body-bold"
            className="text-[12px] leading-tight text-[#934646] tracking-[-0.02em] lg:text-[14px]"
          >
            {label}
          </Typography>
        </div>
      ))}
    </div>
  );
}
