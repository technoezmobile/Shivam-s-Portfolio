# Shivam Singh Portfolio

React, TypeScript and Vite portfolio with GSAP animations and local media assets.

## Run locally

Use a currently supported Node.js LTS release.

```sh
npm ci
npm run dev
```

The development server uses port 3000.

## Build and preview

```sh
npm run build
npm run preview
```

The production output is in `dist/`. Serve it through a web server; do not open `dist/index.html` directly from the filesystem.

## Deploy

- Vercel: use the Vite framework preset, build command `npm run build`, and output directory `dist`.
- Static hosting: upload the contents of `dist/` to the website root, including its assets directory.
- The ZIP includes source, public assets and a freshly built `dist/`. Dependencies are excluded; install them with `npm ci` when rebuilding.
- No deployment credentials or environment variables are required by this static frontend.

## Media and previews

- The hero introduction and January 2026 personal film are included as local video files.
- Browser autoplay with sound may require user interaction; playback controls remain available.
- The Technoez Mobile project image is explicitly labelled as an AI-generated website concept, not a live-site screenshot.
- External website, social and YouTube links depend on their respective services.
