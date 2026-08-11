export const typeDefs = `#graphql
  scalar JSON

  enum Role { ADMIN SEO CONTENT }

  type User {
    id: String!
    username: String!
    email: String
    role: Role!
    isActive: Boolean!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type SeoMeta {
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    ogImage: String
    ogTitle: String
    ogDescription: String
    twitterCard: String
    schemaJson: JSON
    categories: JSON
  }

  input SeoMetaInput {
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    ogImage: String
    ogTitle: String
    ogDescription: String
    twitterCard: String
    schemaJson: JSON
    categories: JSON
  }

  type Page {
    id: String!
    slug: String!
    locale: String!
    title: String!
    blocks: JSON!
    seo: SeoMeta
    status: String!
    updatedAt: String!
  }

  type Service {
    id: String!
    slug: String!
    locale: String!
    name: String!
    summary: String!
    who: String!
    what: String!
    when: String!
    where: String!
    why: String!
    workSamples: JSON!
    order: Int!
    seo: SeoMeta
    status: String!
    caseStudies: [CaseStudy!]!
    testimonials: [Testimonial!]!
  }

  type CaseStudy {
    id: String!
    slug: String!
    locale: String!
    serviceId: String!
    clientName: String!
    challenge: String!
    strategy: String!
    execution: String!
    results: JSON!
    gallery: JSON!
    seo: SeoMeta
    status: String!
  }

  type Testimonial {
    id: String!
    clientName: String!
    clientRole: String
    quote: String
    videoUrl: String
    rating: Int
    featured: Boolean!
    serviceId: String
  }

  type TeamMember {
    id: String!
    name: String!
    role: String!
    photo: String
    bio: String
    order: Int!
  }

  type Lead {
    id: String!
    source: String!
    name: String!
    email: String!
    phone: String
    service: String
    message: String
    createdAt: String!
  }

  type ThemeSetting {
    fontHeading: String!
    fontBody: String!
    colorBrand: String!
    colorAccent: String!
    animationsMode: String!
  }

  input ThemeSettingInput {
    fontHeading: String
    fontBody: String
    colorBrand: String
    colorAccent: String
    animationsMode: String
  }

  input LeadInput {
    source: String!
    name: String!
    email: String!
    phone: String
    service: String
    message: String
  }

  type Query {
    me: User
    users: [User!]!
    pages(locale: String = "en"): [Page!]!
    page(slug: String!, locale: String = "en"): Page
    services(locale: String = "en"): [Service!]!
    service(slug: String!, locale: String = "en"): Service
    caseStudies(locale: String = "en"): [CaseStudy!]!
    caseStudy(slug: String!, locale: String = "en"): CaseStudy
    testimonials(featuredOnly: Boolean = false): [Testimonial!]!
    teamMembers: [TeamMember!]!
    leads: [Lead!]!
    themeSetting: ThemeSetting!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!

    createUser(username: String!, password: String!, role: Role!): User!
    setUserRole(userId: String!, role: Role!): User!
    setUserActive(userId: String!, isActive: Boolean!): User!

    upsertPage(slug: String!, locale: String = "en", title: String!, blocks: JSON!, status: String): Page!
    upsertPageSeo(slug: String!, locale: String = "en", seo: SeoMetaInput!): Page!

    upsertService(slug: String!, locale: String = "en", name: String!, summary: String!, who: String!, what: String!, when: String!, where: String!, why: String!, workSamples: JSON, order: Int, status: String): Service!
    upsertServiceSeo(slug: String!, locale: String = "en", seo: SeoMetaInput!): Service!

    createCaseStudy(slug: String!, locale: String = "en", serviceId: String!, clientName: String!, challenge: String!, strategy: String!, execution: String!, results: JSON, gallery: JSON, status: String): CaseStudy!

    createTestimonial(clientName: String!, clientRole: String, quote: String, videoUrl: String, rating: Int, featured: Boolean, serviceId: String): Testimonial!

    submitLead(input: LeadInput!): Lead!

    updateThemeSetting(input: ThemeSettingInput!): ThemeSetting!
  }
`;
