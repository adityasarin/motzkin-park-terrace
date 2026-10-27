import type { Metadata, Viewport } from "next";
import { Young_Serif, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { LazyToaster } from "@/components/LazyToaster";
import { LeadProvider } from "@/components/lead/LeadModal";
import { Analytics, RevealRoot } from "@/components/Chrome";
import { project, SITE_URL } from "@/content/project";

const display = Young_Serif({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const text = Source_Serif_4({ subsets: ["latin"], variable: "--font-text", display: "swap", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${project.name} | 3 & 4 BHK villas on Sarjapur–Attibele Road from ₹1.48 Cr`,
    template: `%s | ${project.name}`,
  },
  description: project.summary,
  applicationName: project.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1c1c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link sr-only-focusable">
          Skip to content
        </a>
        <LeadProvider>
          {children}
          <RevealRoot />
          <Analytics />
        </LeadProvider>
        <LazyToaster />
      </body>
    </html>
  );
}
