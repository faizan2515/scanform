import { useState } from "react";
import { pngBlob, saveFile } from "@/lib/export";
import type { BrowserSupport, ContentType, ExportSettings } from "@/types/qr";

type Options = {
  svg: string;
  type: ContentType;
  settings: ExportSettings;
  support: BrowserSupport;
  notify: (message: string) => void;
};

export function useQRExport({ svg, type, settings, support, notify }: Options) {
  const [busy, setBusy] = useState(false);
  const { format, size } = settings;
  const canExport = !!svg && support.svg && support.download && !busy;

  async function download() {
    if (!canExport || (format === "png" && !support.canvas)) return;
    setBusy(true);
    try {
      const blob =
        format === "svg"
          ? new Blob([svg], { type: "image/svg+xml" })
          : await pngBlob(svg, size);
      saveFile(blob, `scanform-${type}.${format}`);
      notify("Your QR code is ready. Download started.");
    } catch (error) {
      notify(
        error instanceof Error
          ? error.message
          : "Could not download. Try SVG instead.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (
      !svg ||
      !navigator.clipboard?.write ||
      typeof ClipboardItem === "undefined" ||
      !support.canvas
    ) {
      notify(
        "Image copying is unavailable in this browser. Download your QR code instead.",
      );
      return;
    }
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": pngBlob(svg, size) }),
      ]);
      notify("QR image copied to clipboard.");
    } catch {
      notify("Clipboard access was denied. Download your QR code instead.");
    }
  }

  return { busy, canExport, download, copy };
}
