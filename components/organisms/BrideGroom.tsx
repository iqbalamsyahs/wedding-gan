import Typography from "@/components/atoms/Typography";
import CoupleProfile from "@/components/molecules/CoupleProfile";
import Reveal from "@/components/atoms/Reveal";

export default function BrideGroom() {
  return (
    <Reveal className="w-full">
    <section
      id="bride-groom"
      className="relative flex w-full flex-col items-center gap-10 px-10 sm:px-6 py-16 sm:py-24 lg:px-16 lg:py-32 xl:px-24"
    >
      <Typography
        variant="body-bold"
        as="h2"
        className="text-[36px] text-burgundy tracking-[-0.02em] lg:text-[52px]"
      >
        Bride &amp; Groom
      </Typography>

      <div className="relative flex w-full flex-col items-center gap-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12 xl:gap-20">
      <CoupleProfile
        image="/assets/bride_groom/hani.svg"
        name="Hanifah Sartika Julianti"
        parents="Putri .... dari Bapak .... dan Ibu ....."
        align="start"
        className="slide-in-left lg:flex-col"
      />

      <div className="relative flex h-30 w-full items-center justify-center lg:h-auto lg:w-auto">
        <img
          src="/assets/bride_groom/line.svg"
          alt=""
          aria-hidden="true"
          className="draw-in pointer-events-none absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2 opacity-70 lg:relative lg:left-auto lg:top-auto lg:h-40 lg:w-auto lg:translate-x-0 lg:translate-y-0"
        />
        <img
          src="/assets/bride_groom/and_circle.svg"
          alt=""
          aria-hidden="true"
          className="pop-in relative h-15 w-15 top-8 lg:absolute lg:top-1/2 lg:-translate-y-1/2"
        />
      </div>

      <CoupleProfile
        image="/assets/bride_groom/gan.svg"
        name={<>
          <span>Gan Gan</span><br/><span>Ahmad Setriawan</span>
        </>}
        parents="Putri .... dari Bapak .... dan Ibu ....."
        align="end"
        className="slide-in-right mb-15 flex-row-reverse lg:mb-0 lg:flex-col"
      />
      </div>

      <img
        src="/assets/bride_groom/flower.svg"
        alt=""
        aria-hidden="true"
        className="fade-in h-12 w-auto lg:h-16"
      />
    </section>
    </Reveal>
  );
}
