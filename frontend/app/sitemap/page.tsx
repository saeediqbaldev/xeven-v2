import Link from "next/link";
import { LEGAL_DOCS } from "@/data/legal";
import { SERVICES } from "@/data/services";

export const metadata = { title: "Sitemap — Xeven Pixels" };

const SECTIONS = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Consultancy", href: "/consultancy" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    title: "Legal",
    links: LEGAL_DOCS.map((d) => ({ label: d.title, href: `/legal/${d.slug}` })),
  },
];

export default function SitemapPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 md:px-8">
      <h1 className="font-display text-4xl font-bold">Sitemap</h1>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-brand">
              {section.title}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {section.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
