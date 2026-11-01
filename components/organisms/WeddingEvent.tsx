"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import Typography from "@/components/atoms/Typography";
import Countdown from "@/components/molecules/Countdown";
import Reveal from "@/components/atoms/Reveal";
import { useGsap } from "@/lib/useGsap";

export default function WeddingEvent() {
  const rootRef = useRef<HTMLElement>(null);

  useGsap(rootRef, (root) => {
    const frame = root.querySelector(".event-frame");
    const frameTrigger = { trigger: frame, start: "top 85%", once: true };

    // Bingkai mengembang dari tengah dengan sudut membulat
    gsap.fromTo(
      frame,
      { clipPath: "inset(50% 50% 50% 50% round 24px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 24px)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: frameTrigger,
      },
    );

    // Tanggal terbuka baris demi baris dari bawah, lalu kalender berputar masuk
    gsap.fromTo(
      root.querySelectorAll(".event-date-line"),
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(-20% -10% -20% -10%)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.16,
        delay: 0.4,
        scrollTrigger: frameTrigger,
      },
    );

    gsap.from(root.querySelector(".event-calendar"), {
      rotate: -10,
      scale: 0.7,
      autoAlpha: 0,
      duration: 1.1,
      ease: "back.out(1.6)",
      delay: 0.5,
      scrollTrigger: frameTrigger,
    });

    gsap.from(root.querySelector(".event-desc"), {
      y: 18,
      autoAlpha: 0,
      filter: "blur(6px)",
      duration: 1.1,
      ease: "power2.out",
      delay: 0.8,
      scrollTrigger: frameTrigger,
    });

    // Kartu Akad dan Resepsi masuk dari dua sisi berlawanan
    const cardsTrigger = { trigger: root.querySelector(".event-cards"), start: "top 80%", once: true };
    gsap.from(root.querySelector(".event-card-akad"), {
      x: -70,
      rotate: -8,
      autoAlpha: 0,
      duration: 1.2,
      ease: "back.out(1.4)",
      scrollTrigger: cardsTrigger,
    });
    gsap.from(root.querySelector(".event-card-resepsi"), {
      x: 70,
      rotate: 8,
      autoAlpha: 0,
      duration: 1.2,
      ease: "back.out(1.4)",
      delay: 0.15,
      scrollTrigger: cardsTrigger,
    });

    // Lokasi: pinpoint jatuh dengan bounce, alamat dan tombol menyusul
    const placeTrigger = { trigger: root.querySelector(".event-place"), start: "top 85%", once: true };
    gsap.from(root.querySelector(".event-pin"), {
      y: -80,
      autoAlpha: 0,
      duration: 1.1,
      ease: "bounce.out",
      scrollTrigger: placeTrigger,
    });
    gsap.from(root.querySelector(".event-place"), {
      y: 18,
      autoAlpha: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
      scrollTrigger: placeTrigger,
    });
    gsap.from(root.querySelector(".event-cta"), {
      scale: 0.6,
      autoAlpha: 0,
      duration: 0.9,
      ease: "back.out(2)",
      delay: 0.9,
      scrollTrigger: placeTrigger,
    });

    // Tombol lokasi mengikuti kursor dan mengecil saat ditekan (hanya perangkat dengan pointer)
    const cta = root.querySelector<HTMLElement>(".event-cta");
    if (cta && window.matchMedia("(pointer: fine)").matches) {
      const xTo = gsap.quickTo(cta, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(cta, "y", { duration: 0.6, ease: "power3" });

      cta.addEventListener("pointermove", (e) => {
        const r = cta.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.25);
      });
      cta.addEventListener("pointerleave", () => {
        xTo(0);
        yTo(0);
        gsap.to(cta, { scale: 1, duration: 0.3 });
      });
      cta.addEventListener("pointerdown", () => gsap.to(cta, { scale: 0.95, duration: 0.12 }));
      cta.addEventListener("pointerup", () => gsap.to(cta, { scale: 1, duration: 0.4, ease: "back.out(3)" }));
    }
  });

  return (
    <section
      ref={rootRef}
      id="wedding-event"
      className="relative flex w-full flex-col items-center gap-10 px-10 sm:px-6 py-16 sm:py-24 lg:px-16 lg:py-32 xl:px-24"
    >
      <Typography
        variant="body-bold"
        as="h2"
        className="text-[36px] text-burgundy tracking-[-0.02em] lg:text-[52px]"
      >
        Wedding Event
      </Typography>

      <Reveal className="flex w-full justify-center">
      <div className="relative w-full max-w-92.25 lg:aspect-378/345 lg:max-w-[560px] xl:max-w-[620px]">
        <div
          aria-hidden="true"
          className="event-frame absolute inset-x-0 top-[-19.4%] bottom-[-19.4%] bg-[url('/assets/weeding_event/rectangle-event.svg')] bg-[length:100%_100%] bg-no-repeat"
        />

        <div className="relative flex flex-col justify-center gap-6 px-5 lg:absolute lg:inset-0 lg:py-8 lg:pl-14 lg:pr-6 lg:gap-6">
          <div className="flex items-center justify-around">
            <div className="flex flex-col -space-y-4">
              <Typography
                variant="body-bold"
                className="event-date-line text-[34px] leading-none text-olive-dark tracking-[-0.02em] lg:text-[44px]"
              >
                29.
              </Typography>
              <Typography
                variant="body-bold"
                className="event-date-line text-[34px] leading-none text-olive-dark tracking-[-0.02em] lg:text-[44px]"
              >
                11.
              </Typography>
              <Typography
                variant="body-bold"
                className="event-date-line text-[34px] leading-none text-olive-dark tracking-[-0.02em] lg:text-[44px]"
              >
                2026
              </Typography>
            </div>

            <img
              src="/assets/weeding_event/calendar.svg"
              alt=""
              aria-hidden="true"
              className="event-calendar h-35 w-35.25 lg:h-44 lg:w-44"
            />
          </div>

          <Typography
            variant="body-bold"
            className="event-desc text-center text-[14px] text-olive-dark tracking-[-0.02em] lg:text-[18px]"
          >
            Lorem ipsum dolor sit amet consectetur. Et varius pharetra leo nibh
            non natoque sed. Feugiat tincidunt ornare amet imperdiet ultricies
            nullam.
          </Typography>
        </div>
      </div>
      </Reveal>

      <Reveal className="flex w-full justify-center" delay={150}>
        <Countdown />
      </Reveal>

      <Reveal className="flex w-full justify-center" delay={300}>
      <div className="event-cards flex w-full max-w-92.25 items-center justify-between lg:max-w-[560px] lg:gap-6 xl:max-w-[620px]">
        <div className="event-card-akad flex flex-col items-center gap-1">
          <img
            src="/assets/weeding_event/hani-event.svg"
            alt=""
            aria-hidden="true"
            className="h-35.5 w-27.5 lg:h-48 lg:w-36"
          />
          <Typography
            variant="body-bold"
            className="text-[36px] text-olive-dark tracking-[-0.02em] lg:text-[44px]"
          >
            Akad
          </Typography>
          <Typography
            variant="body-bold"
            className="text-[20px] text-burgundy tracking-[-0.02em] lg:text-[24px]"
          >
            09.00 - Selesai
          </Typography>
        </div>

        <div className="event-card-resepsi flex flex-col items-center gap-1">
          <img
            src="/assets/weeding_event/gan-event.svg"
            alt=""
            aria-hidden="true"
            className="h-35.5 w-27.5 lg:h-48 lg:w-36"
          />
          <Typography
            variant="body-bold"
            className="text-[36px] text-olive-dark tracking-[-0.02em] lg:text-[44px]"
          >
            Resepsi
          </Typography>
          <Typography
            variant="body-bold"
            className="text-[20px] text-burgundy tracking-[-0.02em] lg:text-[24px]"
          >
            11.00 - Selesai
          </Typography>
        </div>
      </div>
      </Reveal>

      <Reveal className="flex w-full justify-center" delay={450}>
      <div className="flex flex-col items-center gap-3">
        <img
          src="/assets/weeding_event/pinpoint.svg"
          alt=""
          aria-hidden="true"
          className="event-pin mt-1 h-7.25 w-4.75"
        />

        <Typography
          variant="body-bold"
          className="text-[24px] text-olive-dark tracking-[-0.02em]"
        >
          Tempat
        </Typography>

        <div className="event-place flex items-start gap-2">
<Typography
          variant="body-bold"
          className="max-w-75 text-center text-[14px] leading-5.75 text-olive-dark tracking-[-0.02em] lg:max-w-[420px] lg:text-[18px]"
        >
          Lorem ipsum dolor sit amet consectetur. Morbi in auctor tortor at
          sit donec cursus vitae. Nunc bibendum amet sit.
        </Typography>
        </div>

        <button className="event-cta flex items-center gap-4 rounded-button bg-olive-dark px-6 py-2 my-5 text-[#f5f1e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive-dark lg:px-8 lg:py-3">
          <img
            src="/assets/weeding_event/pinpoint-button.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 lg:h-7 lg:w-7"
          />
          <span className="font-body text-[20px] font-bold tracking-[-0.02em] lg:text-[24px]">
            Buka Lokasi
          </span>
        </button>
      </div>
      </Reveal>

      <img
        src="/assets/bride_groom/flower.svg"
        alt=""
        aria-hidden="true"
        className="h-12 w-auto lg:h-16"
      />
    </section>
  );
}
