import type { MetadataRoute } from "next";
import { guidePages } from "@/lib/guides";
import { SITE_URL, solutionPages } from "@/lib/seo";

const staticRoutes = ["/", "/guides", "/press"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : route === "/press" ? 0.55 : 0.75,
  }));

  const solutionEntries = solutionPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guideEntries = guidePages.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...solutionEntries, ...guideEntries];
}