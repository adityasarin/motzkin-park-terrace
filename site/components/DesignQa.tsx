"use client";

import { useState } from "react";
import { FaqList } from "./FaqList";
import { LeadForm } from "./lead/LeadForm";
import { faqs } from "@/content/faqs";

const worstFaqs = [
  { group: "QA", q: "Is there a villa for a family of nine with grandparents, two dogs, a home studio and a car collection that needs four covered parking bays and an EV charger?", a: "Supercalifragilisticexpialidociouslylongunbrokenwordthatshouldwrapratherthanoverflowthecolumnoneverysinglescreenwidth. " + "A long answer. ".repeat(30), source: "/faq" },
  { group: "QA", q: "ಮೋಟ್ಜ್‌ಕಿನ್ ಪಾರ್ಕ್ ಟೆರೇಸ್ ಎಲ್ಲಿದೆ? मोट्ज़किन पार्क टेरेस कहाँ है?", a: "ಸರ್ಜಾಪುರ–ಅತ್ತಿಬೆಲೆ ರಸ್ತೆ. सरजापुर–अत्तिबेले रोड।", source: "/location" },
  { group: "QA", q: "?", a: "", source: undefined },
  ...Array.from({ length: 30 }, (_, i) => ({ ...faqs[i % faqs.length], q: `${faqs[i % faqs.length].q} (${i + 1})` })),
];

const worstPrices = [
  { name: "3 BHK villa with an unusually long marketing name that wraps", area: "1,977", price: "₹1,48,00,00,000", per: "₹74,86,090" },
  { name: "4", area: "", price: "On request", per: "—" },
  { name: "ಐದು ಬೆಡ್‌ರೂಮ್ ವಿಲ್ಲಾ", area: "12,34,567", price: "₹99.99 Cr", per: "₹8,09,999" },
];

export function DesignQa() {
  const [worst, setWorst] = useState(true);
  return (
    <div className="page" style={{ gridTemplateColumns: "1fr" }}>
      <article className="page__read">
        <h1>Design QA</h1>
        <div className="plan-toggle" role="group" aria-label="Data">
          <button type="button" aria-pressed={!worst} onClick={() => setWorst(false)}>
            Demo data
          </button>
          <button type="button" aria-pressed={worst} onClick={() => setWorst(true)}>
            Worst case
          </button>
        </div>
        <h2>Lead form</h2>
        <p>Try: a 60-character name, +971 numbers, an empty submit, Kannada and Devanagari names.</p>
        <div className="lp__form">
          <LeadForm intent="visit" source="design-qa" />
        </div>
        <h2>Price table</h2>
        <table className="facts wide">
          <thead>
            <tr>
              <th scope="col">Villa</th>
              <th scope="col" className="num">Area</th>
              <th scope="col" className="num">From</th>
              <th scope="col" className="num">Per sq ft</th>
            </tr>
          </thead>
          <tbody>
            {(worst ? worstPrices : worstPrices.slice(0, 1)).map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td className="num">{r.area || "—"}</td>
                <td className="num">{r.price}</td>
                <td className="num">{r.per}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>FAQ</h2>
        <FaqList items={worst ? worstFaqs : faqs.slice(0, 4)} />
      </article>
    </div>
  );
}
