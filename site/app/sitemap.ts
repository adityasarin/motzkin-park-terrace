import type { MetadataRoute } from "next";
import { SITE_URL, configs, project } from "@/content/project";
import { posts } from "@/content/posts";
import { updates } from "@/content/updates";

export default function sitemap(): MetadataRoute.Sitemap {
  const asOf = new Date(project.status.asOf);
  const page = (path: string, priority: number, lastModified = asOf): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  });
  return [
    page("/", 1),
    ...configs.map((c) => page(c.route, 0.9)),
    page("/price-list", 0.9),
    page("/official-facts", 0.9),
    page("/master-plan", 0.8),
    page("/location", 0.8),
    page("/amenities", 0.7),
    page("/specifications", 0.6),
    page("/construction-updates", 0.7, new Date(updates[0].date)),
    page("/nri", 0.7),
    page("/faq", 0.8),
    page("/insights", 0.6),
    ...posts.map((p) => page(`/insights/${p.slug}`, 0.6, new Date(p.date))),
    page("/contact", 0.6),
    page("/privacy", 0.2),
    page("/disclaimer", 0.2),
  ];
}
