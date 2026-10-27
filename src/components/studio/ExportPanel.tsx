import { ArrowDownToLine, Copy, MonitorCheck } from "lucide-react";
import type { BrowserSupport, ExportSettings, QRResult } from "@/types/qr";

export default function ExportPanel({
  value,
  onChange,
  qr,
  support,
  busy,
  canExport,
  download,
  copy,
}: {
  value: ExportSettings;
  onChange: (patch: Partial<ExportSettings>) => void;
  qr: QRResult;
  support: BrowserSupport;
  busy: boolean;
  canExport: boolean;
  download: () => void;
  copy: () => void;
}) {
  const { format, size } = value;
  return (
    <div className="border-t border-line-strong bg-surface px-6.75 py-4.75 max-desktop:p-5 max-tablet:p-5.5">
      <div className="mb-4.25 flex items-center justify-between gap-2.5 [&>h3]:text-[13px] [&>h3]:font-medium [&>h3]:tracking-[-0.15px] max-tablet:[&>h3]:text-sm [&>span]:text-[8px] [&>span]:text-muted">
        <h3>Ready for the world</h3>
        <span>
          {qr.svg
            ? `${qr.size} × ${qr.size} modules`
            : "Waiting for your content"}
        </span>
      </div>
      <div className="mb-3.5 grid grid-cols-2 gap-3 [&_label]:mb-2 [&_label]:block [&_label]:text-[9px] [&_label]:text-muted [&_select]:w-full [&_select]:cursor-pointer [&_select]:rounded-[5px] [&_select]:border [&_select]:border-line-strong [&_select]:bg-paper [&_select]:px-2.25 [&_select]:py-2.5 [&_select]:text-[10px] [&_select]:text-muted-strong max-tablet:[&_select]:text-[11px] [&_select:disabled]:bg-surface-muted [&_select:disabled]:text-muted">
        <div>
          <label htmlFor="format">File format</label>
          <select
            id="format"
            value={format}
            onChange={(e) =>
              onChange({ format: e.target.value as ExportSettings["format"] })
            }
          >
            <option value="png" disabled={!support.canvas}>
              PNG · Image
            </option>
            <option value="svg">SVG · Vector</option>
          </select>
        </div>
        <div>
          <label htmlFor="resolution">
            {format === "svg" ? "Scales beautifully" : "Image size"}
          </label>
          <select
            id="resolution"
            value={size}
            disabled={format === "svg"}
            onChange={(e) => onChange({ size: Number(e.target.value) })}
          >
            <option value={512}>512 × 512 px</option>
            <option value={1024}>1024 × 1024 px</option>
            <option value={2048}>2048 × 2048 px</option>
            <option value={4096}>4096 × 4096 px</option>
          </select>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2.5 max-tablet:grid-cols-1">
        <button
          className="flex w-full items-center justify-center gap-2.75 rounded-md border border-accent-border bg-accent px-4 py-3.5 text-xs font-medium text-accent-ink shadow-button enabled:hover:bg-accent-hover max-tablet:p-4"
          disabled={!canExport || (format === "png" && !support.canvas)}
          onClick={download}
        >
          <ArrowDownToLine size={18} />
          <span>
            {busy ? "Preparing your code…" : `Download ${format.toUpperCase()}`}
          </span>
        </button>
        <button
          className="flex w-full items-center justify-center gap-1.75 rounded-md border border-line-strong bg-paper px-4 py-3.5 text-[11px] text-muted hover:bg-surface-muted hover:text-ink max-tablet:p-4"
          onClick={copy}
          disabled={!qr.svg || busy}
        >
          <Copy size={14} /> Copy QR image
        </button>
      </div>
      <div
        className={`mt-0.75 flex items-center justify-center gap-1.5 text-[9px] ${!support.svg || !support.download ? "text-warning" : "text-muted"}`}
      >
        <MonitorCheck size={13} />
        <span>
          {!support.svg
            ? "SVG is unsupported. Try a current browser."
            : !support.download
              ? "Downloads are unsupported in this browser."
              : !support.canvas
                ? "SVG ready · PNG unavailable in this browser"
                : "Browser checked. You're good to go."}
        </span>
      </div>
    </div>
  );
}
