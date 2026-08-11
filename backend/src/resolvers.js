import argon2 from "argon2";
import { GraphQLJSON } from "graphql-scalars";
import { signToken, requireAuth, requirePermission } from "./auth.js";

function log(prisma, user, action, entity, entityId, metadata) {
  if (!user) return;
  return prisma.auditLog.create({
    data: { userId: user.sub, action, entity, entityId, metadata },
  }).catch(() => {});
}

export const resolvers = {
  JSON: GraphQLJSON,

  Service: {
    caseStudies: (parent, _args, { prisma }) =>
      prisma.caseStudy.findMany({ where: { serviceId: parent.id } }),
    testimonials: (parent, _args, { prisma }) =>
      prisma.testimonial.findMany({ where: { serviceId: parent.id } }),
  },
  Page: {
    seo: (parent, _args, { prisma }) => prisma.seoMeta.findUnique({ where: { pageId: parent.id } }),
  },

  Query: {
    me: async (_p, _a, { user, prisma }) => {
      if (!user) return null;
      return prisma.user.findUnique({ where: { id: user.sub } });
    },
    users: async (_p, _a, { user, prisma }) => {
      requirePermission(user, "write:users");
      return prisma.user.findMany();
    },
    pages: (_p, { locale }, { prisma }) => prisma.page.findMany({ where: { locale } }),
    page: (_p, { slug, locale }, { prisma }) => prisma.page.findUnique({ where: { slug_locale: { slug, locale } } }),
    services: (_p, { locale }, { prisma }) =>
      prisma.service.findMany({ where: { locale }, orderBy: { order: "asc" } }),
    service: (_p, { slug, locale }, { prisma }) =>
      prisma.service.findUnique({ where: { slug_locale: { slug, locale } } }),
    caseStudies: (_p, { locale }, { prisma }) => prisma.caseStudy.findMany({ where: { locale } }),
    caseStudy: (_p, { slug, locale }, { prisma }) =>
      prisma.caseStudy.findUnique({ where: { slug_locale: { slug, locale } } }),
    testimonials: (_p, { featuredOnly }, { prisma }) =>
      prisma.testimonial.findMany({ where: featuredOnly ? { featured: true } : {} }),
    teamMembers: (_p, _a, { prisma }) => prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
    leads: (_p, _a, { user, prisma }) => {
      requirePermission(user, "read:all");
      return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    },
    themeSetting: (_p, _a, { prisma }) =>
      prisma.themeSetting.upsert({ where: { key: "active" }, update: {}, create: { key: "active" } }),
  },

  Mutation: {
    login: async (_p, { username, password }, { prisma }) => {
      const dbUser = await prisma.user.findUnique({ where: { username } });
      if (!dbUser || !dbUser.isActive) throw new Error("Invalid credentials");
      const valid = await argon2.verify(dbUser.passwordHash, password);
      if (!valid) throw new Error("Invalid credentials");
      const token = signToken(dbUser);
      return { token, user: dbUser };
    },

    createUser: async (_p, { username, password, role }, { user, prisma }) => {
      requirePermission(user, "write:users");
      const passwordHash = await argon2.hash(password);
      const created = await prisma.user.create({ data: { username, passwordHash, role } });
      await log(prisma, user, "create", "User", created.id);
      return created;
    },
    setUserRole: async (_p, { userId, role }, { user, prisma }) => {
      requirePermission(user, "write:users");
      const updated = await prisma.user.update({ where: { id: userId }, data: { role } });
      await log(prisma, user, "update-role", "User", userId, { role });
      return updated;
    },
    setUserActive: async (_p, { userId, isActive }, { user, prisma }) => {
      requirePermission(user, "write:users");
      const updated = await prisma.user.update({ where: { id: userId }, data: { isActive } });
      await log(prisma, user, "update-active", "User", userId, { isActive });
      return updated;
    },

    upsertPage: async (_p, { slug, locale, title, blocks, status }, { user, prisma }) => {
      requirePermission(user, "write:content");
      const page = await prisma.page.upsert({
        where: { slug_locale: { slug, locale } },
        update: { title, blocks, status: status || undefined },
        create: { slug, locale, title, blocks, status: status || "draft" },
      });
      await log(prisma, user, "upsert", "Page", page.id);
      return page;
    },
    upsertPageSeo: async (_p, { slug, locale, seo }, { user, prisma }) => {
      requirePermission(user, "write:seo");
      const page = await prisma.page.findUnique({ where: { slug_locale: { slug, locale } } });
      if (!page) throw new Error("Page not found");
      await prisma.seoMeta.upsert({
        where: { pageId: page.id },
        update: seo,
        create: { ...seo, pageId: page.id },
      });
      await log(prisma, user, "upsert-seo", "Page", page.id);
      return page;
    },

    upsertService: async (_p, args, { user, prisma }) => {
      requirePermission(user, "write:content");
      const { slug, locale, ...data } = args;
      const service = await prisma.service.upsert({
        where: { slug_locale: { slug, locale } },
        update: data,
        create: { slug, locale, ...data },
      });
      await log(prisma, user, "upsert", "Service", service.id);
      return service;
    },
    upsertServiceSeo: async (_p, { slug, locale, seo }, { user, prisma }) => {
      requirePermission(user, "write:seo");
      const service = await prisma.service.findUnique({ where: { slug_locale: { slug, locale } } });
      if (!service) throw new Error("Service not found");
      await prisma.seoMeta.upsert({
        where: { serviceId: service.id },
        update: seo,
        create: { ...seo, serviceId: service.id },
      });
      await log(prisma, user, "upsert-seo", "Service", service.id);
      return service;
    },

    createCaseStudy: async (_p, args, { user, prisma }) => {
      requirePermission(user, "write:content");
      const created = await prisma.caseStudy.create({ data: args });
      await log(prisma, user, "create", "CaseStudy", created.id);
      return created;
    },

    createTestimonial: async (_p, args, { user, prisma }) => {
      requirePermission(user, "write:content");
      const created = await prisma.testimonial.create({ data: args });
      await log(prisma, user, "create", "Testimonial", created.id);
      return created;
    },

    submitLead: async (_p, { input }, { prisma }) => {
      // Public mutation — no auth required (this is how visitors contact the agency)
      return prisma.lead.create({ data: input });
    },

    updateThemeSetting: async (_p, { input }, { user, prisma }) => {
      requirePermission(user, "write:theme");
      const updated = await prisma.themeSetting.upsert({
        where: { key: "active" },
        update: input,
        create: { key: "active", ...input },
      });
      return updated;
    },
  },
};
