import type { MetadataRoute } from "next";
import { SITE_URL, solutionPages } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/account-deletion",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: (route === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const solutionEntries = solutionPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...solutionEntries];
}
