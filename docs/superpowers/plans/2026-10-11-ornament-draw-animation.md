# Ornament Draw Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ornamen dekoratif utama ("tergambar" dari kiri ke kanan) saat section-nya masuk viewport: garis pemisah Bride & Groom dan bingkai acara Wedding Event.

**Architecture:** Aset SVG di `public/assets` berisi path terisi (`fill`), tanpa `stroke`, sehingga `stroke-dashoffset` tidak bisa dipakai tanpa menggambar ulang aset. Animasi memakai `clip-path: inset()` pada `<img>` yang sudah ada. Transisi hanya berjalan saat ancestor `.is-visible` (dipasang oleh `Reveal.tsx`). Tidak ada perubahan aset, tidak ada dependency baru, tidak ada perubahan markup selain menambahkan satu kelas.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript.

**Spec:** Tidak ada file spec. Persyaratan ada di Goal di atas, dari permintaan 2026-10-11. `docs/PRD.md` tidak mencakup animasi.

## Global Constraints

- Tidak menambah dependency. Animasi memakai CSS saja.
- Tidak mengubah file aset di `public/assets`.
- Menghormati `prefers-reduced-motion`: clip-path langsung terbuka tanpa transisi.
- Bahasa antarmuka tetap Indonesia.

## Review Focus

1. Pengguna reduced motion melihat ornamen langsung utuh, tanpa transisi.
2. Ornamen tidak terlihat sebagian selamanya kalau `Reveal` belum terpicu (misalnya scroll sangat cepat melewati section). Ditangani oleh `Reveal` yang sudah ada, dengan threshold 0.15.
3. Di lebar 390px, `line.svg` yang `w-screen` tidak memunculkan scroll horizontal.
4. Bingkai acara tidak menutupi teks saat animasi berjalan. Ornamen hanya di-clip, tidak berpindah posisi.

---

### Task 1: Tambahkan kelas `draw-in` di CSS

**Files:**
- Modify: `app/globals.css` (tambahkan di akhir file)

**Interfaces:**
- Consumes: kelas `is-visible` yang dipasang `components/atoms/Reveal.tsx` pada ancestor.
- Produces: kelas `draw-in`, dipakai oleh Task 2 pada `<img>`.

- [ ] **Step 1: Tambahkan aturan CSS**

Tambahkan di akhir `app/globals.css`:

```css
.draw-in {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.6s ease-in-out 0.3s;
}

.is-visible .draw-in {
  clip-path: inset(0 0 0 0);
}

@media (prefers-reduced-motion: reduce) {
  .draw-in,
  .is-visible .draw-in {
    clip-path: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Verifikasi CSS terkirim**

Run: `curl -s -m 60 http://localhost:9000/ -o /tmp/p.html` lalu ambil URL CSS dari `/tmp/p.html` dan cari `draw-in`.
Expected: aturan `.draw-in` dan `.is-visible .draw-in` ada di CSS.

---

### Task 2: Pasang kelas `draw-in` pada dua ornamen

**Files:**
- Modify: `components/organisms/BrideGroom.tsx` (img `line.svg`)
- Modify: `components/organisms/WeddingEvent.tsx` (img `rectangle-event.svg`)

**Interfaces:**
- Consumes: kelas `draw-in` dari Task 1.
- Produces: tidak ada.

- [ ] **Step 1: Tambahkan kelas ke `line.svg` di BrideGroom**

Di `components/organisms/BrideGroom.tsx`, ganti className img `line.svg` yang saat ini:

```tsx
          className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-screen -translate-x-1/2 -translate-y-1/2 opacity-70 lg:relative lg:left-auto lg:top-auto lg:h-40 lg:w-auto lg:translate-x-0 lg:translate-y-0"
```

menjadi:

```tsx
          className="draw-in pointer-events-none absolute left-1/2 top-1/2 h-auto w-screen -translate-x-1/2 -translate-y-1/2 opacity-70 lg:relative lg:left-auto lg:top-auto lg:h-40 lg:w-auto lg:translate-x-0 lg:translate-y-0"
```

- [ ] **Step 2: Tambahkan kelas ke `rectangle-event.svg` di WeddingEvent**

Di `components/organisms/WeddingEvent.tsx`, ganti className img `rectangle-event.svg` yang saat ini:

```tsx
          className="absolute inset-0 h-full w-full object-cover"
```

menjadi:

```tsx
          className="draw-in absolute inset-0 h-full w-full object-cover"
```

Baris ini unik di file tersebut, jadi cukup satu penggantian.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: keluar tanpa error.

- [ ] **Step 4: Cek di browser**

Scroll ke section Bride & Groom di `http://localhost:9000`.
Expected: garis pemisah tergambar dari kiri ke kanan setelah section muncul, sekitar 1,6 detik dengan jeda 0,3 detik.

Scroll ke section Wedding Event.
Expected: bingkai acara tergambar dari kiri ke kanan dengan efek yang sama.

---

### Task 3: Verifikasi

**Files:** tidak ada perubahan.

- [ ] **Step 1: Build produksi**

Run: `npm run build`
Expected: build berhasil tanpa error.

- [ ] **Step 2: Cek ukuran layar**

Buka halaman di lebar 390px dan 1280px.
Expected: tidak ada scroll horizontal di kedua ukuran, dan kedua ornamen tergambar.

- [ ] **Step 3: Cek reduced motion**

Aktifkan reduced motion (Windows "Animation effects" off, atau emulasi di DevTools), lalu muat ulang halaman dan scroll.
Expected: garis dan bingkai langsung tampil utuh tanpa transisi.

- [ ] **Step 4: Cek bingkai tidak menutupi teks**

Scroll ke Wedding Event saat animasi berjalan.
Expected: teks tanggal dan lokasi tetap di posisinya, tidak bergeser.
