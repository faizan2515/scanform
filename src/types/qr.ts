export type Correction = "L" | "M" | "Q" | "H";
export type ContentType = "url" | "text" | "wifi" | "email";
export type Content = {
  type: ContentType;
  url: string;
  text: string;
  ssid: string;
  password: string;
  security: string;
  hidden: boolean;
  email: string;
  subject: string;
  message: string;
};

export type DesignSettings = {
  foreground: string;
  background: string;
  rounded: boolean;
  correction: Correction;
};
export type ExportSettings = { format: "png" | "svg"; size: number };
export type QRResult = { svg: string; size: number; error: string };
export type BrowserSupport = {
  svg: boolean;
  canvas: boolean;
  download: boolean;
};
