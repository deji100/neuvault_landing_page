// sitemap.ts
import type { MetadataRoute } from "next";
import { guidePages } from "@/lib/guides";
import { SITE_URL, solutionPages } from "@/lib/seo";

const staticRoutes = [
  {
    path: "/",
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    path: "/guides",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  },
  {
    path: "/press",
    changeFrequency: "monthly" as const,
    priority: 0.55,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const solutionEntries: MetadataRoute.Sitemap = solutionPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const guideEntries: MetadataRoute.Sitemap = guidePages.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...solutionEntries, ...guideEntries];
}