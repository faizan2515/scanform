import { Check, Sparkles } from "lucide-react";

export default function Intro() {
  return (
    <section className="pt-13 pb-9 wide:pt-16 max-tablet:pt-9 max-tablet:pb-7">
      <div className="flex items-center gap-2 text-[9px] font-semibold tracking-[1.75px] max-tablet:text-[8px] max-tablet:tracking-[1.25px] [&>span]:size-1.5 [&>span]:bg-accent-marker">
        <span /> SMALL CODE. ENDLESS POSSIBILITIES.
      </div>
      <div className="mt-5 flex items-center justify-between max-tablet:mt-4.5 max-tablet:block">
        <h1 className="m-0 text-[clamp(44px,5.3vw,66px)] leading-[1.05] font-medium tracking-[-3.5px] max-desktop:text-[53px] max-tablet:text-[51px] max-tablet:tracking-[-2.8px]">
          Good things.
          <br />
          One scan away<span className="text-accent-strong">.</span>
        </h1>
        <div className="pt-1.25 pr-4 max-desktop:pr-0 max-tablet:mt-5.5 max-tablet:flex max-tablet:flex-wrap max-tablet:items-center max-tablet:gap-2.5">
          <span className="mb-3 block max-tablet:hidden">
            <Sparkles size={23} strokeWidth={1.4} />
          </span>
          <p className="mb-4.25 text-[13px] leading-[1.7] text-muted max-tablet:m-0 max-tablet:text-[11px]">
            A link, a thought, a little connection.
            <br />
            Turn it into a QR code that's yours.
          </p>
          <div className="flex gap-4.5 text-[10px] max-tablet:ml-auto max-tablet:flex-col max-tablet:gap-2 max-tablet:text-[9px] [&>span]:flex [&>span]:items-center [&>span]:gap-1.25 [&_svg]:text-status">
            <span>
              <Check size={13} /> Free forever
            </span>
            <span>
              <Check size={13} /> No sign-up
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
