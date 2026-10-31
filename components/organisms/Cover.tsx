"use client";

import { useEffect, useRef, useState } from "react";
import HeaderSubtitle from "@/components/molecules/HeaderSubtitle";
import CoupleNames from "@/components/molecules/CoupleNames";
import GuestAddress from "@/components/molecules/GuestAddress";
import PhotoFrame from "@/components/atoms/PhotoFrame";
import Button from "@/components/atoms/Button";

export default function Cover() {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Saat refresh, browser biasanya mengembalikan posisi scroll; paksa mulai dari sampul
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Halaman tidak bisa di-scroll selama sampul masih tampil
  useEffect(() => {
    if (gone) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => setGone(true), reduce ? 0 : 950);
  };

  // Setelah animasi selesai, sampul dihapus dari DOM supaya BrideGroom jadi bagian paling atas
  if (gone) return null;

  return (
    <section
      id="cover"
      className={`cover relative flex min-h-dvh w-full flex-col justify-between overflow-x-clip px-15 sm:px-6 md:px-10 lg:grid lg:grid-cols-2 lg:items-center lg:px-24 xl:px-36 ${opened ? "is-open" : ""}`}
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
