"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Typography from "@/components/atoms/Typography";
import Reveal from "@/components/atoms/Reveal";
import { useGsap, inkMask } from "@/lib/useGsap";

interface WishItem {
  id: string;
  name: string;
  wish: string;
}

const INITIAL_WISHES: WishItem[] = [
  {
    id: "1",
    name: "Nama Tamu",
    wish: "Lorem Ipsum",
  },
  {
    id: "2",
    name: "Nama Tamu",
    wish: "Lorem Ipsum",
  },
  {
    id: "3",
    name: "Nama Tamu",
    wish: "Lorem Ipsum",
  },
];

export default function Wishes() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [wishesList, setWishesList] = useState<WishItem[]>(INITIAL_WISHES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const prevCount = useRef(wishesList.length);

  useGsap(rootRef, (root) => {
    const trigger = { trigger: root, start: "top 75%", once: true };

    gsap.fromTo(
      root.querySelector("h2"),
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(-20% -10% -20% -10%)", duration: 1.2, ease: "power3.out", scrollTrigger: trigger },
    );
    gsap.from(root.querySelectorAll("form > *"), {
      x: -28,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: trigger,
    });
    gsap.from(root.querySelectorAll(".wish-list > *"), {
      x: 40,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: trigger,
    });
    gsap.fromTo(
      root.querySelector(".wish-art"),
      { ...inkMask, maskPosition: "100% 0%" },
      { maskPosition: "0% 0%", duration: 1.8, ease: "power2.inOut", scrollTrigger: trigger },
    );

    // Tombol kirim mengecil saat ditekan dan memantul kembali saat dilepas
    const submit = root.querySelector<HTMLElement>("form button");
    if (submit) {
      submit.addEventListener("pointerdown", () => gsap.to(submit, { scale: 0.96, duration: 0.12 }));
      submit.addEventListener("pointerup", () => gsap.to(submit, { scale: 1, duration: 0.4, ease: "back.out(3)" }));
      submit.addEventListener("pointerleave", () => gsap.to(submit, { scale: 1, duration: 0.3 }));
    }
  });

  // Ucapan baru masuk dengan blur ke jelas dan naik sedikit
  useLayoutEffect(() => {
    if (wishesList.length > prevCount.current && listRef.current) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const item = listRef.current.firstElementChild;
      if (item && !reduce) {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: -18, filter: "blur(6px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
        );
      }
    }
    prevCount.current = wishesList.length;
  }, [wishesList.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;

    const newWishItem: WishItem = {
      id: Date.now().toString(),
      name: name.trim(),
      wish: wish.trim(),
    };

    setIsSubmitting(true);

    try {
      const endpoint = process.env.NEXT_PUBLIC_SHEET_API_URL;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), wish: wish.trim() }),
          mode: "no-cors",
        });
      }
    } catch {
      // Fallback silently if API fails
    } finally {
      setWishesList((prev) => [newWishItem, ...prev]);
      setName("");
      setWish("");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={rootRef}
      id="wishes"
      className="relative flex w-full flex-col items-center gap-8 px-6 py-16 sm:px-10 sm:py-24 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-8 lg:px-16 lg:py-32 xl:px-24"
    >
      <Reveal variant="blur" className="flex w-full flex-col items-center gap-8 lg:col-span-2">
      <div className="flex flex-col items-center gap-4 text-center">
        <Typography
          variant="body-bold"
          as="h2"
          className="text-[36px] text-burgundy tracking-[-0.02em] lg:text-[52px]"
        >
          Wishes
        </Typography>

        <Typography
          variant="body-bold"
          className="max-w-[340px] text-center text-[14px] leading-5.75 text-olive-dark tracking-[-0.02em] lg:max-w-[540px] lg:text-[18px]"
        >
          Lorem ipsum dolor sit amet consectetur. Et varius pharetra leo nibh non
          natoque sed. Feugiat tincidunt ornare amet imperdiet ultricies nullam.
          Quis purus vitae eu maecenas non dolor.
        </Typography>
      </div>
      </Reveal>

      <Reveal variant="blur" className="flex w-full justify-center" delay={150}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[340px] flex-col gap-4 sm:max-w-[420px] lg:max-w-[500px]"
      >
        <input
          type="text"
          placeholder="Nama Tamu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-[14px] border border-olive-dark/60 bg-transparent px-5 py-3.5 font-body text-[15px] text-olive-dark placeholder:text-olive-dark/60 focus:border-olive-dark focus:outline-none lg:text-[17px]"
        />

        <textarea
          placeholder="Kata Ucapan"
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          rows={4}
          required
          className="w-full resize-none rounded-[14px] border border-olive-dark/60 bg-transparent px-5 py-3.5 font-body text-[15px] text-olive-dark placeholder:text-olive-dark/60 focus:border-olive-dark focus:outline-none lg:text-[17px]"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-button bg-olive-dark py-3 px-6 text-[#f5f1e8] transition-colors hover:bg-olive-dark/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive-dark disabled:opacity-50"
        >
          <svg
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
          <span className="font-body text-[18px] font-bold tracking-[-0.02em] lg:text-[22px]">
            {isSubmitting ? "Sending..." : "Kirim Ucapan"}
          </span>
        </button>
      </form>
      </Reveal>

      <Reveal variant="blur" className="flex w-full justify-center" delay={300}>
      <div ref={listRef} className="wish-list flex w-full max-w-[340px] flex-col gap-3.5 sm:max-w-[420px] lg:max-w-[500px]">
        {wishesList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-1 rounded-[14px] border border-olive-dark/60 bg-transparent px-5 py-3.5 text-olive-dark"
          >
            <span className="font-body text-[15px] font-bold lg:text-[17px]">
              {item.name}
            </span>
            <p className="font-body text-[14px] leading-relaxed text-olive-dark/80 lg:text-[16px]">
              {item.wish}
            </p>
          </div>
        ))}
      </div>
      </Reveal>

      <Reveal variant="blur" className="mt-6 flex w-full justify-center lg:col-span-2" delay={450}>
      <img
        src="/assets/gan-hani.svg"
        alt="Gan & Hani"
        className="wish-art h-auto w-full max-w-[203px] lg:max-w-[280px]"
      />
      </Reveal>
    </section>
  );
}
