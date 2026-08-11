"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

const SERVICE_LINKS = [
  { label: "Branding", href: "/services/branding" },
  { label: "Website Design", href: "/services/website-design" },
  { label: "SEO", href: "/services/seo" },
  { label: "Content Writing", href: "/services/content-writing" },
  { label: "Social Media", href: "/services/social-media" },
  { label: "Website Maintenance", href: "/services/website-maintenance" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-and-conditions" },
  { label: "Refund & Cancellation", href: "/legal/refund-policy" },
  { label: "Work Agreement", href: "/legal/work-agreement" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-black/5 bg-surface-light dark:border-white/5 dark:bg-surface-dark">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-lg font-bold">Xeven Pixels</p>
          <p className="mt-3 text-sm opacity-70">
            A full-service digital agency building brands, websites, and growth
            systems that convert.
          </p>
        </div>

        <div>
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-wide opacity-60">
            Services
          </p>
          <ul className="space-y-2 text-sm">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-wide opacity-60">
            Legal
          </p>
          <ul className="space-y-2 text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-wide opacity-60">
            Connect
          </p>
          <div className="flex gap-3 text-sm">
            <a href="#" className="hover:text-brand">LinkedIn</a>
            <a href="#" className="hover:text-brand">Instagram</a>
            <a href="#" className="hover:text-brand">X</a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-black/5 px-4 py-4 dark:border-white/5 md:px-8">
        <p className="text-xs opacity-60">© {new Date().getFullYear()} Xeven Pixels. All rights reserved.</p>
      </div>

      {/* Fixed bottom-left language switcher */}
      <LanguageSwitcher />
    </footer>
  );
}
