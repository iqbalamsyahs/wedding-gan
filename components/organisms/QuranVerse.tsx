import Typography from "@/components/atoms/Typography";
import Reveal from "@/components/atoms/Reveal";

// Satu layar penuh: ornamen bunga di atas dan bawah, ranting di sudut,
// supaya section berikutnya (Bride & Groom) belum terlihat saat ayat tampil.
export default function QuranVerse() {
  return (
    <section
      id="quran-verse"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-8 overflow-hidden px-10 py-16 text-center sm:px-6 lg:px-16 lg:py-24 xl:px-24"
    >
      <img
        src="/assets/cover/leafs.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-6 w-14 rotate-[200deg] opacity-80 lg:left-12 lg:top-12 lg:w-20"
      />
      <img
        src="/assets/cover/leafs.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-4 w-14 rotate-[20deg] opacity-80 lg:bottom-12 lg:right-12 lg:w-20"
      />

      <Reveal variant="blur" className="flex justify-center">
        <img
          src="/assets/bride_groom/flower.svg"
          alt=""
          aria-hidden="true"
          className="h-12 w-auto rotate-180 lg:h-16"
        />
      </Reveal>

      <Reveal variant="blur" delay={150} className="flex w-full max-w-[560px] flex-col items-center gap-6">
        <p
          lang="ar"
          dir="rtl"
          className="font-arabic text-[22px] leading-[2] text-olive-dark lg:text-[30px]"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
        </p>

        <Typography
          variant="body-bold"
          className="text-[14px] leading-5.75 text-olive-dark tracking-[-0.02em] lg:text-[18px] lg:leading-7"
        >
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
          untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa
          tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan
          sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
          tanda-tanda bagi kaum yang berpikir.&rdquo;
        </Typography>

        <Typography
          variant="body-bold"
          className="text-[18px] text-burgundy tracking-[-0.02em] lg:text-[22px]"
        >
          QS. Ar-Rum: 21
        </Typography>
      </Reveal>

      <Reveal variant="blur" delay={300} className="flex justify-center">
        <img
          src="/assets/bride_groom/flower.svg"
          alt=""
          aria-hidden="true"
          className="h-12 w-auto lg:h-16"
        />
      </Reveal>
    </section>
  );
}
