import Typography from "@/components/atoms/Typography";

// Setiap huruf dibungkus span supaya bisa dianimasikan satu per satu.
// Teks utuh tetap dibacakan screen reader lewat sr-only.
function Letters({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        {text.split("").map((char, i) => (
          <span key={i} className="split-char inline-block">
            {char}
          </span>
        ))}
      </span>
    </>
  );
}

export default function CoupleNames() {
  return (
    <div className="flex flex-col items-center">
      <Typography variant="script" as="h1" className="mr-28 text-[32px] text-warm-gray sm:mr-46 sm:text-[48px] lg:mr-32 lg:text-[64px] xl:mr-56 xl:text-[72px]">
        <Letters text="Hani" />
      </Typography>
      <Typography variant="ampersand" as="span" className="-mt-6 mr-4 text-[24px] text-[#9B6D6D] sm:-mt-10 sm:text-[36px] lg:text-[48px]">
        &amp;
      </Typography>
      <Typography variant="script" as="h1" className="-mt-4 ml-28 text-[32px] text-warm-gray sm:-mt-5 sm:ml-46 sm:text-[48px] lg:ml-32 lg:text-[64px] xl:ml-56 xl:text-[72px]">
        <Letters text="GanGan" />
      </Typography>
    </div>
  );
}
