import Link from "next/link";
import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";

export const revalidate = 60;

export const metadata = {
  title: "Case Studies — Xeven Pixels",
  description: "Real results from real client projects across branding, web, SEO, content, and social.",
};

const QUERY = gql`
  query CaseStudiesArchive {
    caseStudies(locale: "en") {
      slug
      clientName
      challenge
      results
      serviceId
    }
    services(locale: "en") {
      id
      slug
      name
    }
  }
`;

type CaseStudy = { slug: string; clientName: string; challenge: string; results: unknown; serviceId: string };
type Service = { id: string; slug: string; name: string };

async function getData() {
  try {
    return await gqlClient.request<{ caseStudies: CaseStudy[]; services: Service[] }>(QUERY);
  } catch {
    return { caseStudies: [], services: [] };
  }
}

export default async function CaseStudiesArchivePage() {
  const { caseStudies, services } = await getData();
  const serviceName = (id: string) => services.find((s) => s.id === id)?.name;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">
        Case Studies
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Results, not promises.</h1>
      <p className="mt-4 max-w-2xl opacity-70">
        A sample of the work behind the outcomes — one detailed case study per service.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(caseStudies.length ? caseStudies : PLACEHOLDER).map((c) => (
          <Link
            key={c.slug}
            href={`/case-studies/${c.slug}`}
            className="rounded-2xl border border-black/5 bg-surface-light p-6 transition-transform hover:-translate-y-1 dark:border-white/5 dark:bg-surface-dark"
          >
            {serviceName(c.serviceId) && (
              <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                {serviceName(c.serviceId)}
              </span>
            )}
            <h2 className="mt-2 font-display text-lg font-semibold">{c.clientName}</h2>
            <p className="mt-2 text-sm opacity-70 line-clamp-2">{c.challenge}</p>
            <span className="mt-4 inline-block text-sm font-medium text-brand">Read case study →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const PLACEHOLDER: CaseStudy[] = [
  { slug: "example", clientName: "Add your first case study", challenge: "in the admin dashboard", results: {}, serviceId: "" },
];
