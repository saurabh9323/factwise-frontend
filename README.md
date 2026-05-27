# FactWise · People Dashboard

A dark/light-mode HR analytics dashboard built with React, Vite, Tailwind CSS v4, and Recharts.

---

## Tech Stack

| Layer       | Library / Tool                  |
|-------------|----------------------------------|
| Framework   | React 19                         |
| Build tool  | Vite 8                           |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Charts      | Recharts 3                       |
| Icons       | Lucide React                     |
| Fonts       | Sora (UI), JetBrains Mono (data) |

---

## Project Structure

```
src/
├── components/
│   ├── Charts.jsx          # Six analytics charts (Recharts)
│   ├── EmployeeTable.jsx   # Sortable, paginated data table
│   ├── KpiCards.jsx        # Summary stat cards
│   ├── Sidebar.jsx         # Department filter nav
│   ├── Toolbar.jsx         # Search + active/inactive filter
│   └── Topbar.jsx          # Header with theme toggle
├── data/
│   └── employees.js        # 20 mock employee records
├── hooks/
│   └── useEmployees.js     # Filter, sort, paginate logic
├── utils/
│   ├── constants.js        # DEPT_COLORS, DEPT_COLORS_LIGHT, PER_PAGE
│   └── helpers.js          # computeStats, groupByDept, formatters
├── App.css                 # Tailwind + CSS variable theme tokens
├── App.jsx                 # Root layout + theme state
└── main.jsx                # React entry point
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Scripts

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
npm run lint     # ESLint check
```

---

## Features

### Dashboard
- **KPI cards** — total headcount, active count, average salary, average rating, total projects
- **Six charts** — headcount by department, average salary, performance radar, active/inactive donut, projects by department, top 5 performers

### Employee Table
- **Sort** by any column (click header to toggle asc/desc)
- **Search** across name, role, department, location, and email
- **Filter** by department (sidebar) and active/inactive status (toolbar)
- **Pagination** — 8 rows per page

### Dark / Light Mode
Toggled via the button in the top-right corner of the header. The theme is applied by adding/removing the `light` class on `<html>`, which switches a full set of CSS custom properties defined in `App.css`.

---

## Theme System

All colors are CSS custom properties defined in `App.css`.

| Variable             | Dark value    | Light value   |
|----------------------|---------------|---------------|
| `--color-bg`         | `#0b0d10`     | `#f4f5f7`     |
| `--color-surface`    | `#13151a`     | `#ffffff`     |
| `--color-txt`        | `#eaedf4`     | `#0f1117`     |
| `--color-accent`     | `#4f8ef7`     | `#2563eb`     |
| `--color-green`      | `#22c55e`     | `#16a34a`     |
| `--color-amber`      | `#f59e0b`     | `#d97706`     |

Dark mode is the default. Light mode activates when `html.light` is present.

Department pill colors are also theme-aware — `DEPT_COLORS` is used in dark mode and `DEPT_COLORS_LIGHT` (with higher-contrast text) is used in light mode.

---

## Data

Employee records live in `src/data/employees.js` as a plain JS array — no API or database required. Each record includes:

```js
{
  id, firstName, lastName, email,
  department, position, salary,
  hireDate, age, location,
  performanceRating, projectsCompleted,
  isActive, skills, manager
}
```

To use real data, replace this file with an API call or import from a different source. The `useEmployees` hook consumes `employees` directly, so no other changes are needed.

---

## Customisation

**Add a department** — add an entry to `DEPT_COLORS` and `DEPT_COLORS_LIGHT` in `constants.js` with `bg`, `text`, `border`, and `chart` values.

**Change page size** — update `PER_PAGE` in `constants.js`.

**Add a table column** — add an entry to the `COLUMNS` array in `EmployeeTable.jsx` and render the corresponding cell in the `data.map()` block.
