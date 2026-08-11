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

## 🔜 Phase 2 — Core public pages (next)
- About, Services hub + 6 service subpages (branding, website-design, seo,
  content-writing, social-media, website-maintenance)
- Wire each subpage to `service(slug)` query, 5W content blocks

## 🔜 Phase 3
- Case Studies archive + dynamic `[slug]` page, 6 seeded sample case studies
- Testimonials page (grid/slider, video embeds)
- Consultancy page + Cal.com embed
- Contact page (form → submitLead, Google Maps embed)
- Legal pages (privacy/terms/refund/work-agreement) + human sitemap page

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
