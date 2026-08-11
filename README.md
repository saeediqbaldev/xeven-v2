# Xeven Pixels — Monorepo

Digital agency website + CMS admin dashboard.

```
xeven-pixels/
├── frontend/     Next.js 14 (App Router) — public site + admin dashboard UI
├── backend/      Express + GraphQL (Apollo Server) + Prisma + PostgreSQL
├── docker-compose.yml
└── DESIGN.md     Design token reference
```

## Local development

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
docker compose up -d db redis
cd backend && npm install && npx prisma migrate dev && npm run seed && npm run dev
cd frontend && npm install && npm run dev
```

- Frontend: http://localhost:3000
- GraphQL API: http://localhost:4000/graphql
- Admin: http://localhost:3000/admin/login

Seeded super admin (change after first login):
- username: `Saeeddev307127`
- password: `Saeed@@2026&&307127^/Xeven`

## Deploying on Coolify (single repo, single VPS)

1. Push this repo to your own GitHub (private recommended, since it contains
   the seed script with the super admin credentials — rotate that password
   immediately after first deploy).
2. In Coolify: **New Resource → Docker Compose**, point it at this repo,
   root `docker-compose.yml`.
3. Set environment variables in Coolify's UI (do NOT commit real secrets):
   - `DATABASE_URL`, `JWT_SECRET`, `SEED_ADMIN_USERNAME`, `SEED_ADMIN_PASSWORD`
   - `NEXT_PUBLIC_GRAPHQL_URL` (public URL of the backend service)
4. Attach your domain to the `frontend` service; Coolify handles TLS via
   Let's Encrypt automatically.
5. Deploy. Coolify builds both services from their Dockerfiles and starts
   Postgres + Redis as declared in `docker-compose.yml`.
6. First deploy runs Prisma migrations + the seed script automatically via
   the backend container's entrypoint (see `backend/docker-entrypoint.sh`).

## Status

This repo is being built incrementally. See `PROGRESS.md` for what's done
and what's next.
