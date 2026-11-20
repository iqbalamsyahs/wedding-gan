"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Typography from "@/components/atoms/Typography";
import Reveal from "@/components/atoms/Reveal";
import { Butterfly, MusicNotes, PAPER_PLANE_SVG } from "@/components/atoms/Ornaments";
import { useGsap, inkMask } from "@/lib/useGsap";

type Attendance = "hadir" | "berhalangan" | "ragu";

// Label + warna pill per status kehadiran
const ATTENDANCE: Record<Attendance, { label: string; pill: string }> = {
  hadir: { label: "Hadir", pill: "bg-olive/15 text-olive-dark" },
  berhalangan: { label: "Berhalangan Hadir", pill: "bg-warm-gray/12 text-warm-gray" },
  ragu: { label: "Masih Ragu", pill: "bg-burgundy/10 text-burgundy" },
};

interface WishItem {
  id: string;
  name: string;
  wish: string;
  attendance: Attendance;
  createdAt: number;
}

const MIN = 60_000;

// Apps Script di Google Sheet "Konfirmasi Tamu": GET = daftar ucapan, POST = simpan ucapan
const SHEET_API = process.env.NEXT_PUBLIC_SHEET_API_URL;

// Sheet menyimpan label ("Berhalangan Hadir"); ubah balik ke key, label tak dikenal dianggap ragu
const attendanceFromLabel = (label: string): Attendance =>
  (Object.keys(ATTENDANCE) as Attendance[]).find((k) => ATTENDANCE[k].label === label) ?? "ragu";

const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });

// "Baru saja", "10 menit yang lalu", "kemarin", "3 hari yang lalu"
function timeAgo(ts: number, now: number) {
  const s = Math.round((ts - now) / 1000);
  if (s > -60) return "Baru saja";
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", Infinity],
  ];
  for (let i = 0; i < steps.length - 1; i++) {
    const [unit, size] = steps[i];
    if (-s < steps[i + 1][1]) {
      const text = rtf.format(Math.round(s / size), unit);
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  }
  return rtf.format(Math.round(s / 31536000), "year");
}

const PER_PAGE = 5;

