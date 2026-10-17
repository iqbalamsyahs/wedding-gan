# PRD: Website Undangan Pernikahan Hani & Gan Gan

| | |
|---|---|
| **Status** | Draft (as-built + gap) |
| **Tanggal** | 2026-10-11 |
| **Platform** | Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript |
| **Bahasa** | Indonesia (`lang="id"`) |

---

## 1. Ringkasan

Website undangan pernikahan satu halaman (single page) untuk pasangan Hanifah Sartika Julianti (Hani) dan Gan Gan Ahmad Setriawan (Gan Gan). Tamu membuka satu URL dari undangan digital, melihat profil mempelai, informasi acara, countdown menuju hari H, informasi hadiah, dan dapat mengirim ucapan.

## 2. Tujuan dan Keberhasilan

**Tujuan**
- Menyampaikan undangan secara elegan dan mudah dibuka dari ponsel.
- Memberi tamu informasi acara yang lengkap (waktu, tempat, peta).
- Memberi ruang bagi tamu untuk mengirim ucapan.

**Ukuran keberhasilan**
- Halaman tampil lengkap dan rapi di ponsel maupun desktop.
- Tamu dapat menemukan waktu acara dan lokasi tanpa bantuan.
- Ucapan yang dikirim tamu tersimpan di Google Sheet milik pasangan.

## 3. Pengguna

| Peran | Kebutuhan |
|---|---|
| **Tamu undangan** | Membuka undangan dari tautan, membaca info acara, mengirim ucapan. Mayoritas dari ponsel. |
| **Mempelai (pemilik)** | Membaca ucapan tamu di Google Sheet. Mengubah konten lewat kode (tidak ada CMS). |

## 4. Ruang Lingkup

**Dalam lingkup (sudah ada di kode)**
- Halaman sampul dengan nama mempelai, foto, dan tombol pembuka.
- Bagian Bride & Groom (profil kedua mempelai).
- Bagian Wedding Event: tanggal, sesi Akad dan Resepsi, countdown, tempat, tombol "Buka Lokasi".
- Bagian Wedding Gift: informasi rekening (gambar).
- Bagian Wishes: form ucapan dan daftar ucapan.
- Layout responsif: mobile, tablet (`sm`/`md`), dan desktop (`lg`/`xl`).

**Di luar lingkup (saat ini)**
- Konfirmasi kehadiran (RSVP).
- Login, panel admin, atau CMS.
- Personalisasi nama tamu per undangan.
- Galeri foto, musik latar, dan notifikasi.
- Multi-bahasa.

## 5. Kebutuhan Fungsional

### 5.1 Sampul (`#cover`)
- FR-1. Menampilkan nama mempelai, subjudul, dan foto sampul.
- FR-2. Menampilkan teks "Kepada Yth. Bapak/Ibu/Saudara/i: Tamu Undangan" dengan catatan maaf atas kesalahan penulisan nama.
- FR-3. Tombol di sampul membuka undangan (menggeser ke bagian berikutnya).

### 5.2 Bride & Groom (`#bride-groom`)
- FR-4. Menampilkan dua profil: foto, nama lengkap, dan nama orang tua.
- FR-5. Pada desktop, profil ditampilkan berdampingan dengan ikon penghubung di tengah.

### 5.3 Wedding Event (`#wedding-event`)
- FR-6. Menampilkan tanggal acara (29.11.2026).
- FR-7. Menampilkan dua sesi: Akad (09.00 - Selesai) dan Resepsi (11.00 - Selesai).
- FR-8. Countdown real-time (hari, jam, menit, detik) menuju 29 November 2026 pukul 09.00 WIB (UTC+7).
- FR-9. Menampilkan alamat tempat acara.
- FR-10. Tombol "Buka Lokasi" untuk membuka peta.

### 5.4 Wedding Gift (`#wedding-gift`)
- FR-11. Menampilkan informasi rekening untuk hadiah (gambar `rekening.svg`).

### 5.5 Wishes (`#wishes`)
- FR-12. Form dengan field Nama (wajib) dan Kata Ucapan (wajib). Form tidak terkirim jika salah satu kosong.
- FR-13. Saat dikirim, data dikirim ke endpoint `NEXT_PUBLIC_SHEET_API_URL` (Google Apps Script/Sheet) bila variabel tersebut diisi.
- FR-14. Setelah dikirim, ucapan baru langsung muncul di paling atas daftar, lalu form dikosongkan.
- FR-15. Tombol kirim menampilkan status "Sending..." dan nonaktif selama proses.

## 6. Kebutuhan Non-Fungsional

