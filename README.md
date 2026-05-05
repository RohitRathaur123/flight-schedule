# Flight Schedule Management — Teleport Senior React Developer Assessment

A production-ready internal operations tool for viewing, filtering, and managing flight schedule data.

## Tech Stack

- **React 18** + Vite
- **react-window** — virtual scrolling for 200+ rows with zero lag
- **lucide-react** — icons
- **DM Sans** + **Space Mono** — typography

## Features

- **Virtual scrolling** — renders only visible rows via `react-window`
- **Inline editing** — edit dates, times, and status per row with Save/Cancel
- **Async save simulation** — 800ms delay, ~15% random failure rate with error indicator and revert
- **Status toggle** — instant local state flip per row
- **Delete** — single-row delete button + multi-select bulk delete
- **Filters (AND logic)**:
  - Full-text search by flight number, origin, destination
  - Date range (operational period overlap)
  - Days of operation (multi-select Mon–Sun)
  - Status (Active / Inactive)
  - AOC (airline operating code)
  - Body type (narrow / wide)
- **Clear All** filters button with active filter count

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Design Notes

- Dark industrial aesthetic with monospace typography for data density
- CSS variables for theming consistency
- AOC codes are color-coded for quick visual scanning
- No external UI component library — all custom CSS
