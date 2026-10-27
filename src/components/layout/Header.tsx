import { ArrowUpRight, QrCode } from "lucide-react";

export default function Header({ onOpenHelp }: { onOpenHelp: () => void }) {
  return (
    <header className="mx-auto flex h-24 max-w-7xl items-center gap-20 border-b border-line px-13 max-desktop:gap-11 max-desktop:px-7 max-tablet:h-19 max-tablet:justify-between max-tablet:gap-0 max-tablet:px-5">
      <a
        className="inline-flex items-center gap-2 text-[25px] font-[750] tracking-[-1.2px] max-tablet:text-[23px]"
        href={import.meta.env.BASE_URL}
        aria-label="Scanform home"
      >
        <QrCode size={25} strokeWidth={2.4} />
        scanform
      </a>
      <nav className="flex items-center gap-8 text-xs max-tablet:gap-5">
        <span className="relative font-semibold after:absolute after:inset-x-0 after:-bottom-9 after:h-0.5 after:bg-ink after:content-[''] max-tablet:hidden">
          QR studio
        </span>
        <button
          className="flex items-center gap-2 bg-transparent text-xs text-muted hover:text-ink max-tablet:text-[11px]"
          onClick={onOpenHelp}
        >
          How it works <ArrowUpRight size={14} />
        </button>
      </nav>
      <div className="ml-auto flex items-center gap-2 text-[11px] text-muted max-tablet:hidden">
        <svg
          className="block size-2 shrink-0 fill-status"
          viewBox="0 0 8 8"
          width="8"
          height="8"
          aria-hidden="true"
        >
          <circle cx="4" cy="4" r="4" />
        </svg>
        Made in your browser
      </div>
    </header>
  );
}
