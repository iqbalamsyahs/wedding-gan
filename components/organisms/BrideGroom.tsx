"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import Typography from "@/components/atoms/Typography";
import CoupleProfile from "@/components/molecules/CoupleProfile";
import Reveal from "@/components/atoms/Reveal";
import { Butterfly, Flock } from "@/components/atoms/Ornaments";
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

      <Butterfly tint="sage" delay={-3} className="right-[10%] top-12 w-9 lg:right-[25%] lg:top-24 lg:w-14" />
      <Butterfly tint="rose" delay={-7} className="left-[9%] top-[46%] w-9 lg:left-[5%] lg:top-[30%] lg:w-12" />

      <div className="relative flex w-full flex-col items-center gap-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12 xl:gap-20">
      <CoupleProfile
        image="/assets/bride_groom/hani.svg"
        name="Hanifah Sartika Julianti"
        parents="Putri pertama dari Bapak Entang Kustandi dan Ibu Diah Rodiah"
        align="start"
        className="bg-profile-start lg:flex-col"
        notesClassName="left-[78%] top-[12%]"
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
        parents="Putra kedua dari Bapak Jaja dan Ibu Entin"
        align="end"
        className="bg-profile-end mb-15 flex-row-reverse lg:mb-0 lg:flex-col"
        notesClassName="left-[86%] top-[9%]"
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
