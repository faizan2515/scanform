import { CircleHelp, QrCode } from "lucide-react";

export default function Footer({ onOpenHelp }: { onOpenHelp: () => void }) {
  return (
    <footer className="mx-auto flex max-w-294 items-center gap-6 border-t border-line pt-6 pb-7 max-desktop:mx-7 max-tablet:mx-5 max-tablet:flex-wrap max-tablet:gap-3 max-tablet:py-6 [&>span]:text-[9px] [&>span]:text-muted max-tablet:[&>span]:order-3 max-tablet:[&>span]:w-full [&>button]:ml-auto [&>button]:flex [&>button]:items-center [&>button]:gap-1.5 [&>button]:bg-transparent [&>button]:text-[10px] [&>button]:text-muted">
      <a
        className="inline-flex items-center gap-1.5 text-[17px] font-[750] tracking-[-0.7px]"
        href={import.meta.env.BASE_URL}
      >
        <QrCode size={18} />
        scanform
      </a>
      <span>A small tool for a more connected world.</span>
      <button onClick={onOpenHelp}>
        <CircleHelp size={14} /> A little help
      </button>
    </footer>
  );
}
