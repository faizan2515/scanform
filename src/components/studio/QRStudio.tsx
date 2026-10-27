import { LockKeyhole, RotateCcw } from "lucide-react";
import { useQRStudio } from "@/hooks/useQRStudio";
import Toast from "@/components/Toast";
import ContentEditor from "@/components/studio/ContentEditor";
import DesignControls from "@/components/studio/DesignControls";
import ExportPanel from "@/components/studio/ExportPanel";
import QRPreview from "@/components/studio/QRPreview";

export default function QRStudio() {
  const studio = useQRStudio();

  return (
    <>
      <section
        className="grid grid-cols-[1fr_0.95fr] overflow-hidden rounded-[15px] border border-line-strong bg-paper shadow-studio wide:grid-cols-2 max-tablet:grid-cols-1 max-tablet:rounded-xl"
        aria-label="QR code studio"
      >
        <div className="min-w-0 px-7.5 wide:px-8.75 max-desktop:px-5.5 max-tablet:px-5.75">
          <div className="flex h-14.25 items-center justify-between border-b border-line text-[9px] font-semibold tracking-[1.5px] max-tablet:h-12.75 [&>span]:flex [&>span]:items-center [&>span]:gap-1.75">
            <span>
              <span className="size-1.25 rounded-full bg-ink" /> THE STUDIO
            </span>
            <button
              className="flex items-center gap-1.5 bg-transparent py-2 pl-2 text-[10px] font-normal tracking-normal text-muted hover:text-ink"
              onClick={studio.reset}
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
          <ContentEditor
            value={studio.content}
            onChange={studio.updateContent}
            error={studio.error}
          />
          <DesignControls
            value={studio.design}
            onChange={studio.updateDesign}
          />
          <div className="flex items-center justify-center gap-1.75 pt-3.75 pb-5 text-[9px] text-muted">
            <LockKeyhole size={13} />
            <span>Your content stays right here. Always.</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col border-l border-line-strong bg-preview max-tablet:border-t max-tablet:border-l-0">
          <QRPreview
            qr={studio.qr}
            type={studio.content.type}
            support={studio.support}
            error={studio.error}
          />
          <ExportPanel
            value={studio.exportSettings}
            onChange={studio.updateExport}
            qr={studio.qr}
            support={studio.support}
            {...studio.exportActions}
          />
        </div>
      </section>
      {studio.notification.message && (
        <Toast
          message={studio.notification.message}
          onDismiss={studio.notification.dismiss}
        />
      )}
    </>
  );
}
