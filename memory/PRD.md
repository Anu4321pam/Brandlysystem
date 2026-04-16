# Brandly Systems – PRD

## Original Problem Statement
Clone & set up repo: https://github.com/anupamkumarnewlife-create/MY.git (provided as MY-main.zip) in this environment.

## Architecture
- Frontend: React 19 (CRA + craco) + Tailwind + shadcn/ui + framer-motion
- Backend: FastAPI + Motor (MongoDB async)
- DB: MongoDB (local, via supervisor)
- All API routes prefixed with `/api`

## Core Features (already built in source)
- Landing page with Hero, Work, Services, HowItWorks, Comparison, CaseStudy, Offer, Faq, CTA, Contact, Footer, Header, AuditTool
- Backend endpoints:
  - POST `/api/audit/website` — full HTML + PageSpeed + robots + sitemap + broken link audit
  - POST `/api/audit/gmb` — Google Business Profile audit
  - GET `/api/audit/{report_id}` — fetch saved report
  - POST `/api/leads`, GET `/api/leads`
  - POST `/api/consultations`

## Status (Jan 2026)
- Repo cloned into `/app` and all files placed correctly
- Python deps installed (beautifulsoup4, tldextract, etc. added)
- Frontend yarn deps installed
- Supervisor restarted; backend + frontend running
- Verified: `/api/` returns service OK; landing page loads

## Backlog / Future
- Optional: add PAGESPEED_API_KEY to `.env` for deeper performance audits
- Optional: seed demo lead/audit data
- Optional: add analytics / conversion tracking
