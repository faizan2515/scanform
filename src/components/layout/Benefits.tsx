import { ArrowDown, ScanLine, ShieldCheck, Zap } from "lucide-react";

export default function Benefits() {
  return (
    <>
      <section
        className="grid grid-cols-3 gap-6 border-b border-line pt-8 pb-8 wide:pt-9 wide:pb-9 max-desktop:gap-4 max-tablet:grid-cols-1 max-tablet:gap-5 max-tablet:px-2 max-tablet:py-7 [&>article]:flex [&>article]:gap-3 max-desktop:[&>article]:gap-2 max-tablet:[&>article]:gap-3 [&_h3]:mt-px [&_h3]:mb-2 [&_h3]:text-xs [&_h3]:font-medium [&_h3]:tracking-[-0.15px] max-desktop:[&_h3]:text-[11px] max-tablet:[&_h3]:mb-1 max-tablet:[&_h3]:text-xs [&_p]:text-[10px] [&_p]:leading-[1.8] [&_p]:text-muted max-desktop:[&_p]:text-[9px] max-tablet:[&_p]:text-[10px]"
        aria-label="Why Scanform"
      >
        <article>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] border border-line bg-status-surface text-status-ink max-desktop:size-8 max-tablet:size-10">
            <ShieldCheck size={21} strokeWidth={1.5} />
          </span>
          <div>
            <h3>Yours, and only yours.</h3>
            <p>
              No uploads. No tracking. Everything
              <br className="max-tablet:hidden" /> happens inside your browser.
            </p>
          </div>
        </article>
        <article>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] border border-line bg-status-surface text-status-ink max-desktop:size-8 max-tablet:size-10">
            <Zap size={21} strokeWidth={1.5} />
          </span>
          <div>
            <h3>From idea to scan. Instantly.</h3>
            <p>
              No accounts or extra steps.
              <br className="max-tablet:hidden" /> Just create, download, and
              share.
            </p>
          </div>
        </article>
        <article>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] border border-line bg-status-surface text-status-ink max-desktop:size-8 max-tablet:size-10">
            <ScanLine size={21} strokeWidth={1.5} />
          </span>
          <div>
            <h3>A connection that lasts.</h3>
            <p>
              Your QR codes don't expire.
              <br className="max-tablet:hidden" /> Print them. Share them. Keep
              them.
            </p>
          </div>
        </article>
      </section>
      <div className="flex items-center justify-center gap-4 py-9 max-tablet:gap-3 max-tablet:py-7 [&>p]:text-[11px] [&>p]:leading-[1.8] [&>p]:text-muted max-tablet:[&>p]:text-[10px] [&_strong]:font-normal [&_strong]:text-muted-strong [&>svg]:ml-8 [&>svg]:-rotate-30 [&>svg]:text-decoration max-tablet:[&>svg]:ml-1">
        <span className="text-4xl text-decoration">✳</span>
        <p>
          For the menus, the mixtapes, the big ideas.
          <br />
          <strong>And all the little things worth sharing.</strong>
        </p>
        <ArrowDown size={22} strokeWidth={1} />
      </div>
    </>
  );
}
