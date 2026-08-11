import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

const SERVICES = [
  {
    slug: "branding",
    name: "Branding",
    summary: "Identity systems that make you memorable.",
    who: "Startups launching for the first time and established businesses repositioning for growth.",
    what: "Brand strategy, naming, logo and visual identity systems, brand guidelines, and voice/tone frameworks.",
    when: "Before a launch or relaunch, after a pivot, or when your current identity no longer matches where the business is headed.",
    where: "Applied consistently across your website, packaging, social presence, pitch decks, and physical/print materials.",
    why: "A clear, consistent identity builds recognition and trust faster — and gives every other marketing effort something coherent to build on.",
    workSamples: [{ title: "Full brand identity — SaaS startup" }, { title: "Rebrand — regional retail chain" }],
    order: 1,
  },
  {
    slug: "website-design",
    name: "Website Design",
    summary: "Fast, conversion-first websites.",
    who: "Businesses that need a website which actually converts visitors, not just looks good.",
    what: "UX/UI design, responsive development, CMS integration, performance and accessibility optimization.",
    when: "New business launch, outdated site redesign, or when conversion rates are underperforming traffic.",
    where: "Desktop, tablet, and mobile — every browser, every OS, tested before launch.",
    why: "Your website is your hardest-working salesperson. A slow or confusing one costs you customers every day it stays live.",
    workSamples: [{ title: "E-commerce rebuild — 40% faster load time" }, { title: "B2B SaaS marketing site" }],
    order: 2,
  },
  {
    slug: "seo",
    name: "SEO",
    summary: "On-page, off-page, and local search growth.",
    who: "Businesses that want durable, compounding traffic instead of paying for every visitor.",
    what: "Technical SEO audits, on-page optimization, content strategy, link building, and local/Google Business Profile optimization.",
    when: "Ongoing — SEO compounds over months, so it works best as a continuous program, not a one-off fix.",
    where: "Google, Bing, and local map search — wherever your customers are actually searching.",
    why: "Organic search is the highest-intent, lowest-cost-per-lead channel available once it's built correctly.",
    workSamples: [{ title: "Local SEO — 3x map-pack visibility" }, { title: "National SEO — organic traffic case study" }],
    order: 3,
  },
  {
    slug: "content-writing",
    name: "Content Writing",
    summary: "Copy and content that reads like a person wrote it — because one did.",
    who: "Brands that need website copy, blog content, or email sequences that convert without sounding generic.",
    what: "Website copywriting, SEO-driven blog content, email sequences, and product/landing page copy.",
    when: "Alongside a new site build, a content marketing push, or a rebrand that needs a matching voice.",
    where: "Every page and channel your audience reads — website, blog, email, ads.",
    why: "Good design gets attention. Good copy is what actually persuades someone to act.",
    workSamples: [{ title: "Blog content program — 12-month case study" }, { title: "Landing page copy — SaaS conversion lift" }],
    order: 4,
  },
  {
    slug: "social-media",
    name: "Social Media Content Creation",
    summary: "Content built for how each platform actually works.",
    who: "Brands that want a consistent, on-brand social presence without an in-house content team.",
    what: "Content calendars, graphic and short-form video creation, captions, and platform-specific strategy.",
    when: "Ongoing monthly retainer, or as a focused push around a launch/campaign.",
    where: "Instagram, LinkedIn, TikTok, Facebook, X — wherever your audience actually spends time.",
    why: "Consistent, well-made content compounds brand trust and keeps you top-of-mind between purchases.",
    workSamples: [{ title: "Monthly content system — hospitality client" }, { title: "Launch campaign — product reveal" }],
    order: 5,
  },
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    summary: "Maintenance, inventory management, and security — handled.",
    who: "Businesses running on a live website or store who can't afford downtime or security issues.",
    what: "Core/plugin updates, uptime monitoring, backups, inventory/catalog management, and security hardening.",
    when: "Continuously, from the day your site launches.",
    where: "Applied at the hosting, CMS, and application layer of your existing site.",
    why: "Most site failures and breaches are preventable — maintenance is cheaper than downtime or a hacked site.",
    workSamples: [{ title: "Uptime & security program — e-commerce client" }, { title: "Ongoing inventory sync — multi-location retailer" }],
    order: 6,
  },
];

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME || "Saeeddev307127";
  const password = process.env.SEED_ADMIN_PASSWORD || "Saeed@@2026&&307127^/Xeven";

  const passwordHash = await argon2.hash(password);

  await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      role: "ADMIN",
      passwordHash,
      isActive: true,
    },
  });

  await prisma.themeSetting.upsert({
    where: { key: "active" },
    update: {},
    create: { key: "active" },
  });

  const serviceRecords = {};
  for (const service of SERVICES) {
    const record = await prisma.service.upsert({
      where: { slug_locale: { slug: service.slug, locale: "en" } },
      update: {},
      create: { ...service, locale: "en", status: "published" },
    });
    serviceRecords[service.slug] = record;
  }

  const CASE_STUDIES = [
    {
      slug: "branding-refresh-northline",
      serviceSlug: "branding",
      clientName: "Northline Goods",
      challenge: "Northline's visual identity hadn't evolved since launch and no longer matched its premium positioning.",
      strategy: "We ran a brand audit and repositioning workshop, then rebuilt the identity system around a refined color and type language.",
      execution: "Delivered new logo, brand guidelines, packaging templates, and a rollout plan across web and retail touchpoints.",
      results: [{ metric: "Brand recall lift", value: "+38%" }, { metric: "Retail sell-through", value: "+21%" }],
      gallery: [],
    },
    {
      slug: "ecommerce-rebuild-fernwood",
      serviceSlug: "website-design",
      clientName: "Fernwood Home",
      challenge: "Fernwood's storefront was slow, hard to navigate on mobile, and losing checkout conversions.",
      strategy: "Rebuilt the site on a performance-first Next.js stack with a streamlined checkout flow.",
      execution: "Shipped a fully responsive redesign, cut page weight significantly, and restructured navigation around top-selling categories.",
      results: [{ metric: "Page load time", value: "-58%" }, { metric: "Mobile conversion", value: "+40%" }],
      gallery: [],
    },
    {
      slug: "local-seo-brightsmile",
      serviceSlug: "seo",
      clientName: "Brightsmile Dental Group",
      challenge: "Brightsmile had five locations but almost no visibility in local map search.",
      strategy: "Rebuilt Google Business Profiles, fixed technical SEO issues sitewide, and launched a local content and citation program.",
      execution: "Rolled out location-specific landing pages and a structured review-generation process across all five clinics.",
      results: [{ metric: "Map-pack visibility", value: "3x" }, { metric: "Organic bookings", value: "+64%" }],
      gallery: [],
    },
    {
      slug: "content-program-verdant",
      serviceSlug: "content-writing",
      clientName: "Verdant Supply Co.",
      challenge: "Verdant's blog had volume but no strategy, and traffic wasn't converting to leads.",
      strategy: "Built a 12-month editorial calendar mapped to buyer-intent search terms, with a matching internal linking structure.",
      execution: "Produced and published weekly SEO-driven articles alongside a rewritten core landing page suite.",
      results: [{ metric: "Organic traffic", value: "+156%" }, { metric: "Blog-to-lead rate", value: "+3.2x" }],
      gallery: [],
    },
    {
      slug: "social-launch-haven",
      serviceSlug: "social-media",
      clientName: "Haven Coffee Roasters",
      challenge: "Haven had strong products but almost no consistent social presence ahead of a new location launch.",
      strategy: "Designed a platform-specific content system split across Instagram, TikTok, and local community groups.",
      execution: "Produced a month of launch content plus an ongoing calendar covering behind-the-scenes, product, and community posts.",
      results: [{ metric: "Follower growth", value: "+4,200" }, { metric: "Launch-day foot traffic", value: "+3x forecast" }],
      gallery: [],
    },
    {
      slug: "maintenance-program-atlas",
      serviceSlug: "website-maintenance",
      clientName: "Atlas Outdoor Gear",
      challenge: "Atlas's e-commerce store had recurring downtime and an outdated plugin stack creating security risk.",
      strategy: "Implemented a structured maintenance program: monitoring, staged updates, and a hardened security baseline.",
      execution: "Migrated to managed hosting, automated backups, and ongoing inventory sync across three sales channels.",
      results: [{ metric: "Uptime", value: "99.98%" }, { metric: "Security incidents", value: "0 since launch" }],
      gallery: [],
    },
  ];

  for (const cs of CASE_STUDIES) {
    const { serviceSlug, ...data } = cs;
    await prisma.caseStudy.upsert({
      where: { slug_locale: { slug: cs.slug, locale: "en" } },
      update: {},
      create: { ...data, locale: "en", status: "published", serviceId: serviceRecords[serviceSlug].id },
    });
  }

  console.log(`Seeded super admin user: ${username}`);
  console.log(`Seeded ${SERVICES.length} services and ${CASE_STUDIES.length} case studies.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
