import Link from "next/link";
import { project, waHref } from "@/content/project";
import { PageShell } from "@/components/Page";
import { Conversion } from "@/components/Conversion";
import { intents, isIntent } from "@/components/lead/intents";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Thank you", description: "We have your request.", path: "/thank-you", noindex: true });

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const { intent: raw } = await searchParams;
  const intent = isIntent(raw) ? raw : "callback";
  const what = intents[intent].title.toLowerCase();
  return (
    <PageShell
      stage={{ kind: "photo", src: "/images/bangalore-lake-island.jpg", alt: "A wooded island in a Bengaluru lake", caption: "A Bengaluru lake in the dry season" }}
      crumbs={[{ name: "Thank you", path: "/thank-you" }]}
      title="Thank you, we have it"
      answer={`Your request to ${what} has reached the site team. We call back within an hour during site office hours (${project.contact.hoursShort}), and first thing the next morning otherwise.`}
    >
      <Conversion intent={intent} />
      <h2 style={{ marginTop: 0 }}>While you wait</h2>
      <ul className="plain">
        <li>
          <a href={waHref(`Hello, I just sent a request to ${what} on the website.`)} className="textlink" target="_blank" rel="noopener">
            Message us on WhatsApp
          </a>{" "}
          if you would rather chat now.
        </li>
        <li>
          <Link href="/location" className="textlink">
            Plan your route
          </Link>{" "}
          to the site.
        </li>
        <li>
          <Link href="/official-facts" className="textlink">
            Check the official facts
          </Link>{" "}
          and the RERA registration.
        </li>
      </ul>
    </PageShell>
  );
}
