import { Check, X } from "lucide-react";

export default function Toast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div
      className="fixed bottom-6.25 left-1/2 z-10 flex w-max max-w-[calc(100%-30px)] -translate-x-1/2 animate-toast-in items-center gap-2.5 rounded-[9px] border border-toast-border bg-toast px-4.75 py-3.75 text-xs leading-normal text-toast-ink shadow-toast [&>svg]:shrink-0 [&>button]:ml-3 [&>button]:flex [&>button]:bg-transparent [&>button]:p-0.75 [&>button]:text-toast-muted"
      role="status"
    >
      <Check size={17} />
      {message}
      <button onClick={onDismiss} aria-label="Dismiss notification">
        <X size={15} />
      </button>
    </div>
  );
}
