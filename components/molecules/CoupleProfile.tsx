import Typography from "@/components/atoms/Typography";
import { MusicNotes } from "@/components/atoms/Ornaments";
import type { CoupleProfileProps } from "@/types";

export default function CoupleProfile({
  image,
  name,
  parents,
  align,
  className = "",
  notesClassName,
}: CoupleProfileProps & { notesClassName?: string }) {
  const reversed = align === "end";
  return (
    <div
      className={`flex w-full max-w-3xl flex-row items-center gap-6 ${reversed ? "flex-row-reverse" : ""} ${className}`}
    >
      <div className="relative shrink-0">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="h-56 w-auto lg:h-72 xl:h-80"
        />
        {/* Not balok keluar dari headphone saat musik diputar */}
        {notesClassName && <MusicNotes className={notesClassName} />}
      </div>
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
