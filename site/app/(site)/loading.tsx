export default function Loading() {
  return (
    <div className="page" aria-busy="true" aria-live="polite">
      <div className="page__stage" />
      <div className="page__read">
        <p style={{ color: "var(--muted)" }}>Loading…</p>
      </div>
    </div>
  );
}
