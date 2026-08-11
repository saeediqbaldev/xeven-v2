export type ServiceContent = {
  slug: string;
  name: string;
  summary: string;
  who: string;
  what: string;
  when: string;
  where: string;
  why: string;
  workSamples: { title: string; image?: string }[];
};

export const SERVICES: ServiceContent[] = [
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
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
