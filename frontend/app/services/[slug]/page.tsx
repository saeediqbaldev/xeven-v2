import { notFound } from "next/navigation";
import Link from "next/link";
import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";
import { SERVICES as FALLBACK_SERVICES, getServiceBySlug } from "@/data/services";

export const revalidate = 60;

const VALID_SLUGS = FALLBACK_SERVICES.map((s) => s.slug);

const QUERY = gql`
  query ServiceDetail($slug: String!) {
    service(slug: $slug, locale: "en") {
      slug
      name
      summary
      who
      what
      when
      where
      why
      workSamples
      caseStudies {
        slug
        clientName
      }
      testimonials {
        id
        clientName
        clientRole
        quote
      }
      seo {
        metaTitle
        metaDescription
      }
    }
  }
`;

type ServiceDetail = {
  slug: string;
  name: string;
  summary: string;
  who: string;
  what: string;
  when: string;
  where: string;
  why: string;
  workSamples: { title: string; image?: string }[];
  caseStudies: { slug: string; clientName: string }[];
  testimonials: { id: string; clientName: string; clientRole: string | null; quote: string | null }[];
  seo?: { metaTitle?: string; metaDescription?: string } | null;
};

async function getService(slug: string): Promise<ServiceDetail | null> {
  try {
    const data = await gqlClient.request<{ service: ServiceDetail | null }>(QUERY, { slug });
    if (data.service) return data.service;
  } catch {
    // fall through to fallback content below
  }
  const fallback = getServiceBySlug(slug);
  if (!fallback) return null;
  return { ...fallback, caseStudies: [], testimonials: [] };
}

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug);
  if (!service) return {};
  return {
    title: service.seo?.metaTitle || `${service.name} — Xeven Pixels`,
    description: service.seo?.metaDescription || service.summary,
  };
}

const FIVE_WS = ["who", "what", "when", "where", "why"] as const;

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  if (!VALID_SLUGS.includes(params.slug)) notFound();
  const service = await getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-12 text-center md:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">
          Services
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{service.name}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-70">{service.summary}</p>
        <Link href="/consultancy" className="btn-cta mt-8 inline-block">
          Book a Discovery Call
        </Link>
      </section>

      {/* 5W breakdown */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FIVE_WS.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-black/5 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark"
            >
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-brand">
                {key}
              </p>
              <p className="mt-2 text-sm opacity-80">{service[key]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work samples */}
      <section className="bg-surface-light py-16 dark:bg-surface-dark">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="font-display text-2xl font-bold">Work samples</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {service.workSamples.map((sample, i) => (
              <div
                key={i}
                className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 p-6 text-center text-sm opacity-70 dark:border-white/10"
              >
                {sample.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {service.caseStudies.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <h2 className="font-display text-2xl font-bold">Case studies</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {service.caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="rounded-2xl border border-black/5 p-6 hover:border-brand dark:border-white/5"
              >
                <p className="font-display font-semibold">{cs.clientName}</p>
                <p className="mt-2 text-sm text-brand">Read the case study →</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {service.testimonials.length > 0 && (
        <section className="bg-brand/5 py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="font-display text-2xl font-bold">Client feedback</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {service.testimonials.map((t) => (
                <blockquote key={t.id} className="rounded-2xl bg-surface-light p-6 dark:bg-surface-dark">
                  <p className="text-sm italic opacity-90">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm font-semibold">
                    {t.clientName}
                    {t.clientRole && <span className="ml-1 font-normal opacity-60">— {t.clientRole}</span>}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
        <h2 className="font-display text-3xl font-bold">
          Ready to start your {service.name.toLowerCase()} project?
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link href="/consultancy" className="btn-cta">
            Book a Discovery Call
          </Link>
          <Link href="/contact" className="btn-secondary">
            Send an Enquiry
          </Link>
        </div>
      </section>
    </>
  );
}
