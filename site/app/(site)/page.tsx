import Image from "next/image";
import Link from "next/link";
import { project, configs, telHref, priceNote } from "@/content/project";
import { amenityGroups } from "@/content/amenities";
import { placeGroups } from "@/content/connectivity";
import { homeFaqs } from "@/content/faqs";
import { Stripe } from "@/components/Stripe";
import { HomeStage } from "@/components/HomeStage";
import { SitePlanProvider, SitePlanControls } from "@/components/SitePlan";
import { FloorPlanTabs } from "@/components/FloorPlanTabs";
import { CountUp } from "@/components/CountUp";
import { LoopVideo } from "@/components/LoopVideo";
import { LeadButton } from "@/components/lead/LeadModal";
import { FaqList, JsonLd } from "@/components/Page";
import { graph, organization, residence, faqPage } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `${project.name} | 3 & 4 BHK villas on Sarjapur–Attibele Road from ₹1.48 Cr`,
  description: project.summary,
  path: "/",
});

const [three, four] = configs;
const asOf = new Date(project.status.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function Home() {
  return (
    <>
      <JsonLd data={graph(organization(), residence(), faqPage(homeFaqs))} />

      {/* 1. The split stage: hero card, the answer, the site plan */}
      <SitePlanProvider>
        <div className="split">
          <div className="split__read">
            <section className="hero-card" data-stage="lake" aria-labelledby="hero-h">
              <Stripe live />
              <div className="hero-card__body hero-enter">
                <p className="hero-card__mark">{project.name}</p>
                <h1 id="hero-h">47 villas on two acres</h1>
                <p className="hero-card__lede">
                  Gated 3 and 4 BHK villas on Sarjapur–Attibele Road, Bengaluru, from {three.priceDisplay}.
                </p>
                <p className="hero-card__rera tnum">RERA {project.rera.number}</p>
                <LeadButton intent="visit" source="hero" className="btn btn--ink hero-card__cta">
                  Book a site visit
                </LeadButton>
              </div>
              <ul className="hero-card__links">
                <li>
                  <a href="#plans-h" className="textlink">
                    Floor plans
                  </a>
                </li>
                <li>
                  <a href="#prices" className="textlink">
                    Prices
                  </a>
                </li>
                <li>
                  <a href="#distances" className="textlink">
                    Distances
                  </a>
                </li>
              </ul>
            </section>

            <section className="read-block" data-stage="lake" aria-labelledby="about-h">
              <div className="intro" data-reveal>
                <h2 id="about-h" className="sr-only">
                  About the project
                </h2>
                <p className="intro__answer">{project.summary}</p>
                <p>
                  Forty-seven homes is a small number on purpose. It is a street, not a township: you will know the family three
                  gates down, and the pool will be quiet on a Sunday.
                </p>
                <p>
                  Every villa has its own plot, its own front door and a roof terrace. There are no shared walls above or below
                  you, and no lift to wait for.
                </p>
                <p className="intro__date">Facts as of {asOf}.</p>
                <p>
                  <Link href="/official-facts" className="textlink">
                    Read the official facts
                  </Link>
                </p>
              </div>
            </section>

            <section className="read-block planpanel" data-stage="plan" aria-labelledby="plan-h" id="site-plan">
              <div data-reveal>
                <h2 id="plan-h">Find your plot</h2>
                <p>
                  Two internal roads, one gate, and the clubhouse by the entrance. Choose a villa type to see where those homes sit.
                </p>
              </div>
              <SitePlanControls />
            </section>

            <section className="read-block" data-stage="map" aria-labelledby="where-h">
              <div className="intro" data-reveal>
                <h2 id="where-h" className="read-h">
                  On the old Sarjapur road
                </h2>
                <p>
                  The 1878 survey of the Bangalore Taluk shows Bellandur, Agara and Varthur as villages, and two cart roads marked “to
                  Sarjapur”. Park Terrace stands south of that town, between Sarjapura and Attibele.
                </p>
                <p>
                  Today it is three kilometres to Sarjapura, eight minutes to Indus International School and twenty to the Bommasandra
                  industrial area.
                </p>
                <p>
                  <Link href="/location" className="textlink">
                    See the location
                  </Link>
                </p>
              </div>
            </section>
          </div>
          <HomeStage />
        </div>
      </SitePlanProvider>

      {/* 2. Stats: photograph with two figure tiles */}
      <section className="section" aria-labelledby="stats-h">
        <h2 id="stats-h" className="mosaic__head" data-reveal>
          <span>Few homes, more ground</span>
        </h2>
        <div className="mosaic">
          <figure className="mosaic__photo">
            <LoopVideo
              src="/images/aagara-lake-bangalore-2025-03.webm"
              poster="/images/aagara-lake-bangalore-2025-03-poster.jpg"
              label="Monsoon clouds over Agara Lake in south-east Bengaluru, red earth on the shore"
            />
            <figcaption className="photo-credit">Monsoon over Agara Lake, south-east Bengaluru</figcaption>
          </figure>
          <div className="mosaic__tiles">
            <div className="tile tile--sage">
              <p className="tile__figure">
                <CountUp to={project.homes.total} />
              </p>
              <p className="tile__caption">villas on the whole site, each on its own plot</p>
            </div>
            <div className="tile tile--concrete">
              <p className="tile__figure">
                <CountUp to={project.land.acres} decimals={1} />
              </p>
              <p className="tile__caption">acres, about 22 homes to the acre</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Showcase: floor plans */}
      <FloorPlanTabs />

      {/* 4. Features: pinned heading, passing rows */}
      <section className="features" aria-labelledby="amen-h">
        <div className="features__head">
          <h2 id="amen-h">Inside the gate</h2>
        </div>
        <div className="features__blocks">
          {amenityGroups.slice(0, 3).map((g) => (
            <article className="feature" key={g.title} data-reveal>
              <h3>{g.title}</h3>
              <div className="feature__row">
                <figure>
                  <Image src={g.image.src} alt={g.image.alt} width={400} height={533} sizes="(min-width: 1024px) 200px, 100vw" style={{ objectFit: "cover" }} />
                  <figcaption>{g.image.caption}</figcaption>
                </figure>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <p data-reveal>
            <Link href="/amenities" className="textlink">
              All amenities
            </Link>
          </p>
        </div>
      </section>

      {/* 5. List: the printed distance sheet beside the 1878 map */}
      <section className="sheet-wrap" id="distances" aria-labelledby="dist-h">
        <figure className="sheet-map">
          <Image
            src="/images/bangalore-map-1878-sarjapur-road.jpg"
            alt="Detail of the 1878 Bangalore Taluk map: Bellandur, Agara and Varthur, with two roads marked to Sarjapur"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <figcaption>Bangalore Taluk, 1878: Bellandur, Agara and Varthur are villages, and two roads run “to Sarjapur”</figcaption>
        </figure>
        <div className="sheet">
          <h2 id="dist-h">From the gate</h2>
          <p className="sheet__note">By road, with off-peak drive times</p>
          {placeGroups.map((g) => (
            <div className="sheet__group" key={g.name}>
              <h3>{g.name}</h3>
              <ul className="sheet__items">
                {g.places.slice(0, 4).map((p) => (
                  <li key={p.name}>
                    <span>{p.name}</span>
                    <span className="km">{p.km} km</span>
                    <span className="sub">{p.minutes} min</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="sheet__foot">
            Site office {project.contact.hoursShort.toLowerCase()}
            <br />
            <Link href="/location" className="textlink">
              Commute times and the map
            </Link>
          </p>
        </div>
      </section>

      {/* 6. Pricing: two plans, two fields */}
      <section className="pricing" id="prices" aria-label="Prices">
        {[three, four].map((c, n) => (
          <div key={c.slug} className={`plan ${n === 0 ? "plan--paper" : "plan--surface"}`} data-reveal>
            <h2>{c.bhk} BHK villa</h2>
            <p className="plan__for">{c.forWhom}</p>
            <p className="plan__incl">
              {c.areaSqft.toLocaleString("en-IN")} sq ft over three levels on a private plot, with {c.bhk === 3 ? "one covered car park" : "two covered car parks"},
              a roof terrace and clubhouse membership. {c.units} of these villas on the site.
            </p>
            <div className="plan__foot">
              <div>
                <p className="plan__price tnum">
                  {c.priceDisplay.replace(" Cr", "")}
                  <small>Cr onwards</small>
                </p>
                <p className="plan__note">{priceNote}</p>
              </div>
              <LeadButton intent="cost-sheet" source={`pricing-${c.slug}`} className={n === 0 ? "btn btn--ink" : "btn"}>
                Get the cost sheet
              </LeadButton>
            </div>
          </div>
        ))}
      </section>

      {/* 7. Proof: on the record */}
      <section className="section" aria-labelledby="record-h">
        <figure className="record__stone">
          <Image
            src="/images/digital-image-of-the-sarjapura-1429ce-mayileya.jpg"
            alt="Kannada inscription carved in stone at Sarjapura, 1429 CE"
            fill
            sizes="100vw"
          />
          <figcaption>Sarjapura has kept its records in stone since 1429 CE. Ours are filed with Karnataka RERA.</figcaption>
        </figure>
        <div className="record">
          <div data-reveal>
            <h2 id="record-h">On the record</h2>
            <p className="record__lede">The facts other listings disagree on, settled by the developer.</p>
          </div>
          <div className="record__cols">
            <div className="record__kind">
              <p>Registered with</p>
              <p>Karnataka RERA</p>
              <p className="tnum">{project.rera.number}</p>
              <p>
                <a href={project.rera.url} className="textlink">
                  Check the registration
                </a>
              </p>
            </div>
            <div className="record__kind">
              <p>Built by</p>
              <p>{project.developer.legalName}</p>
              <p>{project.address.street}</p>
            </div>
            <div className="record__kind">
              <p>The land</p>
              <p>About {project.land.display}</p>
              <p>{project.homes.total} villas</p>
              <p>{three.units} three-bedroom</p>
              <p>{four.units} four-bedroom</p>
            </div>
            <div className="record__kind">
              <p>Status</p>
              <p>{project.status.label}</p>
              <p>Possession {project.status.possession}</p>
              <p>Updated {asOf}</p>
              <p>
                <Link href="/construction-updates" className="textlink">
                  Site updates
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ beside two photographs */}
      <section className="faq-split" aria-labelledby="faq-h">
        <div>
          <div data-reveal>
            <h2 id="faq-h">Questions buyers ask</h2>
            <ul className="faq-facts">
              <li>{project.address.street}, {project.address.city} {project.address.postalCode}</li>
              <li>{project.contact.hours}</li>
              <li>Take the Sarjapur–Attibele Road south from Sarjapura for 3 km</li>
            </ul>
          </div>
          <FaqList items={homeFaqs} />
          <div className="faq-close">
            <LeadButton intent="callback" source="faq">
              Ask us anything
            </LeadButton>
            <Link href="/faq" className="textlink">
              All questions
            </Link>
          </div>
        </div>
        <figure className="faq-photos">
          <Image
            className="faq-photos__tall"
            src="/images/rain-tree-avenue.jpg"
            alt="Rain-tree trunks and canopy along a Bengaluru road"
            width={900}
            height={1200}
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectPosition: "18% 50%" }}
          />
          <Image
            className="faq-photos__square"
            src="/images/plumeria-rubra-2852.jpg"
            alt="White temple-tree flowers"
            width={500}
            height={500}
            sizes="(min-width: 1024px) 17vw, 38vw"
            style={{ objectPosition: "45% 50%" }}
          />
          <figcaption>Rain trees and temple trees, the street trees of Bengaluru</figcaption>
        </figure>
      </section>

      {/* 9. Contact: the address in display rows */}
      <section aria-labelledby="visit-h">
        <ul className="rows">
          <li>{project.name}</li>
          <li>Thyavakanahalli</li>
          <li>
            <a href={project.address.mapsUrl}>Sarjapur–Attibele Road</a>
          </li>
          <li>Bengaluru {project.address.postalCode}</li>
          <li>{project.contact.hoursShort}</li>
          <li className="tnum">
            <a href={telHref}>{project.contact.phone}</a>
          </li>
          <li className="rows__greet">
            <h2 id="visit-h">Come and see it</h2>
            <LeadButton intent="visit" source="contact-rows" className="round-btn">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 12h15M13 5l7 7-7 7" />
              </svg>
              <span className="sr-only">Book a site visit</span>
            </LeadButton>
          </li>
        </ul>
      </section>
    </>
  );
}
