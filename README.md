## TutorMaven

TutorMaven is a hyper-local tutor discovery, management, and AI quiz platform for India, connecting students, tutors, and parents with structure, trust, and measurable learning outcomes.

### Tech stack (high-level)

- **Frontend**: Next.js 14 (App Router, TypeScript, React 18), Tailwind CSS, Framer Motion, React Leaflet, Zustand.
- **Backend**: NestJS (Node.js) with Express platform, ConfigModule, and modular domain structure.
- **Database**: PostgreSQL (via Prisma ORM) with a normalized schema for users, tutoring, and quizzes.
- **Caching & rate limiting**: Redis (for quiz caching, throttling, and session-style use cases).
- **Auth**: NextAuth/Auth.js with email+password and Google OAuth, backed by the API and PostgreSQL user store.
- **AI**: External LLM (OpenAI-compatible HTTPS API) called from the backend quiz engine.
- **Maps**: OpenStreetMap tiles rendered via Leaflet/React Leaflet on the frontend.
- **Deployment**: Containerized `web` and `api` services + managed Postgres/Redis, orchestrated via `docker-compose` for local and cloud-ready for production.

### Project structure

- `package.json` – root workspace config and scripts.
- `web/` – Next.js 14 app (App Router) for all user roles (Student, Tutor, Parent, Admin).
- `api/` – NestJS API service, Prisma schema, and domain modules.
- `docker-compose.yml` – local orchestration for Postgres, Redis, API, and web.

This repository is structured to support separate deployments for the `web` and `api` services, with PostgreSQL and Redis as shared infrastructure components.
