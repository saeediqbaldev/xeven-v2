import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";

export const revalidate = 60;

export const metadata = {
  title: "Testimonials — Xeven Pixels",
  description: "Text and video testimonials from Xeven Pixels clients.",
};

const QUERY = gql`
  query AllTestimonials {
    testimonials(featuredOnly: false) {
      id
      clientName
      clientRole
      quote
      videoUrl
      rating
    }
  }
`;

type Testimonial = {
  id: string;
  clientName: string;
  clientRole: string | null;
  quote: string | null;
  videoUrl: string | null;
  rating: number | null;
};

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await gqlClient.request<{ testimonials: Testimonial[] }>(QUERY);
    return data.testimonials;
  } catch {
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const video = testimonials.filter((t) => t.videoUrl);
  const text = testimonials.filter((t) => !t.videoUrl);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">
        Testimonials
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        What it's like to work with us.
      </h1>

      {video.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold">Video testimonials</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {video.map((t) => (
              <div key={t.id} className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/5">
                <div className="aspect-video bg-black/80">
                  <iframe
                    src={t.videoUrl!}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title={`${t.clientName} testimonial`}
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold">{t.clientName}</p>
                  {t.clientRole && <p className="text-xs opacity-60">{t.clientRole}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold">What clients say</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {(text.length ? text : PLACEHOLDER).map((t) => (
            <blockquote
              key={t.id}
              className="rounded-2xl border border-black/5 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark"
            >
              {t.rating && (
                <div className="mb-2 text-accent" aria-label={`${t.rating} out of 5 stars`}>
                  {"★".repeat(t.rating)}
                  <span className="opacity-30">{"★".repeat(5 - t.rating)}</span>
                </div>
              )}
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
  );
}

const PLACEHOLDER: Testimonial[] = [
  { id: "1", clientName: "Add testimonials", clientRole: "in the admin dashboard", quote: "Client feedback will appear here.", videoUrl: null, rating: 5 },
];
