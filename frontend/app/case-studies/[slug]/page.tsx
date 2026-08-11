import { notFound } from "next/navigation";
import Link from "next/link";
import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";

export const revalidate = 60;

const QUERY = gql`
  query CaseStudyDetail($slug: String!) {
    caseStudy(slug: $slug, locale: "en") {
      slug
      clientName
      challenge
      strategy
      execution
      results
      gallery
      seo {
        metaTitle
        metaDescription
      }
    }
  }
`;

type CaseStudyDetail = {
  slug: string;
  clientName: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: { metric: string; value: string }[];
  gallery: string[];
  seo?: { metaTitle?: string; metaDescription?: string } | null;
};

async function getCaseStudy(slug: string): Promise<CaseStudyDetail | null> {
  try {
    const data = await gqlClient.request<{ caseStudy: CaseStudyDetail | null }>(QUERY, { slug });
    return data.caseStudy;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: cs.seo?.metaTitle || `${cs.clientName} — Case Study — Xeven Pixels`,
    description: cs.seo?.metaDescription || cs.challenge,
  };
}

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudy(params.slug);
  if (!cs) notFound();

  const sections = [
    { label: "The Challenge", body: cs.challenge },
    { label: "Our Strategy", body: cs.strategy },
    { label: "Execution", body: cs.execution },
  ];

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pt-16 pb-10 md:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">
          Case Study
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{cs.clientName}</h1>
      </section>

      {/* Results strip */}
      {cs.results?.length > 0 && (
        <section className="border-y border-black/5 bg-surface-light py-10 dark:border-white/5 dark:bg-surface-dark">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 md:px-8">
            {cs.results.map((r) => (
              <div key={r.metric}>
                <p className="font-display text-3xl font-bold text-brand">{r.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide opacity-60">{r.metric}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl space-y-10 px-4 py-16 md:px-8">
        {sections.map((s) => (
          <div key={s.label}>
            <h2 className="font-display text-2xl font-bold">{s.label}</h2>
            <p className="mt-3 opacity-80">{s.body}</p>
          </div>
        ))}

        {cs.gallery?.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold">Gallery</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
              {cs.gallery.map((_, i) => (
                <div key={i} className="aspect-video rounded-xl bg-brand/10" />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-20 text-center md:px-8">
        <h2 className="font-display text-2xl font-bold">Want results like this?</h2>
        <Link href="/consultancy" className="btn-cta mt-6 inline-block">
          Book a Discovery Call
        </Link>
      </section>
    </>
  );
}
