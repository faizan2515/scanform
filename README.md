# Scanform

A private, browser-only QR studio built with React, TypeScript, and Vite.

## Run locally

```bash
npm install
npm run dev
```


## Features

- Live QR codes for website links, arbitrary text, Wi-Fi credentials, and email drafts.
- Five palettes, custom colors, classic and soft patterns, and contrast feedback.
- PNG exports at 512, 1024, 2048, or 4096 pixels; scalable SVG exports; image copying when permitted.
- Browser checks for SVG, canvas, Blob URLs, and downloads, with export failure feedback.
- Responsive layout, keyboard-accessible tabs, native help dialog, and reduced-motion support.

Generation uses the bundled `qrcode` encoder. No native QR browser API is necessary. Input is held in memory; the app has no backend, analytics, remote fonts, storage, or generation requests. Wi-Fi QR codes contain the network credentials, so share them intentionally. Clipboard access depends on browser permissions and a secure context.

The app works without generation network requests after loading. It does not install a service worker or promise offline reloads. Static QR codes do not expire, but their destination or network credentials may change.

## Code organization

- `src/App.tsx` composes the page and opens the help dialog.
- `src/components/layout/` contains the header, introduction, benefits, and footer.
- `src/components/studio/` contains the controlled content editor, design controls, QR preview, export panel, and studio composition.
- `src/hooks/useQRStudio.ts` owns the studio state, payload validation, QR generation, and reset behavior.
- `src/hooks/useQRExport.ts` handles download and clipboard actions; `useNotification.ts` manages temporary notifications and timer cleanup.
- `src/lib/` separates content encoding, QR rendering, contrast calculation, browser capability checks, and file export utilities.
- `src/config/studio.ts` defines content types, palettes, and initial settings.
- `src/types/qr.ts` contains the shared domain types.

## Styling

Components use Tailwind CSS v4 utilities. The `@theme static` block in `src/index.css` is the single source for colors, fonts, responsive breakpoints, shadows, the preview grid, and notification animation. Only shared document defaults and reduced-motion behavior remain in the base stylesheet.

QR palettes in `src/config/studio.ts` reference theme token names and complete Tailwind class names. `src/lib/theme.ts` resolves their hex values for the encoder and native color inputs. Keep QR ink/paper tokens as six-digit hex values. Custom user-selected colors remain runtime values and are embedded in downloaded files.

## Checks

```bash
npm test
npm run build
npm run lint
```

Tests render the actual generated SVGs with Resvg and decode them independently with jsQR. They cover payload types, Unicode, Wi-Fi escaping, email encoding, palettes, both patterns, correction levels, and invalid/oversized inputs. Test tooling is development-only and is not included in the application bundle. The test command uses tsx with the app's TypeScript configuration so tests and application imports share the `@/` source alias. Vite and TypeScript both map `@/` to `src/`.
