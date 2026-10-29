import Image from "next/image";
import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { BookCall } from "@/components/book-call";
import { PhoneIcon } from "@/components/icons";
import { VideoPlayer } from "@/components/video-player";
import { ShowcaseCarousel } from "@/components/showcase-carousel";
import { ShowcaseStrip } from "@/components/showcase-strip";
import { ProofIcon } from "@/components/proof-icons";
import { StructuredData } from "@/components/structured-data";
import { showcase } from "@/content/showcase";
import { site, services, processSteps as steps } from "@/content/site";
import { work } from "@/content/work";

export default function Home() {
  const featured = work[0];

  // The two collections that answer "what do you actually do" get the full
  // carousel. Sticker packs and wall art are real work but a different
  // question, so they sit below as a compact strip.
  const primary = showcase.filter((collection) => !collection.compact);
  const secondary = showcase.filter((collection) => collection.compact);

  return (
    <>
      <StructuredData
        video={
          featured.video
            ? {
                title: featured.video.title,
                description: featured.video.description,
                src: featured.video.src,
                poster: featured.video.poster,
                duration: featured.video.duration,
                uploadDate: featured.video.uploadDate,
              }
            : undefined
        }
      />
      <section className="hero" id="top">
        <div className="shell">
          <p className="eyebrow">Virtual assistant · Inbox management & AI-assisted operations</p>
          <h1>
            Your inbox at <span className="mint">zero</span>.
            <br />
            Your week, <span className="mint nowrap">pre-built</span>.
          </h1>
          <p className="hero-lede">{site.intro}</p>

          <div className="hero-actions">
            <BookCall className="btn btn-primary">
              Book a call <PhoneIcon />
            </BookCall>
            <a className="btn btn-ghost" href={`mailto:${site.email}`}>
              Drop me an email
            </a>
          </div>

          <div className="hero-meta">
            <span>
              <i className="dot-live" aria-hidden="true" /> Available 40 hrs/week
            </span>
            <span>Philippines · GMT+8</span>
            <span>Four-hour overlap with US and AU</span>
          </div>
        </div>
      </section>

      <section aria-label="At a glance">
        <div className="shell">
          <div className="proof">
            <div>
              <div className="proof-top">
                <ProofIcon kind="inbox" />
                <b>8 → 0</b>
              </div>
              <span>unread messages to inbox zero</span>
            </div>
            <div>
              <div className="proof-top">
                <ProofIcon kind="routine" />
                <b>15 min</b>
              </div>
              <span>daily routine, written down</span>
            </div>
            <div>
              <div className="proof-top">
                <ProofIcon kind="kits" />
                <b>26</b>
              </div>
              <span>editable templates and content kits</span>
            </div>
            <div>
              <div className="proof-top">
                <ProofIcon kind="reply" />
                <b>24 h</b>
              </div>
              <span>reply time, Monday to Saturday</span>
            </div>
          </div>
          <p className="proof-note">
            Build 01, measured in a practice sandbox. Every product below opens full size, and 23
            files are published for download.
          </p>
        </div>
      </section>

      <section className="section" id="services">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="section-tag">01 — What I do</span>
              <h2>Four things I can be hired for.</h2>
            </div>
            <p className="section-note">
              Every engagement is quoted after a short call, and the number is fixed in writing before
              work starts.
            </p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <div className="service-row" key={service.no} data-state={service.status}>
                <span className="service-num">{service.no}</span>
                <span className="service-name">
                  {service.href ? <Link href={service.href}>{service.title}</Link> : service.title}
                </span>
                <p className="service-copy">{service.summary}</p>
                <span className="service-meta">
                  <span className="service-status">{service.statusLabel}</span>
                  <span className="service-engagement">{service.engagement}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="section-tag">02 — About</span>
              <h2>I learned this on a night shift. I do it remotely now.</h2>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              {site.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="facts">
              <dl>
                {site.facts.map(([label, value]) => (
                  <div className="fact" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="build">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="section-tag">03 — The flagship build</span>
              <h2>Inbox Zero Kit</h2>
            </div>
            <p className="section-note">
              The build with a recorded walkthrough, a written SOP and the files published
              together.
            </p>
          </div>

          <div className="work-card">
            <div className="work-copy">
              <div className="work-kicker">
                <span className="tag">Build 01</span>
                <span>{featured.kicker}</span>
              </div>
              <h3>Seven labels, eight filters, one routine</h3>
              <p className="work-summary">{featured.summary}</p>

              <div className="metrics">
                {featured.metrics.map((metric) => (
                  <div className="metric" key={metric.label}>
                    <b>{metric.value}</b>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <Link className="link-arrow" href={`/work/${featured.slug}`}>
                Read the build <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="work-media">
              {featured.media.before && (
                <figure>
                  <Image
                    className="shot"
                    src={featured.media.before.src}
                    width={featured.media.before.width}
                    height={featured.media.before.height}
                    alt={featured.media.before.alt}
                    sizes="(max-width: 900px) 100vw, 520px"
                  />
                  <figcaption>{featured.media.before.caption}</figcaption>
                </figure>
              )}
              {featured.media.after && (
                <figure>
                  <Image
                    className="shot"
                    src={featured.media.after.src}
                    width={featured.media.after.width}
                    height={featured.media.after.height}
                    alt={featured.media.after.alt}
                    sizes="(max-width: 900px) 100vw, 520px"
                  />
                  <figcaption>{featured.media.after.caption}</figcaption>
                </figure>
              )}
            </div>
          </div>
        </div>
      </section>

      {featured.video && (
        <section className="showcase-block" aria-label={`${featured.video.title} walkthrough`}>
          <div className="shell">
            <div className="film-head">
              <p className="eyebrow">Watch the build</p>
              <span>3:31 · one take, no cuts</span>
            </div>

            <figure className="film">
              <VideoPlayer
                src={featured.video.src}
                poster={featured.video.poster}
                title={featured.video.title}
              />
            </figure>
          </div>
        </section>
      )}

      <section id="showcase">
        <div className="section">
          <div className="shell">
            <div className="section-head">
              <div>
                <span className="section-tag">04 — The product library</span>
                <h2>Twenty-six products you can actually open.</h2>
              </div>
              <p className="section-note">
                Click any one for full size, or take the file with you. 15 are editable documents —
                the rest are the finished visuals.
              </p>
            </div>

            <nav className="library-index" aria-label="Jump to a collection">
              {showcase.map((collection) => (
                <a key={collection.id} href={`#lib-${collection.id}`}>
                  <b>{collection.items.length}</b>
                  <span>{collection.title.replace(/^AI /, "")}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {primary.map((collection) => (
          <div className="showcase-block" id={`lib-${collection.id}`} key={collection.id}>
            <div className="shell">
              <div className="showcase-head">
                <div>
                  <h3>
                    <span className="mint">{collection.no}</span> {collection.title}
                  </h3>
                  <p>{collection.blurb}</p>
                </div>
                {collection.caseStudy && (
                  <a className="btn btn-ghost btn-sm" href={`${collection.caseStudy}#files`}>
                    {collection.files} files · free to download <span className="arrow">→</span>
                  </a>
                )}
              </div>

              <ShowcaseCarousel collection={collection} />
            </div>
          </div>
        ))}

        {secondary.map((collection) => (
          <div className="showcase-block" id={`lib-${collection.id}`} key={collection.id}>
            <div className="shell">
              <div className="showcase-head">
                <div>
                  <span className="section-tag">Also make</span>
                  <h3>{collection.title}</h3>
                  <p>{collection.blurb}</p>
                </div>
                {collection.caseStudy && (
                  <a className="btn btn-ghost btn-sm" href={`${collection.caseStudy}#files`}>
                    {collection.files} files · free to download <span className="arrow">→</span>
                  </a>
                )}
              </div>

              <ShowcaseStrip collection={collection} />
            </div>
          </div>
        ))}
      </section>

      <section className="section" id="process">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="section-tag">05 — How I work</span>
              <h2>Four steps, the same every time.</h2>
            </div>
            <p className="section-note">
              Nothing is built before step two is in writing.
            </p>
          </div>

          <ol className="steps">
            {steps.map((step) => (
              <li className="step" key={step.no}>
                <span className="step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell">
          <span className="section-tag">06 — Contact</span>
          <h2>Tell me what is broken.</h2>
          <p className="contact-lede">
            Three lines is enough: what lands in your inbox, what you use now, and what you want to
            stop doing. I will answer with what I would do first, whether or not you hire me.
          </p>

          <div className="contact-row">
            <a className="email-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <CopyEmail email={site.email} />
          </div>

          <div className="contact-meta">
            <span>{site.response}</span>
            <span>{site.availability}</span>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp chat
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
