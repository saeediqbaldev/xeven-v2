export const metadata = {
  title: "Contact — Xeven Pixels",
  description: "Get in touch with Xeven Pixels — enquiry form, social handles, and office location.",
};

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "Facebook", href: "#" },
];

// Replace with the real embed src for the agency's office address.
const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">
        Contact
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Let's talk.</h1>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Enquiry form */}
        <form
          action="/api/leads"
          method="POST"
          className="space-y-4 rounded-2xl border border-black/5 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark"
        >
          <input type="hidden" name="source" value="contact" />
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              name="name"
              required
              className="w-full rounded-lg border border-black/10 bg-base-light px-4 py-3 dark:border-white/10 dark:bg-base-dark"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-black/10 bg-base-light px-4 py-3 dark:border-white/10 dark:bg-base-dark"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone (optional)</label>
            <input
              name="phone"
              className="w-full rounded-lg border border-black/10 bg-base-light px-4 py-3 dark:border-white/10 dark:bg-base-dark"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Service interested in</label>
            <select
              name="service"
              className="w-full rounded-lg border border-black/10 bg-base-light px-4 py-3 dark:border-white/10 dark:bg-base-dark"
            >
              <option value="">Select a service</option>
              <option value="branding">Branding</option>
              <option value="website-design">Website Design</option>
              <option value="seo">SEO</option>
              <option value="content-writing">Content Writing</option>
              <option value="social-media">Social Media Content Creation</option>
              <option value="website-maintenance">Website Maintenance</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-lg border border-black/10 bg-base-light px-4 py-3 dark:border-white/10 dark:bg-base-dark"
            />
          </div>
          <button type="submit" className="btn-cta w-full">
            Send Enquiry
          </button>
        </form>

        {/* Socials + map */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-lg font-semibold">Follow us</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-brand/30 px-4 py-2 text-sm font-medium text-brand hover:bg-brand hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/5">
            <iframe
              src={MAPS_EMBED_SRC}
              className="h-72 w-full"
              loading="lazy"
              title="Xeven Pixels office location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
