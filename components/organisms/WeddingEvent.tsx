import Typography from "@/components/atoms/Typography";
import Countdown from "@/components/molecules/Countdown";
import Reveal from "@/components/atoms/Reveal";

export default function WeddingEvent() {
  return (
    <section
      id="wedding-event"
      className="relative flex w-full flex-col items-center gap-10 px-10 sm:px-6 py-16 sm:py-24 lg:px-16 lg:py-32 xl:px-24"
    >
      <Typography
        variant="body-bold"
        as="h2"
        className="text-[36px] text-burgundy tracking-[-0.02em] lg:text-[52px]"
      >
        Wedding Event
      </Typography>

      <Reveal className="flex w-full justify-center">
      <div className="relative w-full max-w-92.25 aspect-378/345 lg:max-w-[560px] xl:max-w-[620px]">
        <img
          src="/assets/weeding_event/rectangle-event.svg"
          alt=""
          aria-hidden="true"
          className="draw-in absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center gap-4 py-6.5 pl-10.5 pr-5.5 lg:py-8 lg:pl-14 lg:pr-6 lg:gap-6">
          <div className="flex items-start justify-around">
            <div className="flex flex-col -space-y-4">
              <Typography
                variant="body-bold"
                className="text-[34px] leading-none text-olive-dark tracking-[-0.02em] lg:text-[44px]"
              >
                29.
              </Typography>
              <Typography
                variant="body-bold"
                className="text-[34px] leading-none text-olive-dark tracking-[-0.02em] lg:text-[44px]"
              >
                11.
              </Typography>
              <Typography
                variant="body-bold"
                className="text-[34px] leading-none text-olive-dark tracking-[-0.02em] lg:text-[44px]"
              >
                2026
              </Typography>
            </div>

            <img
              src="/assets/weeding_event/calendar.svg"
              alt=""
              aria-hidden="true"
              className="h-35 w-35.25 lg:h-44 lg:w-44"
            />
          </div>

          <Typography
            variant="body-bold"
            className="text-center text-[14px] text-olive-dark tracking-[-0.02em] lg:text-[18px]"
          >
            Lorem ipsum dolor sit amet consectetur. Et varius pharetra leo nibh
            non natoque sed. Feugiat tincidunt ornare amet imperdiet ultricies
            nullam.
          </Typography>
        </div>
      </div>
      </Reveal>

      <Reveal className="flex w-full justify-center" delay={150}>
        <Countdown />
      </Reveal>

      <Reveal className="flex w-full justify-center" delay={300}>
      <div className="flex w-full max-w-92.25 items-center justify-between lg:max-w-[560px] lg:gap-6 xl:max-w-[620px]">
        <div className="flex flex-col items-center gap-1">
          <img
            src="/assets/weeding_event/hani-event.svg"
            alt=""
            aria-hidden="true"
            className="h-35.5 w-27.5 lg:h-48 lg:w-36"
          />
          <Typography
            variant="body-bold"
            className="text-[36px] text-olive-dark tracking-[-0.02em] lg:text-[44px]"
          >
            Akad
          </Typography>
          <Typography
            variant="body-bold"
            className="text-[20px] text-burgundy tracking-[-0.02em] lg:text-[24px]"
          >
            09.00 - Selesai
          </Typography>
        </div>

        <div className="flex flex-col items-center gap-1">
          <img
            src="/assets/weeding_event/gan-event.svg"
            alt=""
            aria-hidden="true"
            className="h-35.5 w-27.5 lg:h-48 lg:w-36"
          />
          <Typography
            variant="body-bold"
            className="text-[36px] text-olive-dark tracking-[-0.02em] lg:text-[44px]"
          >
            Resepsi
          </Typography>
          <Typography
            variant="body-bold"
            className="text-[20px] text-burgundy tracking-[-0.02em] lg:text-[24px]"
          >
            11.00 - Selesai
          </Typography>
        </div>
      </div>
      </Reveal>

      <Reveal className="flex w-full justify-center" delay={450}>
      <div className="flex flex-col items-center gap-3">
        <img
          src="/assets/weeding_event/pinpoint.svg"
          alt=""
          aria-hidden="true"
          className="mt-1 h-7.25 w-4.75"
        />

        <Typography
          variant="body-bold"
          className="text-[24px] text-olive-dark tracking-[-0.02em]"
        >
          Tempat
        </Typography>

        <div className="flex items-start gap-2">
<Typography
          variant="body-bold"
          className="max-w-75 text-center text-[14px] leading-5.75 text-olive-dark tracking-[-0.02em] lg:max-w-[420px] lg:text-[18px]"
        >
          Lorem ipsum dolor sit amet consectetur. Morbi in auctor tortor at
          sit donec cursus vitae. Nunc bibendum amet sit.
        </Typography>
        </div>

        <button className="flex items-center gap-4 rounded-button bg-olive px-6 py-2 my-5 text-[#f5f1e8] lg:px-8 lg:py-3">
          <img
            src="/assets/weeding_event/pinpoint-button.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 lg:h-7 lg:w-7"
          />
          <span className="font-body text-[20px] font-bold tracking-[-0.02em] lg:text-[24px]">
            Buka Lokasi
          </span>
        </button>
      </div>
      </Reveal>

      <img
        src="/assets/bride_groom/flower.svg"
        alt=""
        aria-hidden="true"
        className="h-12 w-auto lg:h-16"
      />
    </section>
  );
}
