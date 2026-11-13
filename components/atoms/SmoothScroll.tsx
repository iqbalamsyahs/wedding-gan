"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Scroll halus (inersia) untuk mouse/trackpad. Di layar sentuh tetap native.
// Elemen position: fixed harus di luar komponen ini, karena kontennya di-transform.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.2 });
      // ScrollTrigger anak-anak dibuat lebih dulu; hitung ulang posisinya setelah smoother aktif
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
