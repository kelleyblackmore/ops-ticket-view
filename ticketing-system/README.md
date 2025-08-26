# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploy to GitHub Pages

This project includes a GitHub Actions workflow to deploy the Vite build to GitHub Pages.

Steps:
- Ensure your default branch is `main` or update the workflow branch filter.
- In your repository settings, enable Pages with: Source = GitHub Actions.
- Push to `main` to trigger the workflow.

Notes:
- The Vite `base` is set for Pages (`/ops-ticket-view/`) when `GITHUB_PAGES=true`.
- A `404.html` copy of `index.html` is created post-build for SPA routing on Pages.

## Install and run as a package (GitHub Packages)

Publish:
- Set an auth token with `write:packages` in your npm config for GitHub Packages.
- From `ticketing-system`, run: npm publish

Install locally:
- In another project: npm install @kelleyblackmore/ops-ticket-view --registry=https://npm.pkg.github.com/

Run:
- After install: npx ops-ticket-view
- Or if installed globally: ops-ticket-view
