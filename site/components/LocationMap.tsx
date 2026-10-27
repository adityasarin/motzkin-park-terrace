"use client";

import { useState } from "react";
import { allPlaces } from "@/content/connectivity";

/**
 * Schematic landmark map: the gate at the centre, each place set at its compass bearing
 * and a square-root scaled distance so near and far both fit. Rings are tone steps, not lines.
 */
const R = 280;
const MAX = 64;
const scale = (km: number) => (Math.sqrt(km) / Math.sqrt(MAX)) * R;

export function LocationMap() {
  const [sel, setSel] = useState<string>("Indus International School");
  const place = allPlaces.find((p) => p.name === sel);

  return (
    <div className="locmap">
      <svg viewBox="-320 -320 640 640" role="img" aria-label="Schematic map of places around Motzkin Park Terrace by distance and direction">
        {[64, 20, 10, 5].map((km, i) => (
          <circle key={km} r={scale(km)} fill={["var(--surface-2)", "var(--surface)", "var(--surface-2)", "var(--surface)"][i]} />
        ))}
        {[5, 10, 20].map((km) => (
          <text key={km} x={4} y={-scale(km) + 18} fontSize="13" fill="var(--muted)">
            {km} km
          </text>
        ))}
        {allPlaces.map((p) => {
          const a = ((p.bearing - 90) * Math.PI) / 180;
          const x = Math.cos(a) * scale(p.km);
          const y = Math.sin(a) * scale(p.km);
          const on = p.name === sel;
          return (
            <g key={p.name} onClick={() => setSel(p.name)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={y} r={on ? 10 : 6} fill={on ? "var(--accent)" : "var(--ink)"} />
              {on && (
                <text x={x + (x > 120 ? -14 : 14)} y={y + 5} fontSize="16" fill="var(--ink)" textAnchor={x > 120 ? "end" : "start"}>
                  {p.name}
                </text>
              )}
            </g>
          );
        })}
        <rect x={-9} y={-9} width={18} height={18} fill="var(--accent)" />
        <text x={0} y={30} fontSize="15" textAnchor="middle" fill="var(--ink)">
          Park Terrace
        </text>
        <text x={0} y={-296} fontSize="15" textAnchor="middle" fill="var(--muted)">
          N
        </text>
      </svg>
      <p className="locmap__readout" aria-live="polite">
        {place && (
          <>
            <strong>{place.name}</strong>: {place.km} km by road, about {place.minutes} minutes off-peak.
          </>
        )}
      </p>
      <ul className="locmap__list" aria-label="Choose a place">
        {allPlaces.map((p) => (
          <li key={p.name}>
            <button type="button" aria-pressed={p.name === sel} onClick={() => setSel(p.name)}>
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
