export type LegalDoc = { slug: string; title: string; body: string[] };

const EFFECTIVE_DATE = "August 12, 2026";

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    body: [
      `Effective date: ${EFFECTIVE_DATE}`,
      "Xeven Pixels (\"we\", \"us\", \"our\") respects your privacy. This policy explains what personal information we collect through this website, how we use it, and the choices you have.",
      "Information we collect: contact details you submit through our forms (name, email, phone, message), and standard analytics data (pages visited, device/browser type, approximate location) collected via cookies and similar technologies.",
      "How we use it: to respond to enquiries, deliver requested services, improve our website, and — where you've consented — to send occasional marketing communications.",
      "Cookies: we use essential cookies required for the site to function and, with your consent via our cookie banner, analytics cookies to understand site usage. You can withdraw consent at any time by clearing your cookie preferences.",
      "Data sharing: we do not sell your personal information. We may share data with service providers (e.g., hosting, email, analytics) strictly to operate this website and deliver our services, under confidentiality obligations.",
      "Your rights: depending on your location, you may have the right to access, correct, delete, or export your personal data, and to object to or restrict certain processing. Contact us using the details on our Contact page to exercise these rights.",
      "Data retention: we retain enquiry and client data only as long as necessary for the purposes described above or as required by law.",
      "Changes to this policy: we may update this policy from time to time; the effective date above reflects the latest revision.",
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    body: [
      `Effective date: ${EFFECTIVE_DATE}`,
      "These Terms & Conditions govern your use of this website and any services provided by Xeven Pixels. By using this site or engaging our services, you agree to these terms.",
      "Services: specific scope, deliverables, timelines, and fees for any engagement will be set out in a separate written proposal or Work Agreement, which takes precedence over these general terms for that engagement.",
      "Intellectual property: unless otherwise agreed in writing, final deliverables (designs, code, content) transfer to the client upon full payment. Xeven Pixels retains the right to showcase completed work in its portfolio unless the client requests otherwise in writing.",
      "Client responsibilities: timely feedback, provision of necessary assets/access, and accurate information are the client's responsibility; delays caused by the client may affect project timelines.",
      "Limitation of liability: Xeven Pixels is not liable for indirect, incidental, or consequential damages arising from use of our services or this website, to the extent permitted by law.",
      "Third-party tools: our website and services may integrate third-party tools (e.g., scheduling, analytics, hosting); their own terms and privacy policies also apply.",
      "Governing law: these terms are governed by the laws of the jurisdiction in which Xeven Pixels is registered, without regard to conflict-of-law principles.",
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund & Cancellation Policy",
    body: [
      `Effective date: ${EFFECTIVE_DATE}`,
      "This policy applies to services booked or purchased through Xeven Pixels.",
      "Deposits: project deposits secure your place in our schedule and are non-refundable once work has commenced, unless otherwise stated in your Work Agreement.",
      "Cancellations before work begins: if you cancel before any work has started, you are entitled to a full refund minus any payment processing fees already incurred.",
      "Cancellations after work begins: you will be invoiced for work completed up to the cancellation date on a pro-rata basis; any remaining deposit balance will be refunded.",
      "Ongoing/retainer services (e.g., SEO, maintenance, social media): these may be cancelled with written notice as specified in your Work Agreement (typically 30 days); fees already paid for the current billing period are non-refundable.",
      "Discovery calls and consultations: these are provided free of charge and are not subject to this refund policy.",
      "Disputes: if you believe a charge was made in error, contact us within 14 days via our Contact page so we can review and resolve it promptly.",
    ],
  },
  {
    slug: "work-agreement",
    title: "Work Agreement",
    body: [
      `Effective date: ${EFFECTIVE_DATE}`,
      "This Work Agreement outlines the standard terms under which Xeven Pixels delivers client projects. A project-specific proposal (scope, timeline, and fees) is issued alongside this agreement for each engagement.",
      "Project phases: engagements typically follow discovery, planning, execution, review, and delivery phases, with client sign-off required at key milestones before proceeding.",
      "Revisions: each project includes an agreed number of revision rounds per deliverable, specified in the proposal; additional revisions beyond that scope may incur extra fees.",
      "Payment terms: unless otherwise agreed, projects require a deposit to begin, with remaining balances due at specified milestones or upon completion. Late payments may pause active work.",
      "Communication: we aim to respond to project communications within one business day during an active engagement.",
      "Confidentiality: both parties agree to keep confidential any non-public business information shared during the engagement.",
      "Termination: either party may terminate the engagement with written notice as specified in the project proposal; the client is responsible for payment for all work completed up to the termination date.",
    ],
  },
];

export function getLegalDoc(slug: string) {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}
