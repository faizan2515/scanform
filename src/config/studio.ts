import { themeColor } from "@/lib/theme";
import { Link, Type, Wifi, Mail } from "lucide-react";
import type { Content, DesignSettings, ExportSettings } from "@/types/qr";
export const contentTypes = [
  { id: "url", label: "Website", icon: Link },
  { id: "text", label: "Text", icon: Type },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "email", label: "Email", icon: Mail },
] as const;
export const palettes = [
  {
    name: "Original",
    inkToken: "qr-original-ink",
    paperToken: "qr-original-paper",
    className: "bg-qr-original-paper text-qr-original-ink",
  },
  {
    name: "Forest",
    inkToken: "qr-forest-ink",
    paperToken: "qr-forest-paper",
    className: "bg-qr-forest-paper text-qr-forest-ink",
  },
  {
    name: "Indigo",
    inkToken: "qr-indigo-ink",
    paperToken: "qr-indigo-paper",
    className: "bg-qr-indigo-paper text-qr-indigo-ink",
  },
  {
    name: "Terracotta",
    inkToken: "qr-terracotta-ink",
    paperToken: "qr-terracotta-paper",
    className: "bg-qr-terracotta-paper text-qr-terracotta-ink",
  },
  {
    name: "Midnight",
    inkToken: "qr-midnight-ink",
    paperToken: "qr-midnight-paper",
    className: "bg-qr-midnight-paper text-qr-midnight-ink",
  },
];
export const defaultContent: Content = {
  type: "url",
  url: "https://example.com",
  text: "",
  ssid: "",
  password: "",
  security: "WPA",
  hidden: false,
  email: "",
  subject: "",
  message: "",
};
export function resolvePalettes() {
  return palettes.map((palette) => ({
    ...palette,
    ink: themeColor(palette.inkToken),
    paper: themeColor(palette.paperToken),
  }));
}
export function createDefaultDesign(): DesignSettings {
  return {
    foreground: themeColor("qr-original-ink"),
    background: themeColor("qr-original-paper"),
    rounded: false,
    correction: "M",
  };
}
export const defaultExport: ExportSettings = { format: "png", size: 1024 };
