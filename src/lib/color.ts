export function contrastRatio(a: string, b: string) {
  function luminance(hex: string) {
    const c = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
  }
  const dark = luminance(a),
    light = luminance(b);
  return {
    ratio: (Math.max(dark, light) + 0.05) / (Math.min(dark, light) + 0.05),
    inverted: dark >= light,
  };
}
