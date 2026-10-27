import Link from "next/link";
import { project } from "@/content/project";

export default function NotFound() {
  return (
    <main id="main" className="lp" style={{ paddingTop: "18vh" }}>
      <p className="lp__mark">{project.name}</p>
      <h1>This page isn’t here</h1>
      <p>The link may be old. Everything about the project starts from the home page.</p>
      <p>
        <Link href="/" className="btn">
          Go to the home page
        </Link>
      </p>
    </main>
  );
}
