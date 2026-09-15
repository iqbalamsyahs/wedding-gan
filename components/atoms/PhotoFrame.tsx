export default function PhotoFrame({ className = "" }: { className?: string }) {
  const src = "/assets/cover/cover_image.png";
  const alt = "Hani & GanGan";
  const frame = "relative aspect-square w-[260px] max-w-[78vw] max-[400px]:w-[200px] lg:w-[min(360px,40vh)] xl:w-[min(400px,42vh)]";

  return (
    <div className={`${frame} ${className}`}>
      <div className="absolute -right-20 -top-20 overflow-hidden sm:-right-20 sm:-top-32 lg:h-56 lg:w-36 lg:-top-36 lg:-right-28 xl:h-64 xl:w-40 xl:-top-40 xl:-right-32">
        <img src="/assets/cover/balloon.svg" alt="Balloon" className="h-full w-full object-cover object-top" />
      </div>

      <div className="absolute inset-0 overflow-hidden rounded-full">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 z-30 h-20 overflow-hidden sm:h-24 lg:h-32">
        <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover object-top" />
      </div>

      <img
        src="/assets/cover/cover_circle.svg"
        alt="Cover Circle"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain"
      />
    </div>
  );
}
