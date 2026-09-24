# Repository instructions for coding agents

## Project shape

- This is Shishir Poudel’s portfolio, built with React, TypeScript, Vite, and Three.js.
- Vite uses `src/` as its root and `../public` as its static asset directory. Edit `src/index.html` for the main page metadata; the top-level `index.html` is generated and ignored.
- Keep project facts, personal details, social links, and contact information consistent with the existing portfolio source.

## Design and content

- Preserve the portfolio’s story arc: well, rim, valley, horizon. Keep headings, project descriptions, navigation, and contact actions in semantic HTML.
- Keep the layout usable at narrow phone widths, keyboard reachable, and compatible with `prefers-reduced-motion`.
- Treat decorative 3D layers as enhancement. Keep the essential story and controls available without WebGL, and include meaningful image text where artwork communicates content.
- Use one page-level `h1`; use nested headings for later sections and story chapters.

## Three.js guidance

- The project declares Three.js as `^0.185.1`; follow the version resolved in `package-lock.json` and the existing React/Vite structure. Do not add another 3D framework or upgrade dependencies without a clear need.
- Relevant downloaded guidance is under `.agents/skills/`. Start with `threejs-web`, then read only the focused skills needed for the change, such as `threejs-scene`, `threejs-accessibility`, `threejs-html`, or `threejs-performance`.
- Check current canvas ownership, resize behavior, reduced-motion handling, fallback behavior, and GPU-resource cleanup before changing a 3D scene.

## Search and metadata

- Keep the canonical public identity as Shishir Poudel and the confirmed public handle as Shishir3D.
- Prefer clear titles, descriptions, crawlable links, truthful structured data, and useful visible content. Do not add speculative misspellings or keyword-stuffed metadata.
- Keep `public/robots.txt` and `public/sitemap.xml` in sync when public pages change.

## Privacy and source material

- Do not publish a phone number or the name of Shishir's college or university on the site or in the downloadable resume.
- The original `Shishir Poudel Resume.pdf` is local source material and is ignored. Publish only the sanitized PDF in `public/resume/`.
- Keep source media under `creative/visual/`, site media under `public/media/`, and editable site content under `src/`.

## Change and delivery habit

- After each coherent task, run the relevant checks, make one focused commit, and open a small PR.
- Review the PR diff and checks, then merge it to `main` and verify deployment. The repository owner has explicitly authorized agents to push, open and merge PRs, and push to `main` without a separate approval request.
- Keep generated Vite output out of Git. GitHub Pages deploys the `dist/` artifact through `.github/workflows/deploy-pages.yml`.
- Prefer reversible changes and ordinary merges; do not force push or rewrite shared history.

## Photo archive

- Add authentic event photos to `src/assets/photos/` with descriptive filenames. The gallery imports them at build time. Keep AI-generated placeholder scenes visibly labeled until replaced.
- When changing scroll-driven visuals, verify the initial, middle and final story positions at desktop and narrow phone widths, including the SVG fallback and reduced-motion mode.
