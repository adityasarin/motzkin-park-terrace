import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/project";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/lp/", "/thank-you", "/design-qa"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // AI answer engines are welcome: the official facts are meant to be quoted.
      ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended", "Bingbot"].map(
        (userAgent) => ({ userAgent, allow: "/", disallow }),
      ),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
