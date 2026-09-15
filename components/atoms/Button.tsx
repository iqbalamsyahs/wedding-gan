export default function Button({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-between gap-6 rounded-button bg-olive px-6 py-2 font-body text-lg font-medium text-[#f5f1e8] hover:bg-olive/90 active:bg-olive/80 sm:py-3 sm:text-2xl lg:px-10 lg:py-4 lg:text-3xl ${className}`}
    >
      <img
        src="/assets/cover/mail.svg"
        alt=""
        aria-hidden="true"
        className="h-8 w-8 shrink-0 lg:h-10 lg:w-10"
      />
      Buka Undangan
    </button>
  );
}
