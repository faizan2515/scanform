export function browserSupport() {
  let canvas = false;
  try {
    canvas = !!document.createElement("canvas").getContext("2d");
  } catch {
    /* SVG is independent of canvas. */
  }
  return {
    svg: !!document.createElementNS("http://www.w3.org/2000/svg", "svg")
      .createSVGRect,
    download:
      typeof Blob !== "undefined" &&
      typeof URL.createObjectURL === "function" &&
      "download" in document.createElement("a"),
    canvas,
  };
}
