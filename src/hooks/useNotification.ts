import { useEffect, useRef, useState } from "react";

export function useNotification() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function dismiss() {
    clearTimeout(timer.current);
    setMessage("");
  }

  function notify(value: string) {
    clearTimeout(timer.current);
    setMessage(value);
    timer.current = setTimeout(() => setMessage(""), 4500);
  }

  return { message, notify, dismiss };
}
