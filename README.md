# SkillsBridge

SkillsBridge connects students and recruiters through verified university profiles, projects, and skills.

## Stack

- **Frontend:** Vue 3, Vite, Pinia, Vue Router, Tailwind CSS
- **Backend:** Express, SQLite, JWT auth, Nodemailer (email verification)

## Local development

### Backend

1. From project root: `cd Backend`
2. Copy env: `cp .env.example .env` and set values (see [Backend/.env.example](Backend/.env.example)).
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
4. API: http://localhost:3000. Health: http://localhost:3000/api/health

### Frontend

1. From project root: `cd Frontend/SkillsBridge`
2. Optional: copy `.env.example` to `.env` and set `VITE_API_BASE_URL` if the API is not at `http://localhost:3000/api`.
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
4. App: http://localhost:5173

## Production build (no Docker)

- **Backend:** `cd Backend && npm ci --omit=dev && npm start`. Set `NODE_ENV=production` and all required env (see below).
- **Frontend:** `cd Frontend/SkillsBridge && npm ci && npm run build`. Serve the `dist` folder with a static server that supports SPA fallback (e.g. `npx serve -s dist`). Set `VITE_API_BASE_URL` at build time if the API is on a different origin.

## Docker

From the project root:

1. Set **JWT_SECRET** for production (e.g. in a root `.env` file or as an environment variable). Optional: copy `Backend/.env.example` to `Backend/.env` for other backend env vars.
2. Optional root `.env` to override defaults:
   - `JWT_SECRET` (required in production)
   - `FRONTEND_ORIGIN`, `FRONTEND_URL` (e.g. your frontend URL for CORS and verification emails)
   - `VITE_API_BASE_URL` (API URL used when building the frontend; default `http://localhost:3000/api` for the two-service setup)
3. Run:
   ```bash
   docker compose up --build
   ```
4. Backend: http://localhost:3000. Frontend: http://localhost:5173.

Data and uploads are stored in Docker volumes (`backend_data`, `backend_uploads`).

## Required production env (Backend)

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Secret for signing JWTs (required when `NODE_ENV=production`) |
| `FRONTEND_ORIGIN` | Allowed CORS origin (e.g. your frontend URL) |
| `FRONTEND_URL` | Base URL for email verification links (e.g. your frontend URL) |

Optional: `PORT`, `JWT_EXPIRES_IN`, `BCRYPT_ROUNDS`, `SQLITE_PATH`, SMTP vars (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.). See [Backend/.env.example](Backend/.env.example).

## Health and readiness

- **Health:** `GET /api/health` returns `{ success: true, data: { status: 'ok' } }`. Use for load balancers and basic liveness.

## Email verification

In production, set SMTP env vars so verification emails are sent. Without them, the API returns the verification link in the response (suitable only for development).

## License

ISC
