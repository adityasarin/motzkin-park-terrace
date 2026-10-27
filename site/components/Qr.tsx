import QRCode from "qrcode";

/** Server-rendered QR code as one SVG path (no client JS). */
export function Qr({ value, label }: { value: string; label: string }) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" });
  const n = modules.size;
  let d = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} role="img" aria-label={label} shapeRendering="crispEdges">
      <path d={d} fill="var(--paper-ink)" />
    </svg>
  );
}
