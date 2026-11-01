"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import Typography from "@/components/atoms/Typography";
import CoupleProfile from "@/components/molecules/CoupleProfile";
import Reveal from "@/components/atoms/Reveal";
import { useGsap, inkMask } from "@/lib/useGsap";

export default function BrideGroom() {
  const rootRef = useRef<HTMLElement>(null);

  useGsap(rootRef, (root) => {
    gsap
      .timeline({ scrollTrigger: { trigger: root, start: "top 70%", once: true } })
      .from(root.querySelector(".bg-profile-start"), {
        x: -48,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
      })
      .from(root.querySelector(".bg-profile-end"), {
        x: 48,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
      }, "<0.15")
      .fromTo(
        root.querySelector(".bg-line"),
        { ...inkMask, maskPosition: "100% 0%" },
        { maskPosition: "0% 0%", duration: 1.8, ease: "power2.inOut" },
        "<0.2",
      )
      .from(root.querySelector(".bg-circle"), {
        scale: 0,
        rotate: -120,
        autoAlpha: 0,
        duration: 1,
        ease: "back.out(1.8)",
      }, "-=1.2")
      .from(root.querySelector(".bg-flower"), {
        y: 14,
        autoAlpha: 0,
        duration: 1,
      }, "-=0.6");
  });

  return (
    <Reveal className="w-full">
    <section
      ref={rootRef}
      id="bride-groom"
      className="relative flex w-full flex-col items-center gap-10 px-10 sm:px-6 py-16 sm:py-24 lg:px-16 lg:py-32 xl:px-24"
    >
      <Typography
        variant="body-bold"
        as="h2"
        className="text-[36px] text-burgundy tracking-[-0.02em] lg:text-[52px]"
      >
        Bride &amp; Groom
      </Typography>

      <div className="relative flex w-full flex-col items-center gap-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12 xl:gap-20">
      <CoupleProfile
        image="/assets/bride_groom/hani.svg"
        name="Hanifah Sartika Julianti"
        parents="Putri .... dari Bapak .... dan Ibu ....."
        align="start"
        className="bg-profile-start lg:flex-col"
      />

      <div className="relative flex h-30 w-full items-center justify-center lg:h-auto lg:w-auto">
        <img
          src="/assets/bride_groom/line.svg"
          alt=""
          aria-hidden="true"
          className="bg-line pointer-events-none absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2 opacity-70 lg:relative lg:left-auto lg:top-auto lg:h-40 lg:w-auto lg:translate-x-0 lg:translate-y-0"
        />
        <img
          src="/assets/bride_groom/and_circle.svg"
          alt=""
          aria-hidden="true"
          className="bg-circle relative h-15 w-15 top-8 lg:absolute lg:top-1/2 lg:-translate-y-1/2"
        />
      </div>

      <CoupleProfile
        image="/assets/bride_groom/gan.svg"
        name={<>
          <span>Gan Gan</span><br/><span>Ahmad Setriawan</span>
        </>}
        parents="Putri .... dari Bapak .... dan Ibu ....."
        align="end"
        className="bg-profile-end mb-15 flex-row-reverse lg:mb-0 lg:flex-col"
      />
      </div>

      <img
        src="/assets/bride_groom/flower.svg"
        alt=""
        aria-hidden="true"
        className="bg-flower h-12 w-auto lg:h-16"
      />
    </section>
    </Reveal>
  );
}
