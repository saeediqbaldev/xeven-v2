import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";

export const revalidate = 60;

export const metadata = {
  title: "About — Xeven Pixels",
  description:
    "The story, mission, and team behind Xeven Pixels — a full-service digital agency.",
};

const QUERY = gql`
  query TeamMembers {
    teamMembers {
      id
      name
      role
      photo
      bio
    }
  }
`;

type TeamMember = { id: string; name: string; role: string; photo: string | null; bio: string | null };

async function getTeam(): Promise<TeamMember[]> {
  try {
    const data = await gqlClient.request<{ teamMembers: TeamMember[] }>(QUERY);
    return data.teamMembers;
  } catch {
    return [];
  }
}

const MILESTONES = [
  { year: "Founding", detail: "Xeven Pixels started as a two-person studio taking on freelance web builds." },
  { year: "Growth", detail: "Expanded into a full-service team covering branding, SEO, and content." },
  { year: "Today", detail: "A cross-disciplinary agency serving clients across multiple industries and regions." },
];

const EXPERTISE = ["Brand Strategy", "UI/UX Design", "Next.js Development", "Technical SEO", "Content Strategy", "Paid & Organic Social"];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">About Us</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Built by people who ship.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-70">
          Xeven Pixels is a digital agency for businesses that want a partner,
          not just a vendor — accountable work, clear communication, and
          results you can measure.
        </p>
      </section>

      {/* History timeline */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <h2 className="font-display text-2xl font-bold">Our story</h2>
        <div className="mt-8 space-y-6">
          {MILESTONES.map((m) => (
            <div key={m.year} className="flex gap-4 border-l-2 border-brand/30 pl-6">
              <div>
                <p className="font-display text-sm font-semibold text-brand">{m.year}</p>
                <p className="mt-1 text-sm opacity-80">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-light py-16 dark:bg-surface-dark">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="font-display text-2xl font-bold">Our mission</h2>
          <p className="mt-4 max-w-2xl opacity-80">
            To give growing businesses the same caliber of design, strategy,
            and technical execution that used to be reserved for enterprise
            budgets — delivered clearly, on time, and built to convert.
          </p>
        </div>
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-bold">Our expertise</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {EXPERTISE.map((e) => (
            <span
              key={e}
              className="rounded-full border border-brand/30 px-4 py-2 text-sm font-medium text-brand"
            >
              {e}
            </span>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-surface-light py-16 dark:bg-surface-dark">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="font-display text-2xl font-bold">Our team</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {(team.length ? team : PLACEHOLDER_TEAM).map((member) => (
              <div key={member.id} className="text-center">
                <div className="mx-auto aspect-square w-28 rounded-full bg-brand/10" />
                <p className="mt-3 font-display font-semibold">{member.name}</p>
                <p className="text-sm opacity-60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const PLACEHOLDER_TEAM = [
  { id: "1", name: "Add team members", role: "in the admin dashboard", photo: null, bio: null },
];
