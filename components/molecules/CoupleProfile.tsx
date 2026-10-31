import Typography from "@/components/atoms/Typography";
import type { CoupleProfileProps } from "@/types";

export default function CoupleProfile({
  image,
  name,
  parents,
  align,
  className = "",
}: CoupleProfileProps) {
  const reversed = align === "end";
  return (
    <div
      className={`flex w-full max-w-3xl flex-row items-center gap-6 ${reversed ? "flex-row-reverse" : ""} ${className}`}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="h-44 w-auto shrink-0 lg:h-56 xl:h-64"
      />
      <div className={`relative flex flex-col gap-2 px-5 lg:gap-3 lg:px-0 lg:top-0 ${reversed ? "top-20" : ""}`}>
        <Typography
          variant="body-bold"
          as="h3"
          className={`text-[20px] text-[#554740] text-center lg:text-[28px]`}
        >
          {name}
        </Typography>
        <Typography
          variant="body-bold"
          as="p"
          className={`text-[13px] text-olive-dark text-center lg:text-[16px]`}
        >
          {parents}
        </Typography>
      </div>
    </div>
  );
}
