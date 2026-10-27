/** The terrace-railing stripe: alternating bars of ink and paper, the page's one ornament. */
export function Stripe({ thin = false, live = false }: { thin?: boolean; live?: boolean }) {
  return (
    <div className={`stripe${thin ? " stripe--thin" : ""}${live ? " stripe--live" : ""}`} aria-hidden="true">
      {Array.from({ length: thin ? 90 : 44 }, (_, i) => (
        <span key={i} style={live ? ({ "--n": i } as React.CSSProperties) : undefined} />
      ))}
    </div>
  );
}
