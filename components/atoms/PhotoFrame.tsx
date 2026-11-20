import type { CSSProperties } from "react";

const layer = "absolute inset-0 h-full w-full";

// Badan dibelah dua (pria kiri, wanita kanan) supaya tiap karakter bisa digeser ke tengah;
// lengan berputar di sendi siku (anchor dari lottie 540x480)
// ponytail: geser/skala disetel manual; ubah angka translate-x untuk jarak antar karakter
// Urutan = tumpukan: Hani dulu, GanGan di atasnya
const people = [
  { clip: "[clip-path:inset(0_0_0_50%)]", shift: "-translate-x-[11%]", arm: "bride", origin: "origin-[83.52%_46.46%]", deg: 7.5 },
  { clip: "[clip-path:inset(0_50%_0_0)]", shift: "translate-x-[5%]", arm: "groom", origin: "origin-[39.17%_46.04%]", deg: 7 },
];

function WavingCouple({ className, alt }: { className: string; alt: string }) {
  return (
    <div className={`h-full w-full ${className}`}>
      <div className="relative top-[12%] aspect-[540/480] w-full translate-x-[7%] scale-[1.5]">
        {people.map((p, i) => (
          <div key={p.arm} className={`${layer} ${p.shift}`}>
            <img
              src="/assets/cover/couple_body.png"
              alt={i === 1 ? alt : ""}
              aria-hidden={i === 1 && alt ? undefined : true}
              className={`${layer} ${p.clip}`}
            />
            <img
              src={`/assets/cover/couple_arm_${p.arm}.png`}
              alt=""
              aria-hidden="true"
              className={`wave ${layer} ${p.origin}`}
              style={{ "--from": `-${p.deg}deg`, "--to": `${p.deg}deg` } as CSSProperties}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PhotoFrame({ className = "" }: { className?: string }) {
  const frame = "relative aspect-square w-[260px] max-w-[78vw] max-[400px]:w-[min(200px,24dvh)] lg:w-[min(360px,40vh)] xl:w-[min(400px,42vh)]";

  return (
    <div className={`${frame} ${className}`}>
      {/* Ukuran & posisi relatif ke lingkaran, jadi menempel di kanan atas di semua layar */}
      <img
        src="/assets/cover/balloon.svg"
        alt=""
        aria-hidden="true"
        className="float absolute -right-[32%] -top-[46%] w-[85%]"
      />

      <div className="cover-photo-mask absolute inset-0 overflow-hidden rounded-full">
        <WavingCouple className="cover-photo-img" alt="Hani & GanGan" />
      </div>

      {/* Setengah atas karakter (kepala + tangan melambai) tampil di atas ring tanpa terpotong lingkaran */}
      {/* Kotaknya 1.5x frame (inset -25%, isi tetap seukuran frame lewat padding) supaya tangan yang
          keluar sedikit dari frame tidak terpotong; --k mengecilkan mask agar reveal sama dengan lingkaran */}
      <div
        className="cover-photo-strip pointer-events-none absolute -inset-[25%] z-30 p-[25%] [clip-path:inset(0_0_47%_0)]"
        style={{ "--k": 2 / 3 } as CSSProperties}
      >
        <WavingCouple className="cover-strip-img" alt="" />
      </div>

      <img
        src="/assets/cover/cover_circle.svg"
        alt="Cover Circle"
        aria-hidden="true"
        className="cover-ring pointer-events-none absolute inset-0 z-20 h-full w-full object-contain"
      />
    </div>
  );
}
