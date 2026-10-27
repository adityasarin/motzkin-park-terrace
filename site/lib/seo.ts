import type { Metadata } from "next";
import { project, SITE_URL } from "@/content/project";

export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: project.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
