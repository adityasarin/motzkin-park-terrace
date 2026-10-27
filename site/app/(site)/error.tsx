"use client";

import { project, telHref } from "@/content/project";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="lp" style={{ paddingTop: "12vh" }}>
      <h1>Something went wrong</h1>
      <p>
        Please try again. If it keeps happening, call us on{" "}
        <a href={telHref} className="textlink tnum">
          {project.contact.phone}
        </a>
        .
      </p>
      <button type="button" className="btn" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
