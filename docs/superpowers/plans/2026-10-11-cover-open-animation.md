# Cover Open Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Saat tombol "Buka Undangan" ditekan, bagian atas dan bawah sampul bergeser keluar, foto mempelai muncul dengan scale-in, lalu halaman otomatis scroll ke section Bride & Groom.

**Architecture:** Bagian sampul dipindah ke komponen client `Cover.tsx` yang menyimpan state `opened`. Animasi dikerjakan CSS: kelas `is-open` di section memicu transisi pada bagian atas, bawah, dan foto. Scroll dijalankan setelah jeda singkat lewat `setTimeout` yang dibersihkan saat unmount. Tidak ada library baru.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript.

**Spec:** Tidak ada file spec. Persyaratan ada di Goal di atas, dari permintaan 2026-10-11. `docs/PRD.md` tidak mencakup animasi.

## Global Constraints

- Tidak menambah dependency. Animasi memakai CSS dan React state saja.
- Menghormati `prefers-reduced-motion`: transisi dimatikan dan scroll bersifat instan.
- Tidak mengubah isi teks, gambar, atau posisi elemen sampul saat sampul belum dibuka.
- Bahasa antarmuka tetap Indonesia.

## Review Focus

1. Klik tombol dua kali dengan cepat tidak memicu dua kali scroll atau dua kali timer. Ditangani oleh guard `if (opened) return`.
2. Komponen di-unmount sebelum timer selesai tidak memicu scroll. Ditangani oleh `clearTimeout` di cleanup.
3. Pengguna reduced motion tidak melihat transisi dan tidak menunggu jeda. Ditangani oleh cek `matchMedia` dan aturan CSS.
4. Tombol bisa diaktifkan lewat keyboard (Enter dan Space). Ini tombol native, jadi diverifikasi manual.
5. Di lebar 390px, pergeseran `translateY` tidak memunculkan scroll horizontal.

## Keputusan yang Perlu Dikonfirmasi

Plan ini memakai tafsir literal: foto tersembunyi sebelum sampul dibuka, lalu scale-in saat dibuka. Kalau foto harus tampak sejak awal, cukup hapus aturan opacity awal di Task 2 dan animasi hanya berupa scale dari 0.8 ke 1 tanpa fade.

---

### Task 1: Pindahkan bagian sampul ke `Cover.tsx` (client)

**Files:**
- Create: `components/organisms/Cover.tsx`
- Modify: `components/organisms/WeddingInvitation.tsx:1-12` (imports) dan `:19-60` (blok section cover)

**Interfaces:**
- Consumes: `HeaderSubtitle`, `CoupleNames`, `GuestAddress`, `PhotoFrame`, `Button` (props `onClick?: () => void`, `className?: string`).
- Produces: `default function Cover(): JSX.Element` (tanpa props). Dipakai oleh `WeddingInvitation`.

- [ ] **Step 1: Buat `Cover.tsx` dengan state dan handler**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import HeaderSubtitle from "@/components/molecules/HeaderSubtitle";
import CoupleNames from "@/components/molecules/CoupleNames";
import GuestAddress from "@/components/molecules/GuestAddress";
import PhotoFrame from "@/components/atoms/PhotoFrame";
import Button from "@/components/atoms/Button";

