import { useMemo, useState } from "react";
import {
  defaultContent,
  createDefaultDesign,
  defaultExport,
} from "@/config/studio";
import { browserSupport } from "@/lib/browser";
import { buildContent } from "@/lib/content";
import { makeQR } from "@/lib/qr";
import type {
  Content,
  DesignSettings,
  ExportSettings,
  QRResult,
} from "@/types/qr";
import { useNotification } from "@/hooks/useNotification";
import { useQRExport } from "@/hooks/useQRExport";

export function useQRStudio() {
  const [content, setContent] = useState(defaultContent);
  const [design, setDesign] = useState(createDefaultDesign);
  const [exportSettings, setExportSettings] = useState(defaultExport);
  const [support] = useState(browserSupport);
  const notification = useNotification();
  const payload = useMemo(() => buildContent(content), [content]);
  const qr = useMemo<QRResult>(() => {
    if (!payload.value) return { svg: "", size: 0, error: "" };
    try {
      return {
        ...makeQR(
          payload.value,
          design.foreground,
          design.background,
          design.rounded,
          design.correction,
        ),
        error: "",
      };
    } catch {
      return {
        svg: "",
        size: 0,
        error:
          "This content is too long for a QR code. Shorten it or choose a lower error correction level.",
      };
    }
  }, [payload.value, design]);
  const exportActions = useQRExport({
    svg: qr.svg,
    type: content.type,
    settings: exportSettings,
    support,
    notify: notification.notify,
  });

  function updateContent(patch: Partial<Content>) {
    setContent((current) => ({ ...current, ...patch }));
  }
  function updateDesign(patch: Partial<DesignSettings>) {
    setDesign((current) => ({ ...current, ...patch }));
  }
  function updateExport(patch: Partial<ExportSettings>) {
    setExportSettings((current) => ({ ...current, ...patch }));
  }
  function reset() {
    setContent(defaultContent);
    setDesign(createDefaultDesign());
    setExportSettings(defaultExport);
    notification.notify("Studio reset. A fresh start.");
  }

  return {
    content,
    design,
    exportSettings,
    support,
    qr,
    error: payload.error || qr.error,
    updateContent,
    updateDesign,
    updateExport,
    reset,
    notification,
    exportActions,
  };
}
