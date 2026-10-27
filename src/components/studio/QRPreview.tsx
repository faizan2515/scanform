import { MoveUpRight, QrCode, ScanLine } from "lucide-react";
import { contentTypes } from "@/config/studio";
import type { BrowserSupport, ContentType, QRResult } from "@/types/qr";

export default function QRPreview({
  qr,
  type,
  support,
  error,
}: {
  qr: QRResult;
  type: ContentType;
  support: BrowserSupport;
  error: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-2.5 px-6.5 pt-5.75 max-desktop:px-4.5 max-tablet:px-5.5 max-tablet:pt-5.25 [&>span:first-child]:text-[8px] [&>span:first-child]:tracking-[1.4px] [&>span:first-child]:text-muted max-desktop:[&>span:first-child]:text-[7px] max-desktop:[&>span:first-child]:tracking-[1px] max-tablet:[&>span:first-child]:text-[8px]">
        <span>YOUR LITTLE CONNECTION</span>
        <span className="flex items-center gap-1.25 rounded-sm bg-status-surface px-1.75 py-1.25 text-[9px] text-status-ink [&>span]:size-1">
          <span className="inline-block size-1.5 shrink-0 rounded-full bg-status" />{" "}
          Live preview
        </span>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center bg-preview-grid bg-size-[15px_15px] bg-clip-content px-10 pt-8.5 pb-6.75 wide:pt-10 wide:pb-8.75 max-desktop:px-6.25 max-tablet:px-10 max-tablet:pt-8.5 max-tablet:pb-7.25">
        <span className="absolute text-base font-extralight text-decoration top-10 left-8.5">
          +
        </span>
        <span className="absolute text-base font-extralight text-decoration right-9 bottom-19.75">
          +
        </span>
        <div className="w-63.5 max-w-full rounded-sm border border-line-soft bg-paper px-4.75 pt-4.25 pb-3.5 shadow-qr transition-shadow duration-200 hover:shadow-qr-hover wide:w-67.5 max-tablet:w-63.75">
          <div className="flex items-center gap-1.5 border-b border-line-soft pt-px pb-3.25 text-[7px] font-semibold tracking-[1.2px] text-muted [&>svg:last-child]:ml-auto">
            <QrCode size={13} />
            <span>SCAN TO CONNECT</span>
            <MoveUpRight size={13} />
          </div>
          <div
            className="-mx-1.25 mt-2.25 mb-0.5 flex aspect-square items-center justify-center [&>div]:size-full [&_svg]:block [&_svg]:size-full"
            role="img"
            aria-label={
              qr.svg
                ? `${contentTypes.find((t) => t.id === type)?.label} QR code preview`
                : "QR code preview is empty"
            }
          >
            {support.svg && qr.svg ? (
              <div dangerouslySetInnerHTML={{ __html: qr.svg }} />
            ) : (
              <div className="flex flex-col items-center justify-center p-5 text-center text-muted-soft [&>p]:text-[11px] [&>p]:leading-[1.6]">
                <ScanLine size={55} strokeWidth={1} />
                <p>
                  {!support.svg
                    ? "SVG rendering is unavailable in this browser."
                    : error
                      ? "Your code will appear here once the content is ready."
                      : "A little content. A new connection."}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-between border-t border-line-soft pt-2.75 text-[8px] text-muted [&>span:last-child]:text-sm [&>span:last-child]:leading-2">
            <span>Made for the real world.</span>
            <span>↗</span>
          </div>
        </div>
        <div className="mt-6.5 flex items-center gap-2 text-[10px] text-muted max-tablet:mt-6.25 max-tablet:text-[9px]">
          <span className="h-px w-4.75 bg-decoration" /> Point your camera. Open
          a possibility.
        </div>
      </div>
    </>
  );
}
