# Deployment and observability decisions

No hosting, deployment pipeline, or monitoring is selected by this template. Decide each
item below for the actual project, record the choice in an ADR under
[decisions](./decisions/README.md), and treat the first deployment as a separate,
approved task.

## Hosting questions

Answer these before comparing providers:

- What runs: static files, a server-rendered app, an API, a database, background work?
- Where are the users, and are there data residency or compliance requirements?
- What is the monthly budget, and who pays for it?
- Who operates it, and how much infrastructure work is acceptable?
- What happens on failure: is downtime acceptable, and how fast must it recover?

| Profile | Typical hosting shape to evaluate |
|---------|-----------------------------------|
| landing, spa-baas | Static hosting with a CDN; the BaaS provider hosts data and auth |
| ssr | A platform that supports the framework's server runtime, or a container |
| full-stack, api-only | A container or Node.js platform plus managed PostgreSQL |
| mobile | App store distribution; any API follows the full-stack or api-only shape |

Verify current pricing, limits, and regions from the provider's own pages at decision
time and cite them with a date in the ADR.

## Release checklist for the first deployment

- Separate environments (at least preview and production) with separate secrets and data.
- Database migrations run as an explicit, reviewed step with a backup or rollback plan.
- A way to roll back the application to the previous version.
- HTTPS, security headers where the platform allows, and the domain/DNS owner recorded.
- The deployment workflow uses least-privilege credentials, ideally OIDC instead of
  long-lived keys, and requires approval for production.

## Observability

Start small and add tools when a real question needs them:

- Structured logs with a request or correlation ID, and no secrets or personal data.
- Error tracking for the frontend and backend, with source maps uploaded privately.
- A health endpoint for services, and an uptime check on the main user journey.
- For landing pages, decide on analytics and consent together; analytics is opt-in.
- Write down who receives alerts and what they do first. An alert nobody owns is noise.
