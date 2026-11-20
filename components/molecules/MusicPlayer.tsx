"use client";

import { useEffect, useRef, useState } from "react";
import { MusicNotes } from "@/components/atoms/Ornaments";

// Dikirim Cover saat "Buka Undangan" diklik. play() dipanggil di dalam klik itu
// (dispatchEvent sinkron), jadi browser mengizinkan audio berbunyi.
export const OPEN_EVENT = "invitation-open";

export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [shown, setShown] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setShown(true);
      audio.current?.play().catch(() => {});
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <>
      <audio
        ref={audio}
        src="/music/kasih-putih.mp3"
        loop
        preload="none"
        // data-music di <html> menggerakkan not balok di seluruh halaman (globals.css .note)
        onPlay={() => {
          setPlaying(true);
          document.documentElement.dataset.music = "on";
        }}
        onPause={() => {
          setPlaying(false);
          delete document.documentElement.dataset.music;
        }}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Jeda musik" : "Putar musik"}
        aria-pressed={playing}
        className={`fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-[0_6px_18px_rgba(40,30,20,0.35)] transition-[opacity,transform] duration-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive-dark lg:bottom-8 lg:right-8 lg:h-16 lg:w-16 ${
          shown ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Piringan: alur halus + label burgundy; berhenti di posisinya saat dijeda */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,#1d1a18_0_1.5px,#2b2724_1.5px_3px)] animate-[spin_4s_linear_infinite] motion-reduce:animate-none ${
            playing ? "" : "[animation-play-state:paused]"
          }`}
        >
          <span className="absolute inset-[30%] rounded-full bg-burgundy">
            <span className="absolute left-1/2 top-[18%] h-[22%] w-[6%] -translate-x-1/2 rounded-full bg-cream/70" />
            <span className="absolute inset-[42%] rounded-full bg-cream" />
          </span>
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_45%)]" />
        </span>

        <MusicNotes className="left-1/2 top-1" />

        {/* Ikon play saat dijeda */}
        {!playing && (
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center rounded-full bg-black/35">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-cream">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        )}
      </button>
    </>
  );
}
