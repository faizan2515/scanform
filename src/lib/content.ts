import type { Content } from "@/types/qr";
export function buildContent(data: Content) {
  const escape = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
  if (data.type === "url") {
    const value = data.url.trim();
    if (!value) return { value: "", error: "" };
    try {
      const parsed = new URL(value);
      if (!["https:", "http:"].includes(parsed.protocol)) throw new Error();
      return { value: parsed.href, error: "" };
    } catch {
      return {
        value: "",
        error: "Enter a complete address, starting with https:// or http://.",
      };
    }
  }
  if (data.type === "text")
    return { value: data.text.trim() ? data.text : "", error: "" };
  if (data.type === "wifi")
    return {
      value: data.ssid
        ? `WIFI:T:${data.security};S:${escape(data.ssid)};${data.security !== "nopass" ? `P:${escape(data.password)};` : ""}H:${data.hidden};;`
        : "",
      error: "",
    };
  if (!data.email.trim()) return { value: "", error: "" };
  if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(data.email.trim()))
    return { value: "", error: "Enter a valid email address." };
  return {
    value: `mailto:${data.email.trim()}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.message)}`,
    error: "",
  };
}
