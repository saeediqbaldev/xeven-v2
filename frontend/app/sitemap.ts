import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { LEGAL_DOCS } from "@/data/legal";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xevenpixels.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/testimonials",
    "/case-studies",
    "/consultancy",
    "/contact",
    "/sitemap",
  ];

  const serviceRoutes = SERVICES.map((s) => `/services/${s.slug}`);
  const legalRoutes = LEGAL_DOCS.map((d) => `/legal/${d.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...legalRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
