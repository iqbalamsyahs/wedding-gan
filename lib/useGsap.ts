"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animasi GSAP hanya jalan jika pengguna tidak meminta reduced motion.
// Tanpa itu, elemen tetap di keadaan default CSS (terlihat penuh).
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (root: HTMLElement) => void,
) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => setup(root));
    return () => mm.revert();
  }, [scope]);
}

// Reveal gradasi lembut dari kanan ke kiri, cocok untuk garis dan ilustrasi.
export const inkMask = {
  maskImage: "linear-gradient(90deg, #000 55%, transparent)",
  maskSize: "220% 100%",
  maskRepeat: "no-repeat",
};
