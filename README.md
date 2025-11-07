# Humanistics AI

This repository contains the Humanistics Portal web application built with React, TypeScript, Vite.

## Prerequisites

- Node.js 18+ (recommended LTS)
- npm 9+

## Project Structure

- `humanistics-portal/`
  - `src/`
    - `api/` — API clients and auth helpers
    - `components/` — Reusable UI components
    - `data/` — Local JSON data and fixtures
    - `pages/` — Route pages like `Dashboard.tsx`, `Login.tsx`, etc.
  - `index.html` — App entry HTML
  - `package.json` — App scripts and dependencies
  - `vite.config.ts` — Vite configuration with TS path aliases
- `package-lock.json` — Root lockfile (generated)

## Getting Started

Install dependencies:

```bash
cd humanistics-portal
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Tech Stack

- React 18
- TypeScript 5
- Vite 5
- React Router 6
- Emotion (styling engine for MUI)
- Redux Toolkit
- Jest + React Testing Library(for unit testing)

---

## 🧪 Testing Setup (Jest)

Unit and component tests are configured using **Jest** and **React Testing Library**.

### ✅ Running Tests
```bash
npm run test
```

This uses the Jest configuration file located at:
```
tests/jest.config.cjs
```

### 🧩 Key Packages
- `jest` — Core testing framework  
- `ts-jest` — TypeScript preprocessor for Jest  
- `@testing-library/react` — Testing React components  
- `@testing-library/jest-dom` — Custom DOM matchers  
- `identity-obj-proxy` — Handles CSS module mocking  
- `jest-environment-jsdom` — Browser-like environment for tests  

### 🧭 Notes
- All Jest setup is done under `tests/` directory.
- Use `.test.tsx` or `.spec.tsx` for React component tests.
- Mock selectors, API calls, and hooks using Jest’s built-in mocking utilities.

## Environment Variables

If you introduce environment variables, create a `.env` file in `humanistics-portal/` and prefix variables with `VITE_` to expose them to the client, e.g. `VITE_API_BASE_URL`.

Example `.env`:
```env
VITE_API_BASE_URL=https://api.example.com
```

Access in code:
```ts
const baseUrl = import.meta.env.VITE_API_BASE_URL
```

## Scripts (in `humanistics-portal/package.json`)

- `dev` — Run Vite dev server
- `build` — Type-check then build with Vite
- `preview` — Preview the production build

## Coding Standards

- Keep imports at the top of files.
- Prefer functional components and React hooks.
- Use TypeScript types/interfaces for component props and API responses.
- Keep UI concerns in components and data fetching in `api/`.

## Troubleshooting
- If path aliases fail to resolve, ensure the dev server was started from `humanistics-portal/` and `vite-tsconfig-paths` is installed/configured.

## License

Proprietary — All rights reserved.
