/** Resolve theme hex values for the QR encoder and native color inputs. */
export function themeColor(token: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${token}`)
    .trim();
  if (!/^#[0-9a-f]{6}$/i.test(value)) {
    throw new Error(`Theme color ${token} must be a six-digit hex value.`);
  }
  return value;
}
