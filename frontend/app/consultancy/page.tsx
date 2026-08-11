export const metadata = {
  title: "Book a Discovery Call — Xeven Pixels",
  description: "Schedule a free discovery call with Xeven Pixels via Cal.com, Google Meet, or Zoom.",
};

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "xevenpixels/discovery-call";

const FAQS = [
  {
    q: "How long is the discovery call?",
    a: "Usually 30 minutes — enough time to understand your goals and outline next steps without over-committing your schedule.",
  },
  {
    q: "What should I bring to the call?",
    a: "Just a clear sense of what you're trying to achieve. If you have existing brand assets, a current website, or analytics access, those help but aren't required.",
  },
  {
    q: "Will I get a quote on the call?",
    a: "For well-scoped projects, often yes. For larger or multi-service engagements, we'll follow up with a written proposal within 2 business days.",
  },
  {
    q: "Can I choose Google Meet or Zoom instead?",
    a: "Yes — select your preferred platform when booking through the calendar below.",
  },
];

export default function ConsultancyPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pt-16 pb-8 text-center md:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">
          Consultancy
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Book a free discovery call.
        </h1>
        <p className="mx-auto mt-4 max-w-xl opacity-70">
          Tell us where your business is headed — we'll tell you exactly how
          to get there, and what it takes.
        </p>
      </section>

      {/* Cal.com embed */}
      <section className="mx-auto max-w-4xl px-4 pb-16 md:px-8">
        <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/5">
          {/*
            Cal.com inline embed. Replace CAL_LINK (env: NEXT_PUBLIC_CAL_LINK)
            with your real Cal.com username/event-type slug. Cal.com's event
            type settings let you offer Google Meet and Zoom as location
            options directly, which appear automatically inside this embed.
          */}
          <iframe
            src={`https://cal.com/${CAL_LINK}?embed=true&theme=auto`}
            className="h-[720px] w-full"
            title="Book a discovery call"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-bold">Common questions</h2>
        <div className="mt-6 space-y-4">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-black/5 p-5 dark:border-white/5"
            >
              <summary className="cursor-pointer font-display font-medium">{f.q}</summary>
              <p className="mt-3 text-sm opacity-80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
