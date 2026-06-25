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
    priority: 0.85,
  },
  {
    path: "/pricing",
    changeFrequency: "monthly" as const,
    priority: 0.82,
  },
  {
    path: "/press",
    changeFrequency: "monthly" as const,
    priority: 0.55,
  },
  {
    path: "/contact",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
  {
    path: "/privacy-policy",
    changeFrequency: "yearly" as const,
    priority: 0.35,
  },
  {
    path: "/terms-and-conditions",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    path: "/account-deletion",
    changeFrequency: "yearly" as const,
    priority: 0.25,
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
