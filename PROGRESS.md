# Build Progress

## ✅ Phase 1 — Foundation (done)
- Monorepo structure (frontend/backend), Docker + docker-compose for Coolify
- Prisma schema: User/Role, Page, Service, CaseStudy, Testimonial, TeamMember,
  Lead, SeoMeta, ThemeSetting, AuditLog
- Seed script creating hardcoded super admin (Saeeddev307127)
- Express + Apollo GraphQL server, JWT auth, RBAC permission matrix
  (ADMIN full / SEO meta-only / CONTENT body-only)
- Next.js App Router, Tailwind + DaisyUI theme (light/dark, WCAG-AA tokens)
- Header (desktop nav + off-canvas mobile menu + theme toggle)
- Footer (service/legal links + language switcher slot)
- Language switcher UI (7 locales, RTL flag for ar/he) — routing not wired yet
- Go-to-top button, GDPR cookie banner
- Signature "pixel grid" GSAP hero (reduced-motion safe)
- Home page fully wired to GraphQL (services/testimonials/case studies) with
  graceful placeholder fallback on empty DB
- Admin login page wired to `login` mutation

## ✅ Phase 2 — Core public pages (done)
- About page: history timeline, mission, expertise tags, team grid
  (wired to `teamMembers` query, placeholder fallback)
- Services hub page: grid of all 6 services, wired to `services` query
- Dynamic `services/[slug]` template: handles all 6 service subpages from
  one file, 5W content blocks, work samples, related case studies,
  testimonials, and CTAs — wired to `service(slug)` query with graceful
  fallback to `frontend/data/services.ts` content
- Backend seed script now seeds all 6 services with real 5W copy, so a
  fresh deploy has working service pages immediately (no empty CMS state)

## ✅ Phase 3 (done)
- Case Studies archive page (filterable by service via `serviceId`) +
  dynamic `case-studies/[slug]` detail template (challenge/strategy/
  execution, results strip, gallery, CTA)
- Backend seed now includes 6 sample case studies, one per service
- Testimonials page — video testimonials (iframe embeds) + text grid with
  star ratings, wired to `testimonials` query
- Consultancy page — Cal.com inline embed (env-configurable link), FAQ
  accordion; Cal.com event-type settings handle Google Meet/Zoom location
  choice natively inside the embed
- Contact page — enquiry form, social handles, Google Maps iframe embed
- `/api/leads` route bridges HTML form posts (Home + Contact) to the
  `submitLead` GraphQL mutation
- Legal pages: dynamic `legal/[slug]` template + standard boilerplate
  content for Privacy Policy, Terms & Conditions, Refund & Cancellation,
  Work Agreement (see note in data/legal.ts — template only, not legal advice)
- Human-readable `/sitemap` page + machine-readable `/sitemap.xml` via
  Next's `app/sitemap.ts` convention

## 🔜 Phase 4 — Admin dashboard
- Authenticated `/admin` shell (shadcn/ui), route guard via JWT + role
- Page/Service/CaseStudy/Testimonial CRUD screens
- SEO fields editor (meta, OG, schema JSON, webmaster tags) per entity
- Media upload (Cloudinary/S3)
- User management screen (create/deactivate, role toggle)
- Theme settings screen (fonts, colors, animation mode) live-bound to
  `ThemeSetting` and consumed by frontend
- Real-time analytics panel (GA4 API or self-tracked events)

## 🔜 Phase 5
- next-intl routing wired for all 7 locales + RTL layout switch
- Cookie banner ↔ consent-gated analytics scripts

## 🔜 Phase 6 — Polish
- Full GSAP scroll choreography across all pages
- Cross-browser/responsive QA pass
- Lighthouse/Core Web Vitals pass
