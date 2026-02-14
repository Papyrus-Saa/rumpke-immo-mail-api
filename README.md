# Rumpke AI Backend

Backend for the "Ich schenk dir was" program by Rumpke Immobilien. This service exposes a NestJS-based API to manage the Tippgeber (real estate referral) program, integrating form validation, captcha protection, structured error handling, and automated responses via OpenAI.

## Description

This backend manages the flow of real estate referrals (tipps) for Rumpke Immobilien.

It allows you to:

- Register referral forms (tip-form)
- Validate captchas to prevent spam
- Query the number of referrals
- Send transactional emails
- Answer frequently asked questions about the program using OpenAI
- Provide standardized API responses with structured error handling

## Architecture Overview

The backend follows a modular NestJS architecture:

- Modular service separation (captcha, email, AI, business logic)
- Prisma ORM for database access
- Centralized error handling
- Environment-based configuration
- Health endpoint for monitoring

**Production Health Endpoint:**

https://api.ichschenkedirwas.de/

## API Design & Error Handling

The API uses a consistent structured error response format:

```
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email is invalid",
    "details": {}
  }
}
```

**Features:**

- Centralized HTTP exception filter
- Standardized error codes
- Predictable response structure
- Separation between validation errors and internal errors

This ensures production-level API consistency and maintainability.

## Technologies

- NestJS (Node.js framework)
- Prisma ORM (PostgreSQL)
- OpenAI API
- Nodemailer (email service)
- TypeScript
- class-validator
- Cloudflare Turnstile (Captcha validation)

## Security & Protection

- Captcha validation (Cloudflare Turnstile)
- Honeypot spam detection
- Input validation & sanitization
- CORS restrictions
- Rate limiting
- Environment variable isolation
- Structured error responses

## Project Structure

```
src/
  app.module.ts
  main.ts
  captcha/
  email/
  prisma/
  rumpkeai/
    dtos/
    use-case/
prisma/
  schema.prisma
  migrations/
```

## Installation & Usage

Clone the repository:

```
git clone <REPO_URL>
cd rumpke-ai
```

Install dependencies:

```
npm install
```

Create the `.env` file based on `.env.template` and configure required variables.

Run database migrations:

```
npx prisma migrate dev --name init
```

Start the server:

```
npm run start:dev
```

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/rumpke
OPENAI_API_KEY=sk-...
EMAIL_USER=...
EMAIL_PASS=...
```

Never commit secrets.

## Observability & Monitoring

- Health endpoint for uptime monitoring
- Structured logging
- Centralized error handling
- Production-ready deployment environment

## Available Scripts

- `npm run start:dev` – Start development server
- `npm run build` – Build project
- `npm run test` – Run tests
- `npm run lint` – Run ESLint
- `npx prisma studio` – Database interface

## License

This project is private and has no distribution license.
