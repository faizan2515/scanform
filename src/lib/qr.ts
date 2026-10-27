import QRCode from "qrcode";
import type { Correction } from "@/types/qr";
export function makeQR(
  value: string,
  ink: string,
  paper: string,
  soft: boolean,
  correction: Correction,
) {
  const code = QRCode.create(value, { errorCorrectionLevel: correction });
  const size = code.modules.size,
    dimension = size + 8;
  const blocks: string[] = [];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      if (!code.modules.get(y, x)) continue;
      const finder =
        (x < 7 && y < 7) ||
        (x >= size - 7 && y < 7) ||
        (x < 7 && y >= size - 7);
      blocks.push(
        `<rect x="${x + 4}" y="${y + 4}" width="1" height="1"${soft && !finder ? ' rx="0.22"' : ""}/>`,
      );
    }
  return {
    size,
    svg: `<svg shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dimension} ${dimension}" width="1024" height="1024"><rect width="${dimension}" height="${dimension}" fill="${paper}"/><g fill="${ink}">${blocks.join("")}</g></svg>`,
  };
}
