import { notFound } from "next/navigation";
import { DesignQa } from "@/components/DesignQa";
import { pageMeta } from "@/lib/seo";

// Rendered per request so production answers with a real 404 status.
export const dynamic = "force-dynamic";

export const metadata = pageMeta({ title: "Design QA", description: "Worst-case data states.", path: "/design-qa", noindex: true });

/** Dev-only: worst-case data for break-ui. Absent from the sitemap and 404 in production. */
export default function DesignQaPage() {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_DESIGN_QA !== "1") notFound();
  return <DesignQa />;
}
