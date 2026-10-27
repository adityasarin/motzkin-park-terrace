import { ImageResponse } from "next/og";
import { project, configs } from "@/content/project";
import { plots } from "@/lib/siteplan";

export const alt = `${project.name}: 47 villas on two acres, Sarjapur–Attibele Road`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colours repeat the DESIGN.md tokens; ImageResponse cannot read CSS variables.
const C = { bg: "#1c1c1c", paper: "#e2e2dd", ink: "#1c1c1c", sage: "#8fa68e", three: "#3a3b37", four: "#6f8a6e", ground: "#cdcdc5" };

export default function Og() {
  const s = 0.42;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: C.bg }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 660, padding: 64, background: C.paper, color: C.ink }}>
          <div style={{ display: "flex", height: 40 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} style={{ width: 28, height: 40, background: i % 2 ? C.paper : C.ink }} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34 }}>{project.name}</div>
            <div style={{ fontSize: 84, lineHeight: 0.95, marginTop: 20, letterSpacing: -2 }}>47 villas on two acres</div>
            <div style={{ fontSize: 30, marginTop: 28 }}>
              {`Sarjapur–Attibele Road, Bengaluru · from ${configs[0].priceDisplay.replace("₹", "Rs ")}`}
            </div>
          </div>
          <div style={{ fontSize: 20 }}>{`RERA ${project.rera.number}`}</div>
        </div>
        <div style={{ display: "flex", flex: 1, background: C.ground, position: "relative" }}>
          {plots.map((p) => (
            <div
              key={p.n}
              style={{
                position: "absolute",
                left: 40 + p.x * s,
                top: 40 + p.y * s,
                width: p.w * s,
                height: p.h * s,
                background: p.type === 3 ? C.three : C.four,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
