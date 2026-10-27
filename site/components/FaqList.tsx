import Link from "next/link";
import type { Faq } from "@/content/faqs";

export function FaqList({ items, onPaper = false }: { items: Faq[]; onPaper?: boolean }) {
  return (
    <div className={onPaper ? "on-paper" : undefined}>
      {items.map((f) => (
        <details className="qa" key={f.q}>
          <summary>{f.q}</summary>
          <p className="qa__a">
            {f.a}
            {f.source && (
              <>
                {" "}
                <Link href={f.source}>Source</Link>
              </>
            )}
          </p>
        </details>
      ))}
    </div>
  );
}
