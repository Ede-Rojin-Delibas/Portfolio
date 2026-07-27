# Backend And Database Plan

## Main Decision

This portfolio should use PostgreSQL with Prisma.

PostgreSQL is a good fit because the admin system has relational data such as users, roles, approval status, sessions, projects, blog posts, messages and audit logs. It can also store flexible fields with JSON when content needs to be less rigid.

Prisma is the ORM choice because its schema is readable, strongly typed and beginner-friendly. It will help us model the database before wiring the admin interface to real data.

Prisma 7 keeps the database connection in `prisma.config.ts` instead of `schema.prisma`. The schema file describes the models; the config file describes where Prisma should find the schema, migrations and database URL.

Runtime database queries will use Prisma Client with the PostgreSQL driver adapter:

- `@prisma/client`
- `@prisma/adapter-pg`
- `pg`

## API Style

The project uses Next.js App Router, so backend routes should live under `app/api/**/route.ts`.

Public read routes can expose published portfolio content. Admin mutation routes must always check authentication and permissions on the server.

## Endpoint Map

Public:

- `GET /api/health`
- `GET /api/projects`
- `GET /api/projects/[slug]`
- `GET /api/blog`
- `GET /api/blog/[slug]`
- `POST /api/contact`

Admin auth:

- `POST /api/admin/auth/register`
- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/session`

Admin users:

- `GET /api/admin/users`
- `PATCH /api/admin/users/[id]/approve`
- `PATCH /api/admin/users/[id]/reject`
- `PATCH /api/admin/users/[id]/role`

Admin content:

- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `GET /api/admin/projects/[id]`
- `PATCH /api/admin/projects/[id]`
- `DELETE /api/admin/projects/[id]`
- `POST /api/admin/projects/[id]/publish`
- `GET /api/admin/blog`
- `POST /api/admin/blog`
- `GET /api/admin/blog/[id]`
- `PATCH /api/admin/blog/[id]`
- `DELETE /api/admin/blog/[id]`
- `POST /api/admin/blog/[id]/publish`

Admin workflow:

- `POST /api/admin/translations/draft`
- `PATCH /api/admin/translations/[id]/review`
- `GET /api/admin/messages`
- `PATCH /api/admin/messages/[id]`
- `GET /api/admin/audit-logs`

## Build Order

1. Add database schema and backend contracts. Done.
2. Install Prisma and create the first migration. Done.
3. Add auth/session helpers.
4. Connect register/login forms to API routes.
5. Protect admin routes with server-side role checks.
6. Move projects and blog posts from `data/*.ts` to database records.
7. Add CRUD screens for projects and blog posts.
8. Add translation draft workflow.
9. Add contact message storage.
10. Add audit logs for admin actions.

## Current Backend Files

- `prisma/schema.prisma`: Database models, relations and enums.
- `prisma.config.ts`: Prisma 7 config, migration path and datasource URL.
- `prisma/migrations/20260727152000_init/migration.sql`: First SQL migration generated from the schema.
- `lib/backend/prisma.ts`: Shared Prisma Client helper for future API routes.
- `lib/backend/contracts.ts`: API endpoint contracts and backend decision snapshot.
- `app/api/health/route.ts`: First backend route.
