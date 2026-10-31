export default function Button({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-between gap-6 rounded-button bg-olive-dark px-6 py-2 font-body text-lg font-medium text-[#f5f1e8] hover:bg-olive-dark/90 active:bg-olive-dark/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive-dark sm:py-3 sm:text-2xl lg:px-10 lg:py-4 lg:text-3xl ${className}`}
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
