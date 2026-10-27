import { ArrowUpRight, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export default function HelpDialog({
  dialog,
}: {
  dialog: RefObject<HTMLDialogElement | null>;
}) {
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function resetTransition() {
    clearTimeout(closeTimer.current);
    setClosing(false);
  }

  function finishClose() {
    dialog.current?.close();
    resetTransition();
  }

  function requestClose() {
    if (!dialog.current?.open || closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }
    setClosing(true);
    // Also finish if animation events are suppressed or interrupted.
    closeTimer.current = setTimeout(finishClose, 220);
  }

  return (
    <dialog
      className={`m-auto w-120 max-w-[calc(100%-32px)] rounded-[15px] border border-line-strong bg-dialog p-0 text-ink shadow-dialog backdrop:bg-overlay backdrop:backdrop-blur-[5px] ${closing ? "animate-dialog-out backdrop:animate-backdrop-out" : "open:animate-dialog-in backdrop:animate-backdrop-in"}`}
      ref={dialog}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && e.animationName === "dialog-out") {
          finishClose();
        }
      }}
      onClose={resetTransition}
      aria-labelledby="help-title"
    >
      <div className="relative p-9 max-tablet:p-7.25 [&>h2]:my-5 [&>h2]:text-[32px] [&>h2]:leading-[1.1] [&>h2]:tracking-[-1.4px] [&>ol]:list-decimal [&>ol]:pl-4.5 [&>ol]:text-xs [&>ol]:leading-[1.8] [&>ol]:text-muted [&_li]:my-3 [&_li]:pl-1.5 [&_strong]:font-semibold [&_strong]:text-muted-strong [&>a]:mt-4.5 [&>a]:flex [&>a]:items-center [&>a]:gap-1.5 [&>a]:text-[10px] [&>a]:text-status-ink">
        <button
          className="absolute top-4.5 right-4.5 bg-transparent p-1.25 text-muted"
          onClick={requestClose}
          aria-label="Close help"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-2 text-[9px] font-semibold tracking-[1.75px] max-tablet:text-[8px] max-tablet:tracking-[1.25px] [&>span]:size-1.5 [&>span]:bg-accent-marker">
          A LITTLE HELP
        </div>
        <h2
          className="m-0 text-[17px] font-medium tracking-[-0.45px]"
          id="help-title"
        >
          Small code.
          <br />
          Simple possibilities.
        </h2>
        <ol>
          <li>
            <strong>Add your content.</strong> Choose a website, plain text,
            Wi-Fi network, or an email draft.
          </li>
          <li>
            <strong>Make it yours.</strong> Choose colors with strong contrast
            and your preferred pattern.
          </li>
          <li>
            <strong>Take it with you.</strong> Download PNG for everyday sharing
            or SVG for sharp printing at any size.
          </li>
        </ol>
        <div className="mt-5.5 flex items-start gap-3 rounded-[7px] bg-status-surface p-3.75 text-status-ink [&>svg]:shrink-0 [&>p]:text-[11px] [&>p]:leading-[1.7]">
          <ShieldCheck size={20} />
          <p>
            Generation runs entirely on your device using a bundled QR encoder.
            No QR-specific browser API, server, or account is needed. Your
            entries aren’t uploaded or saved.
          </p>
        </div>
        <p className="mt-2.25 text-[10px] leading-[1.7] text-muted">
          Scan your downloaded code with your phone before printing. Keep the
          clear border intact. Static codes don’t expire; websites and Wi-Fi
          credentials can change. Clipboard access may require HTTPS and browser
          permission.
        </p>
        <a
          href="https://github.com/soldair/node-qrcode"
          target="_blank"
          rel="noreferrer"
        >
          Built with the open-source QRCode encoder <ArrowUpRight size={13} />
        </a>
      </div>
    </dialog>
  );
}