// Ucapan terlipat jadi pesawat kertas: terbang melengkung dari tombol kirim ke atas daftar ucapan.
// Resolve saat mendarat, supaya kartu baru muncul tepat setelahnya. Langsung resolve bila reduced motion.
function flyPaperPlane(from: Element | null, to: Element | null): Promise<void> {
  if (!from || !to || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();

  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const size = 50;
  const sx = a.left + a.width / 2 - size / 2;
  const sy = a.top + a.height / 2 - size / 2;
  const ex = b.left + b.width / 2 - size / 2;
  const ey = b.top + 8;
  // Titik kendali di atas kedua ujung: pesawat naik dulu, lalu menukik ke daftar
  const cx = (sx + ex) / 2 + 90;
  const cy = Math.min(sy, ey) - 170;

  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = `position:fixed;left:0;top:0;width:${size}px;z-index:60;pointer-events:none`;
  el.innerHTML = PAPER_PLANE_SVG;
  document.body.appendChild(el);

  return new Promise((resolve) => {
    const p = { t: 0 };
    gsap.to(p, {
      t: 1,
      duration: 1.35,
      ease: "power1.inOut",
      onUpdate() {
        const t = p.t;
        const u = 1 - t;
        const x = u * u * sx + 2 * u * t * cx + t * t * ex;
        const y = u * u * sy + 2 * u * t * cy + t * t * ey;
        const dx = 2 * u * (cx - sx) + 2 * t * (ex - cx);
        const dy = 2 * u * (cy - sy) + 2 * t * (ey - cy);
        gsap.set(el, {
          x,
          y,
          rotate: (Math.atan2(dy, dx) * 180) / Math.PI,
          scale: 1 - 0.35 * t,
          opacity: t > 0.85 ? (1 - t) / 0.15 : 1,
        });
      },
      onComplete() {
        el.remove();
        resolve();
      },
    });
  });
}

export default function Wishes() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [wishesList, setWishesList] = useState<WishItem[]>([]);
  const [loaded, setLoaded] = useState(!SHEET_API);
  // Waktu relatif baru dirender di klien (hindari beda HTML server vs klien), diperbarui tiap menit
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), MIN);
    return () => clearInterval(id);
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const prevCount = useRef(wishesList.length);
  const pageDir = useRef(0); // 1 = berikutnya, -1 = sebelumnya, 0 = tanpa animasi pindah halaman

  // Ambil ucapan dari Sheet (terbaru di atas). Ucapan yang baru dikirim sebelum data datang tetap di atas.
  useEffect(() => {
    if (!SHEET_API) return;
    fetch(SHEET_API)
      .then((r) => r.json())
      .then((rows: (Omit<WishItem, "attendance"> & { attendance: string })[]) => {
        const fetched = rows.map((r) => ({
          ...r,
          name: String(r.name),
          wish: String(r.wish),
          attendance: attendanceFromLabel(r.attendance),
        }));
        prevCount.current = Infinity; // data awal bukan "ucapan baru", jangan dianimasikan
        setWishesList((prev) => [...prev.filter((w) => w.id.startsWith("local-")), ...fetched]);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

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

  // Pindah halaman: kartu masuk dari arah tombol yang diklik, bertahap dengan blur
  useLayoutEffect(() => {
    const dir = pageDir.current;
    pageDir.current = 0;
    if (!dir || !listRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      listRef.current.children,
      { x: 40 * dir, autoAlpha: 0, filter: "blur(6px)" },
      { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out", stagger: 0.06, overwrite: true },
    );
  }, [page]);

  const goToPage = (next: number) => {
    pageDir.current = next > page ? 1 : -1;
    setPage(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim() || !attendance) return;

    const newWishItem: WishItem = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      wish: wish.trim(),
      attendance,
      createdAt: Date.now(),
    };

    setIsSubmitting(true);
    const landed = flyPaperPlane(
      (e.currentTarget as HTMLFormElement).querySelector('button[type="submit"]'),
      listRef.current,
    );

    try {
      if (SHEET_API) {
        // text/plain + no-cors: request "sederhana" tanpa preflight; Apps Script tetap membaca body JSON-nya
        await fetch(SHEET_API, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify({
            name: newWishItem.name,
            wish: newWishItem.wish,
            attendance: ATTENDANCE[attendance].label,
          }),
          mode: "no-cors",
        });
      }
    } catch {
      // Fallback silently if API fails
    } finally {
      await landed;
      setWishesList((prev) => [newWishItem, ...prev]);
      setPage(0); // ucapan baru tampil di halaman pertama
      setName("");
      setWish("");
      setAttendance("");
      setIsSubmitting(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(wishesList.length / PER_PAGE));
  const pageWishes = wishesList.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const pageBtn =
    "rounded-button border border-olive-dark/60 px-4 py-1.5 font-body text-[14px] font-bold text-olive-dark transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark disabled:opacity-30 lg:text-[16px]";

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
          Kirimkan doa dan ucapan terbaik Anda untuk kedua mempelai. Setiap doa
          yang Anda titipkan akan menjadi kenangan berharga bagi kami.
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

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 font-body text-[15px] font-bold text-olive-dark lg:text-[17px]">
            Konfirmasi Kehadiran
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(ATTENDANCE) as Attendance[]).map((key) => (
              <label
                key={key}
                className="flex cursor-pointer items-center justify-center rounded-[14px] border border-olive-dark/60 px-2 py-2.5 text-center font-body text-[13px] font-bold leading-tight text-olive-dark transition-colors has-checked:border-olive-dark has-checked:bg-olive-dark has-checked:text-[#f5f1e8] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-olive-dark lg:text-[15px]"
              >
                <input
                  type="radio"
                  name="attendance"
                  value={key}
                  checked={attendance === key}
                  onChange={() => setAttendance(key)}
                  required
                  className="sr-only"
                />
                {ATTENDANCE[key].label}
              </label>
            ))}
          </div>
        </fieldset>

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
            {isSubmitting ? "Mengirim…" : "Kirim Ucapan"}
          </span>
        </button>
      </form>
      </Reveal>

      <Reveal variant="blur" className="flex w-full flex-col items-center gap-4" delay={300}>
      <div ref={listRef} className="wish-list flex w-full max-w-[340px] flex-col gap-3.5 sm:max-w-[420px] lg:max-w-[500px]">
        {pageWishes.length === 0 && (
          <p className="py-6 text-center font-body text-[15px] text-warm-gray lg:text-[17px]">
            {loaded ? "Belum ada ucapan. Jadilah yang pertama mengirim doa." : "Memuat ucapan…"}
          </p>
        )}
        {pageWishes.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-3 rounded-[22px] border border-[#e3d6c4] bg-white/60 px-5 py-5 shadow-[0_4px_14px_rgba(120,90,60,0.08)] lg:px-7 lg:py-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-body text-[18px] font-bold leading-snug text-[#3f3631] lg:text-[22px]">
                {item.name}
              </h3>
              <span
                className={`shrink-0 rounded-full px-3 py-1 font-body text-[12px] font-bold lg:text-[14px] ${ATTENDANCE[item.attendance].pill}`}
              >
                {ATTENDANCE[item.attendance].label}
              </span>
            </div>
            <p className="font-body text-[15px] leading-relaxed text-[#6b625b] lg:text-[17px]">
              {item.wish}
            </p>
            {now !== null && (
              <time
                dateTime={new Date(item.createdAt).toISOString()}
                className="font-body text-[13px] text-warm-gray/80 lg:text-[14px]"
              >
                {timeAgo(item.createdAt, now)}
              </time>
            )}
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Halaman ucapan" className="flex items-center gap-4">
          <button type="button" className={pageBtn} disabled={page === 0} onClick={() => goToPage(page - 1)}>
            &larr; Sebelumnya
          </button>
          <span className="font-body text-[14px] text-olive-dark lg:text-[16px]" aria-live="polite">
            {page + 1} / {totalPages}
          </span>
          <button type="button" className={pageBtn} disabled={page === totalPages - 1} onClick={() => goToPage(page + 1)}>
            Berikutnya &rarr;
          </button>
        </nav>
      )}
      </Reveal>

      <Butterfly tint="sage" delay={-2} className="bottom-[19%] left-[14%] w-10 lg:bottom-[24%] lg:left-[33%] lg:w-14" />
      <Butterfly tint="rose" delay={-8} className="hidden lg:block right-[7%] top-[13%] w-12" />

      <Reveal variant="blur" className="mt-6 flex w-full justify-center lg:col-span-2" delay={450}>
      <div className="relative w-full max-w-[203px] lg:max-w-[280px]">
        <img
          src="/assets/gan-hani.svg"
          alt="Gan & Hani"
          className="wish-art h-auto w-full"
        />
        {/* Not balok dari headphone keduanya saat musik diputar */}
        <MusicNotes className="left-[12%] top-[9%]" />
        <MusicNotes className="left-[84%] top-[22%]" />
      </div>
      </Reveal>
    </section>
  );
}
