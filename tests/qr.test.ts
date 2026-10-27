import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { Resvg } from "@resvg/resvg-js";
import jsQR from "jsqr";
import { buildContent } from "@/lib/content.ts";
import { contrastRatio, normalizeHexColor } from "@/lib/color.ts";
import { makeQR } from "@/lib/qr.ts";
import { themeColor } from "@/lib/theme.ts";
import type { Content, Correction } from "@/types/qr.ts";

const blank: Content = {
  type: "text",
  text: "",
  url: "",
  ssid: "",
  password: "",
  security: "WPA",
  hidden: false,
  email: "",
  subject: "",
  message: "",
};
function decode(svg: string) {
  const image = new Resvg(svg, {
    fitTo: { mode: "width", value: 1024 },
    font: { loadSystemFonts: false },
  }).render();
  return jsQR(new Uint8ClampedArray(image.pixels), image.width, image.height)
    ?.data;
}
const payloads = [
  buildContent({
    ...blank,
    type: "url",
    url: "https://example.com/path?q=hello%20world&lang=en#section",
  }).value,
  buildContent({ ...blank, text: "Hello! مرحباً بالعالم 🌍 café 日本語" })
    .value,
  buildContent({
    ...blank,
    type: "wifi",
    ssid: "Studio;Guest",
    password: "p:a;s\\word",
    hidden: true,
  }).value,
  buildContent({
    ...blank,
    type: "email",
    email: "hello@example.com",
    subject: "Hello & welcome",
    message: "Line one\nLine two? مرحباً",
  }).value,
];
for (const [index, value] of payloads.entries()) {
  test(`content type ${index + 1} survives SVG rendering and independent decoding`, () => {
    assert.ok(value);
    assert.equal(
      decode(makeQR(value, "#202720", "#ffffff", false, "M").svg),
      value,
    );
  });
}
// Decode the actual theme palettes so a token change is checked for scanability.
const theme = readFileSync(
  new URL("../src/index.css", import.meta.url),
  "utf8",
);
const themePalettes = [
  ...theme.matchAll(/--color-qr-([a-z]+)-ink:\s*(#[0-9a-f]{6});/gi),
].map(([, name, ink]) => {
  const paper = theme.match(
    new RegExp("--color-qr-" + name + "-paper:\\s*(#[0-9a-f]{6});", "i"),
  )?.[1];
  assert.ok(paper, "Every QR ink token must have a paper token");
  return [ink, paper];
});
assert.ok(themePalettes.length > 0, "QR palette tokens must be present");
for (const [ink, paper] of themePalettes) {
  for (const soft of [false, true])
    test(`palette ${ink}, ${soft ? "soft" : "classic"} remains scannable`, () => {
      assert.equal(
        decode(makeQR(payloads[0], ink, paper, soft, "M").svg),
        payloads[0],
      );
      assert.ok(contrastRatio(ink, paper).ratio >= 4.5);
    });
}
for (const correction of ["L", "M", "Q", "H"] as Correction[])
  test(`correction ${correction} preserves long text`, () => {
    const value = "A meaningful message. ".repeat(30);
    assert.equal(
      decode(makeQR(value, "#202720", "#ffffff", true, correction).svg),
      value,
    );
  });
test("invalid and empty inputs do not silently produce a code", () => {
  for (const url of ["example.com", "javascript:alert(1)", "ftp://example.com"])
    assert.ok(buildContent({ ...blank, type: "url", url }).error);
  assert.equal(buildContent(blank).value, "");
  assert.equal(buildContent({ ...blank, text: "   " }).value, "");
  assert.ok(buildContent({ ...blank, type: "email", email: "invalid" }).error);
  assert.throws(() =>
    makeQR("😀".repeat(2000), "#202720", "#ffffff", false, "H"),
  );
});
test("Wi-Fi escaping and email encoding preserve special characters", () => {
  assert.equal(
    payloads[2],
    "WIFI:T:WPA;S:Studio\\;Guest;P:p\\:a\\;s\\\\word;H:true;;",
  );
  assert.equal(
    buildContent({
      ...blank,
      type: "wifi",
      ssid: "Guest",
      security: "nopass",
      password: "unused",
    }).value,
    "WIFI:T:nopass;S:Guest;H:false;;",
  );
  const parsed = new URL(payloads[3]);
  assert.equal(parsed.searchParams.get("subject"), "Hello & welcome");
  assert.equal(parsed.searchParams.get("body"), "Line one\nLine two? مرحباً");
});
test("contrast flags indistinguishable and inverted colors", () => {
  assert.equal(contrastRatio("#ffffff", "#ffffff").ratio, 1);
  assert.equal(contrastRatio("#ffffff", "#202720").inverted, true);
});

test("CSS shorthand colors normalize to six-digit encoder and input values", () => {
  assert.equal(normalizeHexColor("#fff"), "#ffffff");
  assert.equal(normalizeHexColor("#000"), "#000000");
  assert.equal(normalizeHexColor(" #AbC "), "#aabbcc");
  assert.equal(normalizeHexColor("#192943"), "#192943");
  for (const value of ["", "#ff", "#ggg", "#ffff", "transparent"]) {
    assert.equal(normalizeHexColor(value), null);
  }
});

test("theme resolver accepts the production-minified white token", (t) => {
  const keys = ["document", "getComputedStyle"] as const;
  const originals = keys.map((key) =>
    Object.getOwnPropertyDescriptor(globalThis, key),
  );
  t.after(() => {
    keys.forEach((key, index) => {
      const descriptor = originals[index];
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    });
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: { documentElement: {} },
  });
  Object.defineProperty(globalThis, "getComputedStyle", {
    configurable: true,
    value: () => ({
      getPropertyValue: (key: string) =>
        key === "--color-qr-original-paper" ? "#fff" : "",
    }),
  });

  const paper = themeColor("qr-original-paper");
  assert.equal(paper, "#ffffff");
  assert.equal(
    decode(makeQR(payloads[0], "#192943", paper, false, "M").svg),
    payloads[0],
  );
  assert.throws(() => themeColor("missing"), /opaque hex color/);
});
