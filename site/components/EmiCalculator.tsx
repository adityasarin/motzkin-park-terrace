"use client";

import { useId, useState } from "react";
import { configs, formatINR } from "@/content/project";

/** Monthly EMI for a villa price, loan share, rate and tenure. Standard reducing-balance formula. */
export function EmiCalculator({ defaultSlug = "3-bhk" }: { defaultSlug?: "3-bhk" | "4-bhk" }) {
  const id = useId();
  const [slug, setSlug] = useState(defaultSlug);
  const [share, setShare] = useState(80);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const c = configs.find((x) => x.slug === slug)!;
  const loan = Math.round((c.priceFrom * share) / 100);
  const r = rate / 12 / 100;
  const n = years * 12;
  const emi = Math.round((loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  return (
    <div className="emi" role="group" aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`}>Your monthly EMI</h3>
      <label htmlFor={`${id}-cfg`}>Villa</label>
      <select id={`${id}-cfg`} className="field" value={slug} onChange={(e) => setSlug(e.target.value as typeof slug)}>
        {configs.map((x) => (
          <option key={x.slug} value={x.slug}>
            {x.name} from {x.priceDisplay}
          </option>
        ))}
      </select>
      <label htmlFor={`${id}-share`}>
        Loan amount <output htmlFor={`${id}-share`}>{share}% · {formatINR(loan)}</output>
      </label>
      <input id={`${id}-share`} type="range" min={10} max={90} step={5} value={share} onChange={(e) => setShare(+e.target.value)} />
      <label htmlFor={`${id}-rate`}>
        Interest rate <output htmlFor={`${id}-rate`}>{rate.toFixed(2)}% a year</output>
      </label>
      <input id={`${id}-rate`} type="range" min={7} max={12} step={0.05} value={rate} onChange={(e) => setRate(+e.target.value)} />
      <label htmlFor={`${id}-years`}>
        Tenure <output htmlFor={`${id}-years`}>{years} years</output>
      </label>
      <input id={`${id}-years`} type="range" min={5} max={30} step={1} value={years} onChange={(e) => setYears(+e.target.value)} />
      <p className="emi__result" aria-live="polite">
        <strong className="tnum">{formatINR(emi)}</strong>a month for {years} years
      </p>
      <p className="emi__fine">An estimate on the starting price. Your bank’s offer, charges and taxes will change it.</p>
    </div>
  );
}