export default function Cover() {
  const [opened, setOpened] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(
      () => {
        document
          .getElementById("bride-groom")
          ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      },
      reduce ? 0 : 900,
    );
  };

  return (
    <section
      id="cover"
      className={`cover relative flex min-h-dvh w-full flex-col justify-between px-15 sm:px-6 md:px-10 lg:px-24 xl:px-36 ${opened ? "is-open" : ""}`}
    >
      <div className="cover-top relative flex w-full flex-col px-4 pt-14 sm:px-6 sm:pt-20 md:pt-16 lg:pt-20">
        <HeaderSubtitle />

        <div className="relative">
          <CoupleNames />
        </div>
      </div>

      <div className="cover-photo relative flex w-full flex-1 flex-col items-center justify-center px-4">
        <PhotoFrame />
      </div>

      <div className="cover-bottom relative mb-25 flex flex-col items-center gap-4 px-4 sm:mb-35 sm:gap-6 md:mb-24 lg:mb-28">
        <GuestAddress />

        <Button onClick={handleOpen} />
      </div>

      <div className="absolute bottom-10 right-0 sm:bottom-10 sm:right-5 lg:right-12 xl:right-24">
        <img
          src="/assets/cover/leafs.svg"
          alt=""
          aria-hidden="true"
          className="h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Ganti blok cover di `WeddingInvitation.tsx` dengan `<Cover />`**

Hapus import `HeaderSubtitle`, `CoupleNames`, `GuestAddress`, `PhotoFrame`, dan `Button` dari `WeddingInvitation.tsx`. Tambah import `Cover`. Ganti seluruh blok `<section id="cover" ...>...</section>` dengan:

```tsx
      <Cover />
```

Biarkan `Decoration`, `BackgroundLayers`, dan import lain tetap seperti semula. `Decoration` memang sudah tidak terpakai di file ini, tapi itu di luar scope.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: keluar tanpa error.

- [ ] **Step 4: Cek tampilan tidak berubah**

Buka `http://localhost:9000` dan bandingkan sampul dengan sebelum perubahan. Tombol belum melakukan apa-apa, dan sampul tampak sama persis.
Expected: tidak ada perbedaan visual.

---

### Task 2: Tambahkan CSS untuk keadaan terbuka

**Files:**
- Modify: `app/globals.css` (tambahkan setelah blok `.reveal`)

**Interfaces:**
- Consumes: kelas `cover`, `is-open`, `cover-top`, `cover-photo`, `cover-bottom` dari Task 1.
- Produces: tidak ada API baru.

- [ ] **Step 1: Tambahkan aturan CSS**

Tambahkan di akhir `app/globals.css`:

```css
.cover-top,
.cover-bottom {
  transition:
    transform 0.9s ease-in-out,
    opacity 0.9s ease-in-out;
}

.cover-photo > * {
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.cover.is-open .cover-top {
  transform: translateY(-100%);
  opacity: 0;
}

.cover.is-open .cover-bottom {
  transform: translateY(100%);
  opacity: 0;
}

.cover.is-open .cover-photo > * {
  opacity: 1;
  transform: none;
  transition-delay: 0.4s;
}

@media (prefers-reduced-motion: reduce) {
  .cover-top,
  .cover-bottom,
  .cover-photo > * {
    transition: none;
  }

  .cover-photo > * {
    opacity: 1;
    transform: none;
  }

  .cover.is-open .cover-top,
  .cover.is-open .cover-bottom {
    opacity: 0;
  }
}
```

- [ ] **Step 2: Verifikasi CSS terkirim**

Run: `curl -s http://localhost:9000/ -o /dev/null -w "%{http_code}\n"` lalu cari aturan `.cover.is-open` di stylesheet yang dimuat halaman.
Expected: kode 200, dan aturan `.cover.is-open` ada di CSS.

- [ ] **Step 3: Cek manual keadaan sebelum klik**

Buka `http://localhost:9000`. Sebelum tombol ditekan, foto belum tampil, sedangkan nama dan tombol tampil seperti biasa.
Expected: foto tidak terlihat, teks dan tombol terlihat.

---

### Task 3: Hubungkan tombol ke animasi dan scroll

Task ini sudah tercakup oleh kode `handleOpen` di Task 1. Tidak ada perubahan file baru. Bagian ini adalah verifikasi.

**Files:** tidak ada perubahan.

- [ ] **Step 1: Type-check ulang**

Run: `npx tsc --noEmit`
Expected: keluar tanpa error.

- [ ] **Step 2: Klik tombol di browser**

Klik "Buka Undangan" di `http://localhost:9000`.
Expected: bagian atas dan bawah sampul bergeser keluar dalam sekitar 0,9 detik, foto muncul dengan scale-in setelah 0,4 detik, lalu halaman turun ke Bride & Groom.

- [ ] **Step 3: Klik dua kali dengan cepat**

Klik tombol dua kali berturut-turut.
Expected: scroll hanya terjadi sekali, dan animasi tidak berulang.

---

### Task 4: Verifikasi

**Files:** tidak ada perubahan.

- [ ] **Step 1: Build produksi**

Run: `npm run build`
Expected: build berhasil tanpa error.

- [ ] **Step 2: Cek ukuran layar**

Buka halaman di lebar 390px (ponsel) dan 1280px (desktop). Buka DevTools, pilih responsive mode.
Expected: tidak ada scroll horizontal di kedua ukuran, dan animasi berjalan di keduanya.

- [ ] **Step 3: Cek reduced motion**

Aktifkan "Animation effects" off di Windows atau emulasi `prefers-reduced-motion: reduce` di DevTools, lalu klik tombol.
Expected: tidak ada transisi, halaman langsung scroll ke Bride & Groom, dan foto langsung tampil.

- [ ] **Step 4: Cek keyboard**

Fokus tombol dengan Tab, lalu tekan Enter dan Space.
Expected: keduanya memicu animasi yang sama.

- [ ] **Step 5: Cek unmount**

Klik tombol, lalu pindah dari halaman (atau hot reload saat animasi berjalan) sebelum 0,9 detik.
Expected: tidak ada error di konsol.

- [ ] **Step 6: Commit (hanya jika diminta)**

Commit hanya dilakukan jika pengguna memintanya. Pesan commit yang disarankan: `feat: animate cover opening with curtain and photo scale-in`.
