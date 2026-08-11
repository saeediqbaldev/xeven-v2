import Link from "next/link";
import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";
import { SERVICES as FALLBACK_SERVICES } from "@/data/services";

export const revalidate = 60;

const QUERY = gql`
  query ServicesHub {
    services(locale: "en") {
      slug
      name
      summary
    }
  }
`;

async function getServices() {
  try {
    const data = await gqlClient.request<{ services: { slug: string; name: string; summary: string }[] }>(QUERY);
    return data.services.length ? data.services : FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}

export const metadata = {
  title: "Services — Xeven Pixels",
  description:
    "Branding, website design, SEO, content writing, social media content creation, and website maintenance — everything a growing business needs online.",
};

export default async function ServicesHubPage() {
  const services = await getServices();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">
        What we do
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        Six disciplines. One accountable team.
      </h1>
      <p className="mt-4 max-w-2xl opacity-70">
        Pick a single service or lean on the full stack — every discipline is
        built to work together, from first impression to long-term growth.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-black/5 bg-surface-light p-7 transition-transform hover:-translate-y-1 dark:border-white/5 dark:bg-surface-dark"
          >
            <div>
              <span className="font-display text-xs font-semibold text-brand/70">
                0{i + 1}
              </span>
              <h2 className="mt-2 font-display text-xl font-semibold group-hover:text-brand">
                {s.name}
              </h2>
              <p className="mt-2 text-sm opacity-70">{s.summary}</p>
            </div>
            <span className="mt-6 text-sm font-medium text-brand">
              Learn more →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-brand/5 p-8 text-center md:p-12">
        <h2 className="font-display text-2xl font-bold">Not sure where to start?</h2>
        <p className="mx-auto mt-2 max-w-md opacity-70">
          Book a free discovery call and we'll map out exactly what your
          project needs.
        </p>
        <Link href="/consultancy" className="btn-cta mt-6 inline-block">
          Book a Discovery Call
        </Link>
      </div>
    </section>
  );
}
