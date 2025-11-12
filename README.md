# sinarmas-fullstack-test

Monorepo containing small test projects for frontend and backend tasks used in the Sinarmas Fullstack assessment.

This repository contains four example projects demonstrating simple Vue, Express and Laravel APIs and a small fullstack integration example.

## Projects

- `q1-vue-component` — Vue 3 (TypeScript) component playground built with Vite.
- `q2-express-rest-api` — Minimal Express REST API implementing a todo endpoint.
- `q3-fullstack-integration` — Small fullstack example with a Vue frontend and a Node/Express backend (auth + todos).
  - frontend: `q3-fullstack-integration/frontend`
  - backend: `q3-fullstack-integration/backend`
- `q4-laravel-api` — Laravel API scaffold demonstrating standard Laravel routing and controllers.

## Prerequisites

- Node.js (recommended: 20.x or newer)
- npm or yarn
- PHP 8.2+ and Composer (for the Laravel project)

Optional (for convenience):

- `sqlite3` if you plan to use the default SQLite config for the Laravel app

## Quick setup & run

Below are short instructions to get each subproject running locally.

### q1-vue-component (Vue + Vite)

1. Install dependencies

```bash
cd q1-vue-component
npm install
```

2. Start dev server

```bash
npm run dev
```

Open the local dev URL printed by Vite (usually http://localhost:5173).

### q2-express-rest-api (Express)

1. Install dependencies

```bash
cd q2-express-rest-api
npm install
```

2. Start server

```bash
node server.js
```

Server listens on port 3000 by default. API base: `http://localhost:3000/api`

Endpoints (from `routes/todos.js`):

- GET /api/todos — list todos
- POST /api/todos — create todo
- PATCH /api/todos/:id — update todo
- DELETE /api/todos/:id — delete todo

### q3-fullstack-integration (Vue frontend + Express backend)

Frontend (Vite + Vue):

```bash
cd q3-fullstack-integration/frontend
npm install
npm run dev
```

Backend (Express):

```bash
cd q3-fullstack-integration/backend
npm install
node server.js
```

Notes:

- The backend implements a simple `/login` endpoint that issues a JWT and a set of todo endpoints mounted under `/todos` (see `backend/server.js`).
- The frontend is configured to use the router and will redirect to the login page by default.

### q4-laravel-api (Laravel)

1. Install dependencies

```bash
cd q4-laravel-api
composer install
```

2. Update .env file

```bash
DB_CONNECTION=sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

3. Run migrations

```bash
php artisan migrate --seed
php artisan serve
```

The Laravel dev server listens by default at `http://127.0.0.1:8000`. API routes from `routes/api.php` are available under the `/api` prefix (for example: `/api/users`).

## Troubleshooting

- Blank page in the Vue apps: confirm the app is served by Vite and the browser dev server is running. Check browser console for JS errors.
- 404 on Laravel `/api/*` routes: ensure `routes/api.php` is loaded in `bootstrap/app.php` (the repo includes a fix if routes were missing).
- Express routes not found: verify the server is running and that routes are mounted (see `server.js`).
