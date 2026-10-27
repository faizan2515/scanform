import { useState } from "react";
import { Check, ChevronDown, QrCode } from "lucide-react";
import type { Correction, DesignSettings } from "@/types/qr";
import { resolvePalettes } from "@/config/studio";
import { contrastRatio } from "@/lib/color";

export default function DesignControls({
  value,
  onChange,
}: {
  value: DesignSettings;
  onChange: (patch: Partial<DesignSettings>) => void;
}) {
  const { foreground, background, rounded, correction } = value;
  const [palettes] = useState(resolvePalettes);
  const contrast = contrastRatio(foreground, background);
  return (
    <section className="border-t border-line pt-6 pb-6 wide:pt-7.5 wide:pb-6.75 max-tablet:py-6">
      <div className="flex items-center gap-3">
        <span className="flex size-5.5 items-center justify-center rounded-full border border-line text-[9px] text-muted">
          02
        </span>
        <h2 className="m-0 text-[17px] font-medium tracking-[-0.45px]">
          A little more you
        </h2>
        <span className="ml-auto text-[8px] tracking-[1.15px] text-muted max-tablet:text-[7px]">
          PERSONALIZE
        </span>
      </div>
      <div className="text-[11px] mt-5.5 mb-3">Choose a palette</div>
      <div className="mb-4.5 flex items-center gap-2.5 max-tablet:gap-2.5">
        {palettes.map((p) => (
          <button
            key={p.name}
            className={`relative flex h-10 w-10.25 items-center justify-center rounded-md border border-line aria-pressed:outline aria-pressed:outline-selection-strong aria-pressed:outline-offset-[3px] ${p.className}`}
            onClick={() => {
              onChange({ foreground: p.ink, background: p.paper });
            }}
            aria-label={`${p.name} palette`}
            title={p.name}
            aria-pressed={foreground === p.ink && background === p.paper}
          >
            <QrCode size={23} />
            {foreground === p.ink && background === p.paper && (
              <span className="absolute -right-0.75 -bottom-0.75 flex size-3.25 items-center justify-center rounded-full bg-selection-strong text-paper">
                <Check size={9} strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
        <span className="ml-auto max-w-20 font-serif text-xs leading-normal text-muted-soft italic max-desktop:hidden max-tablet:block max-tablet:text-[11px]">
          A good first impression.
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <label className="flex cursor-pointer items-center gap-2.5 rounded-md border border-line p-2.5 max-tablet:gap-2 [&>span]:flex [&>span]:flex-col [&>span]:gap-1 [&_small]:text-[9px] [&_small]:text-muted [&>span>span]:text-[10px] [&>span>span]:tracking-[0.4px] max-tablet:[&>span>span]:text-[9px] [&>svg]:ml-auto [&>svg]:text-muted-soft">
          <input
            className="h-7.25 w-7 shrink-0 cursor-pointer border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border [&::-webkit-color-swatch]:border-line [&::-moz-color-swatch]:rounded-sm [&::-moz-color-swatch]:border [&::-moz-color-swatch]:border-line"
            type="color"
            value={foreground}
            onChange={(e) => onChange({ foreground: e.target.value })}
            aria-label="QR code color"
          />
          <span>
            <small>Code color</small>
            <span>{foreground.toUpperCase()}</span>
          </span>
          <ChevronDown size={13} />
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 rounded-md border border-line p-2.5 max-tablet:gap-2 [&>span]:flex [&>span]:flex-col [&>span]:gap-1 [&_small]:text-[9px] [&_small]:text-muted [&>span>span]:text-[10px] [&>span>span]:tracking-[0.4px] max-tablet:[&>span>span]:text-[9px] [&>svg]:ml-auto [&>svg]:text-muted-soft">
          <input
            className="h-7.25 w-7 shrink-0 cursor-pointer border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border [&::-webkit-color-swatch]:border-line [&::-moz-color-swatch]:rounded-sm [&::-moz-color-swatch]:border [&::-moz-color-swatch]:border-line"
            type="color"
            value={background}
            onChange={(e) => onChange({ background: e.target.value })}
            aria-label="Background color"
          />
          <span>
            <small>Background</small>
            <span>{background.toUpperCase()}</span>
          </span>
          <ChevronDown size={13} />
        </label>
      </div>
      <div className="mt-4.75 flex items-center justify-between">
        <span className="text-[11px]">Pattern style</span>
        <div className="flex gap-0.5 rounded-[5px] bg-surface-muted p-0.75">
          <button
            aria-pressed={!rounded}
            className="flex items-center gap-1.5 rounded-sm border border-transparent bg-transparent px-3 py-1.75 text-[10px] text-muted aria-pressed:border-line aria-pressed:bg-paper aria-pressed:text-ink aria-pressed:shadow-segment"
            onClick={() => onChange({ rounded: false })}
          >
            <span className="inline-block size-2.25 bg-current" />
            Classic
          </button>
          <button
            aria-pressed={rounded}
            className="flex items-center gap-1.5 rounded-sm border border-transparent bg-transparent px-3 py-1.75 text-[10px] text-muted aria-pressed:border-line aria-pressed:bg-paper aria-pressed:text-ink aria-pressed:shadow-segment"
            onClick={() => onChange({ rounded: true })}
          >
            <span className="inline-block size-2.25 bg-current rounded-[3px]" />
            Soft
          </button>
        </div>
      </div>
      {(contrast.ratio < 4.5 || contrast.inverted) && (
        <p
          className="rounded-[5px] bg-warning-surface p-2.5 text-[10px] leading-[1.6] text-warning"
          role="status"
        >
          {contrast.inverted
            ? "Use a darker code on a lighter background for reliable scanning."
            : "These colors have low contrast. Choose a darker code or lighter background."}
        </p>
      )}
      <details className="group mt-5.5 border-t border-line-soft pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] text-muted group-open:mb-4.25 [&::-webkit-details-marker]:hidden">
          Fine-tune your code
          <ChevronDown
            size={14}
            aria-hidden="true"
            className="shrink-0 transition-transform group-open:rotate-180"
          />
        </summary>
        <label
          className="mb-2.25 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
          htmlFor="correction"
        >
          Error correction
        </label>
        <select
          className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper px-3.25 py-3 text-xs leading-[1.4] text-ink placeholder:text-muted-soft"
          id="correction"
          value={correction}
          onChange={(e) =>
            onChange({ correction: e.target.value as Correction })
          }
        >
          <option value="L">Low · more space for content</option>
          <option value="M">Medium · balanced (recommended)</option>
          <option value="Q">Quartile · extra resilience</option>
          <option value="H">High · maximum resilience</option>
        </select>
        <p className="mt-2.25 text-[10px] leading-[1.7] text-muted">
          Higher correction helps when a printed code is damaged, but holds less
          content. A four-module clear border is always included.
        </p>
      </details>
    </section>
  );
}
