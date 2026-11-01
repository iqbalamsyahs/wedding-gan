"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import Typography from "@/components/atoms/Typography";
import Reveal from "@/components/atoms/Reveal";
import { useGsap, inkMask } from "@/lib/useGsap";

export default function WeddingGift() {
  const rootRef = useRef<HTMLElement>(null);

  useGsap(rootRef, (root) => {
    const trigger = { trigger: root, start: "top 75%", once: true };

    // Judul terbuka dari bawah, paragraf masuk bertahap dengan blur
    gsap.fromTo(
      root.querySelector("h2"),
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(-20% -10% -20% -10%)", duration: 1.2, ease: "power3.out", scrollTrigger: trigger },
    );
    gsap.from(root.querySelectorAll("p"), {
      y: 18,
      autoAlpha: 0,
      filter: "blur(6px)",
      stagger: 0.2,
      duration: 1.1,
      ease: "power2.out",
      scrollTrigger: trigger,
    });

    // Rekening terbuka dengan gradasi sambil sedikit mengecil dari zoom
    const rekening = root.querySelector(".gift-rekening");
    gsap.fromTo(
      rekening,
      { ...inkMask, maskPosition: "100% 0%", scale: 1.06 },
      {
        maskPosition: "0% 0%",
        scale: 1,
        duration: 1.8,
        ease: "power2.inOut",
        scrollTrigger: { trigger: rekening, start: "top 85%", once: true },
      },
    );
  });

  return (
    <section
      ref={rootRef}
      id="wedding-gift"
      className="relative flex w-full flex-col items-center gap-6 px-10 py-10 sm:px-6 sm:py-24 lg:px-16 lg:py-32 xl:px-24"
    >
      <Reveal variant="blur" className="flex w-full flex-col items-center gap-6">
        <Typography
          variant="body-bold"
          as="h2"
          className="text-[36px] text-burgundy tracking-[-0.02em] lg:text-[52px]"
        >
          Wedding Gift
        </Typography>

        <Typography
          variant="body-bold"
          className="max-w-[340px] text-center text-[14px] leading-5.75 text-olive-dark tracking-[-0.02em] lg:max-w-[540px] lg:text-[18px]"
        >
          Lorem ipsum dolor sit amet consectetur. Et varius pharetra leo nibh non
          natoque sed. Feugiat tincidunt ornare amet imperdiet ultricies nullam.
          Quis purus vitae eu maecenas non dolor.
        </Typography>
      </Reveal>

      <Reveal variant="blur" className="mt-4 flex w-full justify-center" delay={150}>
        <img
          src="/assets/rekening.svg"
          alt="Rekening Wedding Gift"
          className="gift-rekening w-full max-w-75 h-auto lg:max-w-100"
        />
      </Reveal>

      <Reveal variant="blur" className="flex w-full justify-center" delay={300}>
        <Typography
          variant="body-bold"
          className="max-w-[340px] text-center text-[14px] leading-5.75 text-olive-dark tracking-[-0.02em] lg:max-w-[540px] lg:text-[18px]"
        >
          Lorem ipsum dolor sit amet consectetur. Et varius pharetra leo nibh non
          natoque sed. Feugiat tincidunt ornare amet imperdiet ultricies nullam.
          Quis purus vitae eu maecenas non dolor.
        </Typography>
      </Reveal>
    </section>
  );
}
