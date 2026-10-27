import { normalizeHexColor } from "@/lib/color";

/** Resolve theme hex values for the QR encoder and native color inputs. */
export function themeColor(token: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${token}`)
    .trim();
  const normalized = normalizeHexColor(value);
  if (!normalized) {
    throw new Error(`Theme color ${token} must be an opaque hex color.`);
  }
  return normalized;
}
