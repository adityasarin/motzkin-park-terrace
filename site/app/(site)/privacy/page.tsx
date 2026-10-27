import { project } from "@/content/project";
import { PageShell } from "@/components/Page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy notice",
  description: `How ${project.name} collects and uses your personal data under India’s Digital Personal Data Protection Act, 2023.`,
  path: "/privacy",
});

export default function Privacy() {
  return (
    <PageShell
      stage={{ kind: "photo", src: "/images/paddy-field-in-karnataka-india-2014.jpg", alt: "Young paddy in a Karnataka field", caption: "Paddy in Karnataka after the rains" }}
      crumbs={[{ name: "Privacy", path: "/privacy" }]}
      title="Privacy notice"
      answer={`We collect your name, phone number and, if you give it, your email, only to answer your enquiry about ${project.name}. We do not sell your data. You can ask us to delete it at any time.`}
    >
      {/* TODO-VERIFY: have counsel review this notice before launch. */}
      <h2>Who we are</h2>
      <p>
        {project.developer.legalName}, {project.address.street}, {project.address.city} {project.address.postalCode}, is the data
        fiduciary for this website. Contact: {project.contact.email}.
      </p>
      <h2>What we collect and why</h2>
      <ul className="plain">
        <li>Your name, phone number and optional email, to call, WhatsApp or email you about the project.</li>
        <li>The villa type and visit date you choose, to prepare for your visit.</li>
        <li>The page and advert that brought you here, to understand which advertising works.</li>
      </ul>
      <h2>Consent</h2>
      <p>
        We process your data on the basis of the consent you give when you tick the box on our forms, as the Digital Personal Data
        Protection Act, 2023 requires. You can withdraw consent by writing to {project.contact.email} or replying STOP on WhatsApp.
      </p>
      <h2>Cookies and advertising</h2>
      <p>
        With your agreement we use Google Analytics, Google Ads and the Meta Pixel to measure visits and adverts. If you decline,
        these tools do not store cookies.
      </p>
      <h2>Who sees your data</h2>
      <p>
        Our sales team, and the service providers that store and process it for us (Google Workspace, Meta). We keep enquiries for
        up to two years after the project is handed over, then delete them.
      </p>
      <h2>Your rights</h2>
      <p>
        You may ask to see, correct or erase your data, and complain to the Data Protection Board of India. We respect the TRAI
        Do Not Disturb register for calls.
      </p>
    </PageShell>
  );
}
