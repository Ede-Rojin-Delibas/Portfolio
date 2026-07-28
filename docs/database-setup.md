# Database Setup

This project uses PostgreSQL.

## Recommended Choice

Use Neon or Supabase for the deployed portfolio because Vercel can reach them easily. Local PostgreSQL is also fine for development, but this machine currently does not have `psql` or Docker available.

## Environment File

Create a local `.env` file from `.env.example` and fill these values:

```txt
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/portfolio_site?schema=public"
AUTH_SECRET="replace-with-a-long-random-secret"
SUPER_ADMIN_EMAIL="your-email@example.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
TRANSLATION_API_KEY=""
```

Never commit `.env`.

## Neon Or Supabase Flow

1. Create a PostgreSQL project.
2. Copy the database connection string.
3. Paste it into `DATABASE_URL` in `.env`.
4. Set `SUPER_ADMIN_EMAIL` to the email that should bootstrap the first Super Admin.
5. Run:

```txt
npm run db:migrate
npm run prisma:generate
```

## First Super Admin Rule

The first user can register from `/admin/register`.

If the email matches `SUPER_ADMIN_EMAIL`, the backend creates that account as:

```txt
status: ACTIVE
role: SUPER_ADMIN
```

Every other registration starts as:

```txt
status: PENDING
role: null
```

Pending users cannot log in until an approval route assigns a role.
