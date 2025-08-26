# Ops Ticket View

A lightweight, modern React app for creating and tracking operational tickets across DevOps, DBA, System Admins, Cyber, IA, Cloud, and Processes. It includes dynamic tool-specific workflows (e.g., GitHub/GitLab group access, LDAP/IDM group management), filtering, sorting, CSV export, dark mode, and a simple modal-driven status update flow.

Live (GitHub Pages): https://kelleyblackmore.github.io/ops-ticket-view/

## Features

- Ticket creation with categories, tools, types, priority, environment
- Dynamic fields for workflows (e.g., GitHub/GitLab Group Access; LDAP/IDM Create/Update/Add to Group)
- Search, filters (category, status, environment) and sorting
- CSV export of the current view
- Dark/light theme toggle with persistence
- Ticket modal for quick status updates with toasts
- LocalStorage persistence (no backend required)

## Quick start (local dev)

From the `ticketing-system` folder:

- Install: npm install
- Run dev server: npm run dev
- Open: http://localhost:5173

Build:

- Production build: npm run build
- Preview build: npm run preview

## Deploy options

1) GitHub Pages via branch (gh-pages)
- Workflow: `.github/workflows/deploy-gh-pages-branch.yml`
- Settings → Pages → Build and deployment → Source = “Deploy from a branch” → Branch = `gh-pages` / root

2) GitHub Pages via Actions
- Workflow: `.github/workflows/deploy-gh-pages.yml`
- Settings → Pages → Source = “GitHub Actions”
- Ensure Actions GITHUB_TOKEN has “Read and write permissions” (Settings → Actions → General)

Vite base path is automatically set for Pages builds, and 404.html is included for SPA routing.

## Install and run as a package (GitHub Packages)

This repo also ships a package with a small CLI to serve the built app.

Package name: `@kelleyblackmore/ops-ticket-view`

Publish (GitHub Packages):
- Configure your `~/.npmrc` with a token that has `write:packages` and the GitHub registry for the `@kelleyblackmore` scope.
- From `ticketing-system`: `npm publish`

Install & run locally in another project:
- `npm install @kelleyblackmore/ops-ticket-view --registry=https://npm.pkg.github.com/`
- `npx ops-ticket-view` (or `PORT=8080 npx ops-ticket-view`)

CI for publishing on release: `.github/workflows/publish-gpr.yml`

## Project structure

- `ticketing-system/` Vite + React app
	- `src/components/` Dashboard, TicketForm, TicketList, TicketModal, etc.
	- `src/data/categories.js` Categories, tools, types, statuses, priorities, environments
	- `bin/ops-ticket-view.cjs` CLI to serve the `dist` build
	- `vite.config.js` Vite config with dev proxy and Pages base

## Scripts (in ticketing-system)

- `npm run dev` start Vite dev server
- `npm run build` build production assets
- `npm run preview` preview the production build

## Contributing

PRs are welcome. Please open an issue to discuss larger changes. Keep the UI accessible (contrast, keyboard navigation) and avoid breaking the public package interface.

## License

MIT © 2025 Kelley Blackmore
See `LICENSE` for details.
