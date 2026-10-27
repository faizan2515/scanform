import type { KeyboardEvent } from "react";
import type { Content } from "@/types/qr";
import { contentTypes } from "@/config/studio";
import ContentFields from "@/components/studio/ContentFields";

export default function ContentEditor({
  value,
  onChange,
  error,
}: {
  value: Content;
  onChange: (patch: Partial<Content>) => void;
  error: string;
}) {
  const { type } = value;
  function navigateTabs(event: KeyboardEvent<HTMLDivElement>) {
    const current = contentTypes.findIndex((item) => item.id === type);
    const next =
      event.key === "ArrowRight"
        ? (current + 1) % contentTypes.length
        : event.key === "ArrowLeft"
          ? (current + contentTypes.length - 1) % contentTypes.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? contentTypes.length - 1
              : -1;
    if (next < 0) return;
    event.preventDefault();
    onChange({ type: contentTypes[next].id });
    event.currentTarget.querySelectorAll("button")[next]?.focus();
  }
  return (
    <section className="pt-6.75 pb-6 wide:pt-7.5 wide:pb-6.75 max-tablet:py-6">
      <div className="flex items-center gap-3">
        <span className="flex size-6 items-center justify-center rounded-full border border-line text-[9px] text-muted">
          01
        </span>
        <h2 className="m-0 text-[17px] font-medium tracking-[-0.45px]">
          Make a connection
        </h2>
      </div>
      <p className="mt-2.5 mb-5 ml-8 text-[11px] text-muted">
        What would you like to share?
      </p>
      <div
        className="mb-6 grid grid-cols-4 gap-2"
        role="tablist"
        onKeyDown={navigateTabs}
        aria-label="QR content type"
      >
        {contentTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`tab-${id}`}
            role="tab"
            tabIndex={type === id ? 0 : -1}
            aria-selected={type === id}
            aria-controls="content-fields"
            className="flex h-16 flex-col items-center justify-center gap-2 rounded-[7px] border border-line bg-paper text-[10px] text-muted hover:bg-surface aria-selected:border-selection aria-selected:bg-selection-surface aria-selected:text-selection-ink aria-selected:shadow-selected max-tablet:h-16"
            onClick={() => onChange({ type: id })}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>
      <ContentFields value={value} onChange={onChange} error={error} />
    </section>
  );
}
