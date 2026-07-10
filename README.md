# Bhavi's Website

Personal portfolio site — plain HTML, CSS, and JS, no build step.

## Structure

- `index.html` — all page content, in one scrollable single-page layout
- `css/styles.css` — design tokens (CSS variables) + all styling, including dark mode
- `js/main.js` — dark mode toggle, mobile nav, scroll-reveal animation
- `assets/images/` — put screenshots and other images here

## Editing

Search the codebase for `TODO:` comments — each one marks a placeholder that needs
real content (bio text, project descriptions, links, resume, etc.).

## Local preview

No build tools required. Either:

- Open `index.html` directly in a browser, or
- Run a local static server, e.g. `npx serve .` or the VS Code "Live Server" extension

## Deploying

**Vercel**: import this folder as a project — no framework preset needed, it will
serve `index.html` as a static site automatically.

**GitHub Pages**: push to a GitHub repo, then enable Pages for the repo pointing at
the `main` branch, root directory.
