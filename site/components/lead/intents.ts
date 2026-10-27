export const intents = {
  visit: { title: "Book a site visit", desc: "Pick a day and we will call to confirm a time. Visits run every day, 10 am to 6 pm.", submit: "Book my visit" },
  "cost-sheet": { title: "Get the cost sheet", desc: "The full price breakdown with charges and the payment plan, sent to your WhatsApp or email.", submit: "Send me the cost sheet" },
  brochure: { title: "Get the brochure", desc: "Plans, specifications and the site layout in one PDF, sent to your WhatsApp or email.", submit: "Send me the brochure" },
  "floor-plans": { title: "Get the floor plans", desc: "Architect’s plans for the 3 BHK and 4 BHK villas, sent to your WhatsApp or email.", submit: "Send me the plans" },
  callback: { title: "Ask us anything", desc: "Leave your number and the site team will call you back within working hours.", submit: "Call me back" },
  "virtual-tour": { title: "Book a video walkthrough", desc: "A live video tour of the site and show villa, at a time that suits your time zone.", submit: "Book my tour" },
} as const;

export type Intent = keyof typeof intents;

export const isIntent = (v: unknown): v is Intent => typeof v === "string" && v in intents;