- **Responsif.** Tanpa scroll horizontal pada lebar ponsel. Breakpoint `sm`, `lg`, dan `xl` dipakai untuk tata letak desktop.
- **Performa.** Gambar dan SVG berada di `public/assets/`. Font dimuat lewat `next/font/google` (Great Vibes, Kranky, Gowun Batang) dan `public/fonts/FREESCPT.TTF`.
- **Aksesibilitas.** Gambar dekoratif memakai `alt=""` dan `aria-hidden="true"`. Gambar informatif (mis. rekening, logo Gan & Hani) memakai `alt` deskriptif. Input form memiliki `placeholder`, tetapi belum memiliki `<label>` (lihat Celah).
- **Keamanan.** Tidak ada data sensitif di sisi klien selain URL endpoint publik Sheet. Endpoint menerima POST dengan `mode: "no-cors"`, sehingga respons tidak dapat dibaca klien.
- **Bahasa.** Seluruh teks antarmuka dalam bahasa Indonesia.

## 7. Arsitektur dan Data

- **Halaman tunggal:** `app/page.tsx` -> `WeddingInvitation` -> komponen organisme berurutan.
- **Konten:** hardcoded di komponen (nama, tanggal, alamat, teks). Tidak ada sumber data eksternal, kecuali daftar ucapan.
- **Penyimpanan ucapan:** Google Sheet melalui endpoint `NEXT_PUBLIC_SHEET_API_URL`. Daftar yang tampil di halaman hanya ada di state klien dan hilang saat halaman dimuat ulang.
- **Konfigurasi:** `NEXT_PUBLIC_SHEET_API_URL` di file environment.

## 8. Celah dan Pekerjaan Tersisa

Ini adalah temuan dari kode saat ini. Setiap item perlu keputusan sebelum rilis.

| # | Celah | Dampak | Usulan |
|---|---|---|---|
| G-1 | Teks placeholder "Lorem ipsum" pada deskripsi acara, lokasi, hadiah, dan ucapan | Tamu melihat teks dummy | Ganti dengan teks final |
| G-2 | Nama orang tua masih "Putri .... dari Bapak .... dan Ibu ....." | Data identitas belum lengkap | Isi nama orang tua |
| G-3 | Daftar ucapan awal berisi tiga entri dummy ("Nama Tamu", "Lorem Ipsum") | Tamu melihat data palsu | Kosongkan `INITIAL_WISHES` atau ambil dari Sheet |
| G-4 | Ucapan tidak dimuat dari Sheet; hanya tampil lokal | Tamu lain tidak melihat ucapan sebelumnya | Tambah pembacaan dari Sheet (GET) |
| G-5 | Ucapan dikirim `no-cors`, dan kegagalan ditelan (`catch` kosong) | Pengirim tidak tahu jika ucapan gagal tersimpan, tetapi UI tetap menampilkannya | Tampilkan status sukses/gagal yang nyata |
| G-6 | Tombol "Buka Lokasi" tidak punya aksi (`<button>` tanpa `onClick` atau tautan) | Tombol tidak berfungsi | Tautkan ke Google Maps |
| G-7 | Alamat tempat acara masih placeholder | Tamu tidak tahu lokasi | Isi alamat dan tautan peta |
| G-8 | Gambar rekening dipakai sebagai satu-satunya info hadiah | Tidak bisa disalin, tidak aksesibel | Tambah teks nomor rekening yang bisa disalin |
| G-9 | Input form tidak memiliki `<label>` | Aksesibilitas rendah | Tambah label |
| G-10 | Countdown menghitung dengan `Date.now()` per detik di klien | Tidak ada masalah berarti | Tidak perlu tindakan |
| G-11 | Nama tamu tidak dipersonalisasi ("Tamu Undangan") | Tamu tidak merasa diundang secara personal | Pertimbangkan parameter URL (mis. `?to=`) |

## 9. Keputusan Terbuka

1. Apakah RSVP diperlukan? Jika ya, perlu kolom di Sheet dan form baru.
2. Apakah ucapan perlu moderasi sebelum tampil?
3. Apakah undangan dipersonalisasi per tamu?
4. Apakah ada galeri foto atau musik latar?

## 10. Kriteria Rilis

- [ ] Semua teks placeholder (G-1, G-2, G-7) diganti.
- [ ] Daftar ucapan tidak lagi berisi data dummy (G-3).
- [ ] Tombol lokasi berfungsi di ponsel dan desktop (G-6).
- [ ] Ucapan terkirim ke Sheet dan terlihat di sana (FR-13).
- [ ] Pengujian manual di ukuran ponsel, tablet, dan desktop.
- [ ] `npm run build` berhasil tanpa error.
