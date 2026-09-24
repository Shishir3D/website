# Shishir Poudel's portfolio

A sketchbook-inspired portfolio about a curious frog climbing out of a well. The site pairs original hand-drawn films, a scroll-driven Three.js scene and a photo archive with Shishir's AI engineering work and experience.

## Develop

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Vite serves `src/` as the app root and `public/` as static assets. The built `dist/` directory is deployed to GitHub Pages by `.github/workflows/deploy-pages.yml`; generated output is never committed. `public/CNAME` retains the custom domain.

## Content and assets

- `src/content.ts` holds the journey, selected work, GitHub projects and capabilities.
- `src/App.tsx` holds the experience, credentials and contact copy.
- `src/components/DoodleScene.tsx` renders the lightweight 3D well. Its SVG fallback and the page content work without WebGL. Motion respects the system reduced-motion preference.
- `public/media/` contains short, silent MP4 loops and WebP stills. The editable animation source and storyboard are in `creative/visual/`. To render again, run `npm ci` in that directory and see `creative/visual/STORYBOARD.md`.
- `public/resume/` contains the public, phone-free PDF. Regenerate it with `python3 scripts/build-resume.py` after installing ReportLab.
- `public/fonts/` contains locally hosted Space Grotesk, IBM Plex Mono and Caveat with their OFL licenses.

The original resume PDF is local reference material and is ignored by Git. Public personal details and project claims should be checked against Shishir's resume and [GitHub profile](https://github.com/Shishir3D).

## Field notes and scroll motion

The scroll-linked page stages use the reviewed [scroll-craft](https://github.com/nateherkai/scroll-craft) runtime in `src/vendor/` (MIT license included). The creative brief is `creative/scrollcraft/BRIEF.md`. Its external asset service is not used.

Add real photos to `src/assets/photos/` and rebuild; the gallery imports supported image files automatically. Three starter event scenes were generated with ChatGPT Image and are labeled as illustrative placeholders on the page. See `src/assets/photos/README.md` before replacing them. The existing portrait is an authentic photo. Keep event captions factual.
