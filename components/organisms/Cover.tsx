"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeaderSubtitle from "@/components/molecules/HeaderSubtitle";
import CoupleNames from "@/components/molecules/CoupleNames";
import GuestAddress from "@/components/molecules/GuestAddress";
import PhotoFrame from "@/components/atoms/PhotoFrame";
import Button from "@/components/atoms/Button";
import { useGsap } from "@/lib/useGsap";

// Lingkaran dengan tepi berbulu; --r (persen) menentukan seberapa besar area yang terlihat
const FEATHER_MASK =
  "radial-gradient(circle closest-side at 50% 50%, #000 calc(var(--r) * 1%), transparent calc(var(--r) * 1% + 16%))";

export default function Cover() {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const openTl = useRef<gsap.core.Timeline | null>(null);

  // Saat refresh, browser biasanya mengembalikan posisi scroll; paksa mulai dari sampul
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Posisi ScrollTrigger dihitung saat sampul masih menutupi halaman; setelah sampul hilang, hitung ulang
  useEffect(() => {
    if (gone) ScrollTrigger.refresh();
  }, [gone]);

  // Halaman tidak bisa di-scroll selama sampul masih tampil
  useEffect(() => {
    if (gone) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone]);

  useGsap(rootRef, (root) => {
    // Intro: setiap huruf nama masuk bertahap dengan blur ke jelas
    gsap.from(root.querySelectorAll(".split-char"), {
      autoAlpha: 0,
      y: 24,
      filter: "blur(10px)",
      stagger: 0.07,
      duration: 1.2,
      ease: "power3.out",
    });

    // Foto terbuka dari pusat: tepi mask berbulu, foto turun dari zoom dan blur
    const mask = root.querySelector<HTMLElement>(".cover-photo-mask");
    const photo = root.querySelector(".cover-photo-img");
    const ring = root.querySelector(".cover-ring");
    if (mask) gsap.set(mask, { maskImage: FEATHER_MASK, "--r": 0 });

    gsap.to(mask, { "--r": 110, duration: 2, ease: "power3.inOut", delay: 0.3 });
    gsap.fromTo(
      photo,
      { scale: 1.3, filter: "blur(8px)" },
      { scale: 1, filter: "blur(0px)", duration: 2.4, ease: "power3.out", delay: 0.3 },
    );
    // Pita atas (potongan foto) mengikuti zoom dan blur foto utuh, lalu naik masuk
    gsap.fromTo(
      root.querySelector(".cover-strip-img"),
      { scale: 1.3, filter: "blur(8px)" },
      { scale: 1, filter: "blur(0px)", duration: 2.4, ease: "power3.out", delay: 0.3 },
    );
    gsap.fromTo(
      root.querySelector(".cover-photo-strip"),
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.6, ease: "power3.out", delay: 0.8 },
    );

    gsap.from(ring, {
      rotate: -50,
      scale: 0.9,
      autoAlpha: 0,
      duration: 1.6,
      ease: "power3.out",
      delay: 0.9,
    });

    // Buka undangan: sampul terbelah ke atas dan bawah, foto menyusut ke pusat
    openTl.current = gsap
      .timeline({ paused: true, onComplete: () => setGone(true) })
      .to(root.querySelector(".cover-top"), {
        yPercent: -100,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.inOut",
      }, 0)
      .to(root.querySelector(".cover-bottom"), {
        yPercent: 100,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.inOut",
      }, 0)
      .to(root.querySelector(".cover-photo-mask"), {
        "--r": 0,
        duration: 0.9,
        ease: "power2.in",
      }, 0.1)
      .to(root.querySelector(".cover-photo-strip"), {
        y: -40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.in",
      }, 0.1)
      .to(root.querySelector(".cover-ring"), {
        rotate: 40,
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power2.in",
      }, 0)
      .to(root.querySelector(".cover-photo"), {
        scale: 1.1,
        autoAlpha: 0,
        duration: 1,
      }, 0);
  });

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    // Reduced motion: tidak ada timeline, sampul langsung dihapus
    if (openTl.current) openTl.current.play();
    else setGone(true);
  };

  // Setelah animasi selesai, sampul dihapus dari DOM supaya BrideGroom jadi bagian paling atas
  if (gone) return null;

  return (
    <section
      ref={rootRef}
      id="cover"
      className="cover relative flex min-h-dvh w-full flex-col justify-between overflow-x-clip px-15 sm:px-6 md:px-10 lg:grid lg:grid-cols-2 lg:items-center lg:px-24 xl:px-36"
    >
      <div className="cover-top relative flex w-full flex-col px-4 pt-14 sm:px-6 sm:pt-20 md:pt-16 lg:col-start-1 lg:row-start-1 lg:pt-20">
        <HeaderSubtitle />

        <div className="relative">
          <CoupleNames />
        </div>
      </div>

      <div className="cover-photo relative flex w-full flex-1 flex-col items-center justify-center px-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <PhotoFrame />
      </div>

      <div className="cover-bottom relative mb-25 flex flex-col items-center gap-4 px-4 sm:mb-35 sm:gap-6 md:mb-24 lg:col-start-1 lg:row-start-2 lg:mb-28">
        <GuestAddress />

        <Button onClick={handleOpen} />
      </div>

      <div className="absolute bottom-10 right-0 sm:bottom-10 sm:right-5 lg:right-12 xl:right-24">
        <img
          src="/assets/cover/leafs.svg"
          alt=""
          aria-hidden="true"
          className="float h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
        />
      </div>
    </section>
  );
}
