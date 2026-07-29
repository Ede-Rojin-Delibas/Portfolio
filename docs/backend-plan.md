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
3. Add auth/session helpers. Done.
4. Connect register/login forms to API routes. Done.
5. Protect admin routes with server-side role checks. Done.
6. Move projects and blog posts from `data/*.ts` to database records. Done.
7. Add CRUD screens for projects and blog posts. Done.
8. Add translation draft workflow. Done.
9. Add contact message storage. Done.
10. Add audit logs for admin actions. Done.

## Current Backend Files

- `prisma/schema.prisma`: Database models, relations and enums.
- `prisma.config.ts`: Prisma 7 config, migration path and datasource URL.
- `prisma/migrations/20260727152000_init/migration.sql`: First SQL migration generated from the schema.
- `prisma/migrations/20260729100953_add_project_highlights/migration.sql`: Adds editable project highlight records.
- `lib/backend/prisma.ts`: Shared Prisma Client helper for future API routes.
- `lib/backend/password.ts`: Password hashing and verification.
- `lib/backend/session.ts`: Database-backed session cookie helpers.
- `lib/backend/permissions.ts`: Role-to-permission mapping, admin page guards and future API permission guard.
- `lib/backend/contracts.ts`: API endpoint contracts and backend decision snapshot.
- `lib/backend/project-input.ts`: Zod validation schema for project create/update payloads.
- `lib/backend/blog-input.ts`: Zod validation schema for blog create/update payloads.
- `lib/backend/contact-input.ts`: Zod validation schema for public contact messages and admin message status updates.
- `lib/backend/translation-input.ts`: Zod validation schema for draft/review translation workflow actions.
- `lib/content/projects.ts`: Reads published projects from PostgreSQL and falls back to static content if the database has no content.
- `lib/content/blog.ts`: Reads published blog posts from PostgreSQL and falls back to static content if the database has no content.
- `scripts/seed-content.ts`: Copies existing static projects and blog posts into PostgreSQL.
- `app/api/health/route.ts`: First backend route.
- `app/api/admin/auth/register/route.ts`: Creates pending access requests and bootstraps the configured Super Admin.
- `app/api/admin/auth/login/route.ts`: Validates credentials and creates a session cookie.
- `app/api/admin/auth/logout/route.ts`: Deletes the current session.
- `app/api/admin/session/route.ts`: Reads the current session user.
- `app/api/admin/projects/route.ts`: Lists and creates project records with permission checks.
- `app/api/admin/projects/[id]/route.ts`: Updates and deletes one project with permission checks.
- `app/api/admin/blog/route.ts`: Lists and creates blog post records with permission checks.
- `app/api/admin/blog/[id]/route.ts`: Updates and deletes one blog post with permission checks.
- `app/api/contact/route.ts`: Validates and stores public contact form submissions.
- `app/api/admin/messages/route.ts`: Lists contact messages for authorized admins.
- `app/api/admin/messages/[id]/route.ts`: Updates contact message status and writes an audit entry.
- `app/api/admin/translations/draft/route.ts`: Creates reviewable Turkish draft translations for projects and blog posts.
- `app/api/admin/translations/[id]/review/route.ts`: Marks translation drafts as reviewed or changes review status.
- `app/api/admin/audit-logs/route.ts`: Lists recent admin audit events.
- `app/admin/projects/page.tsx`: First PostgreSQL-backed admin project management page.
- `app/admin/posts/page.tsx`: PostgreSQL-backed admin blog management page.
- `app/admin/messages/page.tsx`: PostgreSQL-backed contact inbox.
- `app/admin/translations/page.tsx`: Translation draft and review workflow UI.
- `app/admin/audit-logs/page.tsx`: Read-only audit log UI.
- `components/admin/project-create-form.tsx`: Shared create/edit form for project records.
- `components/admin/project-delete-button.tsx`: Client-side delete action for project records.
- `components/admin/blog-post-form.tsx`: Shared create/edit form for blog post records.
- `components/admin/blog-post-delete-button.tsx`: Client-side delete action for blog post records.
- `components/admin/message-status-button.tsx`: Client-side contact message status update action.
- `components/admin/translation-action-button.tsx`: Client-side translation draft and review actions.
