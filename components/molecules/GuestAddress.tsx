import Typography from "@/components/atoms/Typography";

export default function GuestAddress() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Typography variant="body-bold" as="p" className="text-[13px] text-olive-dark sm:text-base lg:text-lg">
        Kepada Yth. Bapak/Ibu/Saudara/i:
      </Typography>
      <Typography variant="accent" as="h3" className="text-center text-[24px] text-burgundy sm:text-[32px] lg:text-[40px]">
        Tamu Undangan
      </Typography>
      <Typography variant="body-bold" as="p" className="w-3/4 text-center text-[12px] text-olive-dark sm:text-base lg:text-lg">
        Mohon maaf jika ada kesalahan penulisan nama dan gelar
      </Typography>
      <div className="relative flex my-2">
        <img
          src="/assets/cover/arrow-left.svg"
          alt=""
          aria-hidden="true"
        />
        <img
          src="/assets/cover/arrow-right.svg"
          alt=""
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
