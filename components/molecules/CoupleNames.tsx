import Typography from "@/components/atoms/Typography";

export default function CoupleNames() {
  return (
    <div className="flex flex-col items-center">
      <Typography variant="script" as="h1" className="mr-28 text-[32px] text-warm-gray sm:mr-46 sm:text-[48px] lg:mr-32 lg:text-[64px] xl:mr-56 xl:text-[72px]">
        Hani
      </Typography>
      <Typography variant="ampersand" as="span" className="-mt-6 mr-4 text-[24px] text-[#9B6D6D] sm:-mt-10 sm:text-[36px] lg:text-[48px]">
        &amp;
      </Typography>
      <Typography variant="script" as="h1" className="-mt-4 ml-28 text-[32px] text-warm-gray sm:-mt-5 sm:ml-46 sm:text-[48px] lg:ml-32 lg:text-[64px] xl:ml-56 xl:text-[72px]">
        GanGan
      </Typography>
    </div>
  );
}
