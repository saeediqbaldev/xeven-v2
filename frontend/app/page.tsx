import Link from "next/link";
import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";
import PixelGridHero from "@/components/PixelGridHero";

export const revalidate = 60; // ISR: refresh content every 60s

const QUERY = gql`
  query HomeData {
    services(locale: "en") {
      slug
      name
      summary
    }
    testimonials(featuredOnly: true) {
      id
      clientName
      clientRole
      quote
      videoUrl
      rating
    }
    caseStudies(locale: "en") {
      slug
      clientName
      results
    }
  }
`;

type HomeData = {
  services: { slug: string; name: string; summary: string }[];
  testimonials: {
    id: string;
    clientName: string;
    clientRole: string | null;
    quote: string | null;
    videoUrl: string | null;
    rating: number | null;
  }[];
  caseStudies: { slug: string; clientName: string; results: unknown }[];
};

async function getData(): Promise<HomeData> {
  try {
    return await gqlClient.request<HomeData>(QUERY);
  } catch {
    // Backend not reachable yet during first build/dev — fail gracefully.
    return { services: [], testimonials: [], caseStudies: [] };
  }
}

export default async function HomePage() {
  const { services, testimonials, caseStudies } = await getData();

  return (
    <>
      <PixelGridHero />

      {/* Services overview */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="font-display text-3xl font-bold">What we do</h2>
        <p className="mt-2 max-w-xl opacity-70">
          Six core disciplines, one accountable team.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {(services.length ? services : PLACEHOLDER_SERVICES).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-black/5 bg-surface-light p-6 transition-transform hover:-translate-y-1 dark:border-white/5 dark:bg-surface-dark"
            >
              <h3 className="font-display text-lg font-semibold group-hover:text-brand">
                {s.name}
              </h3>
              <p className="mt-2 text-sm opacity-70">{s.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Social proof / testimonials */}
      <section className="bg-surface-light py-20 dark:bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-3xl font-bold">What clients say</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {(testimonials.length ? testimonials : PLACEHOLDER_TESTIMONIALS).map((t) => (
              <blockquote
                key={t.id}
                className="rounded-2xl bg-base-light p-6 dark:bg-base-dark"
              >
                <p className="text-sm italic opacity-90">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold">
                  {t.clientName}
                  {t.clientRole && (
                    <span className="ml-1 font-normal opacity-60">— {t.clientRole}</span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold">Recent results</h2>
          <Link href="/case-studies" className="text-sm font-medium text-brand hover:underline">
            View all case studies →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {(caseStudies.length ? caseStudies : PLACEHOLDER_CASE_STUDIES).map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="rounded-2xl border border-black/5 p-6 hover:border-brand dark:border-white/5"
            >
              <p className="font-display font-semibold">{c.clientName}</p>
              <p className="mt-2 text-sm opacity-70">View full case study →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-brand/5 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold">Let's build something.</h2>
          <p className="mt-2 opacity-70">
            Tell us about your project and we'll get back within one business day.
          </p>
          <form
            className="mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-2"
            action="/api/leads"
            method="POST"
          >
            <input
              name="name"
              placeholder="Your name"
              required
              className="rounded-lg border border-black/10 bg-surface-light px-4 py-3 dark:border-white/10 dark:bg-surface-dark"
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
              className="rounded-lg border border-black/10 bg-surface-light px-4 py-3 dark:border-white/10 dark:bg-surface-dark"
            />
            <textarea
              name="message"
              placeholder="What are you looking to build?"
              className="col-span-full rounded-lg border border-black/10 bg-surface-light px-4 py-3 dark:border-white/10 dark:bg-surface-dark"
              rows={4}
            />
            <button type="submit" className="btn-cta col-span-full">
              Send Enquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

// Fallback content shown only if the CMS has no data yet (fresh install)
const PLACEHOLDER_SERVICES = [
  { slug: "branding", name: "Branding", summary: "Identity systems that make you memorable." },
  { slug: "website-design", name: "Website Design", summary: "Fast, conversion-first websites." },
  { slug: "seo", name: "SEO", summary: "On-page, off-page, and local search growth." },
];
const PLACEHOLDER_TESTIMONIALS = [
  { id: "1", clientName: "Add your first testimonial", clientRole: "in the admin dashboard", quote: "Great work, on time and on budget.", videoUrl: null, rating: 5 },
];
const PLACEHOLDER_CASE_STUDIES = [
  { slug: "example", clientName: "Add your first case study", results: {} },
];
