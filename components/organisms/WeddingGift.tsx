import Typography from "@/components/atoms/Typography";

export default function WeddingGift() {
  return (
    <section
      id="wedding-gift"
      className="relative flex w-full flex-col items-center gap-6 px-10 py-10 sm:px-6 sm:py-24 lg:px-16 lg:py-32 xl:px-24"
    >
      <Typography
        variant="body-bold"
        as="h2"
        className="text-[36px] text-burgundy tracking-[-0.02em] lg:text-[52px]"
      >
        Wedding Gift
      </Typography>

      <Typography
        variant="body-bold"
        className="max-w-[340px] text-center text-[14px] leading-5.75 text-olive-dark tracking-[-0.02em] lg:max-w-[540px] lg:text-[18px]"
      >
        Lorem ipsum dolor sit amet consectetur. Et varius pharetra leo nibh non
        natoque sed. Feugiat tincidunt ornare amet imperdiet ultricies nullam.
        Quis purus vitae eu maecenas non dolor.
      </Typography>

      <div className="mt-4 flex w-full justify-center">
        <img
          src="/assets/rekening.svg"
          alt="Rekening Wedding Gift"
          className="w-full max-w-75 h-auto lg:max-w-100"
        />
      </div>

      <Typography
        variant="body-bold"
        className="max-w-[340px] text-center text-[14px] leading-5.75 text-olive-dark tracking-[-0.02em] lg:max-w-[540px] lg:text-[18px]"
      >
        Lorem ipsum dolor sit amet consectetur. Et varius pharetra leo nibh non
        natoque sed. Feugiat tincidunt ornare amet imperdiet ultricies nullam.
        Quis purus vitae eu maecenas non dolor.
      </Typography>

    </section>
  );
}
