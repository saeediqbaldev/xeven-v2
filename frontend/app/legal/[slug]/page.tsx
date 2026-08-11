import { notFound } from "next/navigation";
import { LEGAL_DOCS, getLegalDoc } from "@/data/legal";

export async function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getLegalDoc(params.slug);
  if (!doc) return {};
  return { title: `${doc.title} — Xeven Pixels` };
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const doc = getLegalDoc(params.slug);
  if (!doc) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 md:px-8">
      <h1 className="font-display text-3xl font-bold md:text-4xl">{doc.title}</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed opacity-90">
        {doc.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
