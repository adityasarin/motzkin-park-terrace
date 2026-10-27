import { BhkPage } from "@/components/BhkPage";
import { configs, project } from "@/content/project";
import { pageMeta } from "@/lib/seo";

const c = configs.find((x) => x.slug === "3-bhk")!;

export const metadata = pageMeta({
  title: `3 BHK villas on Sarjapur–Attibele Road from ${c.priceDisplay}`,
  description: `3 BHK villas of ${c.areaSqft.toLocaleString("en-IN")} sq ft at ${project.name}, a gated community of ${project.homes.total} homes on Sarjapur–Attibele Road, Bengaluru. From ${c.priceDisplay}, RERA registered.`,
  path: c.route,
});

export default function Page() {
  return <BhkPage slug="3-bhk" />;
}
