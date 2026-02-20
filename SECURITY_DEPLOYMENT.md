## TutorMaven security, performance, and deployment notes

### Security and privacy

- All external access must be over HTTPS (terminate TLS at load balancer or edge).
- Use strong secrets in `.env` for JWT, NextAuth, and AI keys; never commit them.
- Hash passwords with bcrypt (cost >= 10) and store only hashes in PostgreSQL.
- Enable CORS with a strict `ALLOWED_ORIGINS` list in production.
- Validate all request payloads using NestJS `ValidationPipe` and DTOs.
- Rate-limit login and quiz generation endpoints using Redis-based throttling.
- For minors, keep PII minimal and support account deletion and data export.

### Performance and scaling

- Run `web` (Next.js) and `api` (NestJS) as stateless containers behind a load balancer.
- Use a managed PostgreSQL instance with connection pooling (e.g. PgBouncer).
- Add indexes for tutor search fields (city, pincode, subject, classLevel, mode).
- Cache common tutor search queries and quiz generation prompts using Redis.
- Use code-splitting and lazy-loading in Next.js to keep initial bundles small.

### Deployment strategy

- Environments: `dev`, `staging`, `prod`, each with separate databases and API keys.
- Build and push Docker images for `web` and `api`; run `docker-compose` or equivalent in non-local envs.
- Store secrets in a secure manager (cloud-specific or Vault), not .env in production.
- Set up monitoring for latency, error rates, and quiz generation failures, with alerts.

