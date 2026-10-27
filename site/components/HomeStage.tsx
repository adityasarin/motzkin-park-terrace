"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SitePlanSvg } from "./SitePlan";

const layers = [
  { id: "lake", caption: "A Bengaluru lake in the dry season" },
  { id: "plan", caption: "Illustrative site plan · tap a plot" },
  { id: "map", caption: "Bangalore Taluk, 1878: two roads run “to Sarjapur”" },
] as const;

type LayerId = (typeof layers)[number]["id"];

/**
 * The fixed half of the split stage. It crossfades to the picture that matches the
 * reading block in view ([data-stage] in the left column).
 */
export function HomeStage() {
  const [active, setActive] = useState<LayerId>("lake");

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.getAttribute("data-stage") as LayerId);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5] },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  const caption = layers.find((l) => l.id === active)!.caption;

  return (
    <div className="split__stage">
      <div className="stage-layer" data-active={active === "lake"}>
        <Image
          className="drift"
          src="/images/bangalore-lake-island.jpg"
          alt="A wooded island in a Bengaluru lake under a clear blue sky"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="stage-layer stage-layer--plan" data-active={active === "plan"} aria-hidden={active !== "plan"}>
        <SitePlanSvg interactive={active === "plan"} />
      </div>
      <div className="stage-layer stage-layer--map" data-active={active === "map"} aria-hidden={active !== "map"}>
        <Image
          src="/images/bangalore-map-1878-sarjapur-road.jpg"
          alt="Detail of the 1878 Bangalore Taluk map with two roads marked to Sarjapur"
          fill
          sizes="50vw"
        />
      </div>
      <p className="stage-caption">{caption}</p>
    </div>
  );
}
