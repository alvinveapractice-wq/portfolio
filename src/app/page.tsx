import Image from "next/image";
import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { site, services, processSteps as steps } from "@/content/site";
import { work } from "@/content/work";

export default function Home() {
  const featured = work[0];

  return (
    <>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Virtual assistant · Email, automation and web</p>
          <h1>
            Your inbox at <span className="h1-accent">zero</span>.
            <br />
            Your <span className="nowrap">follow-up</span> on time.
          </h1>
          <p className="hero-lede">{site.intro}</p>

          <div className="hero-actions">
            <Link className="btn btn-primary" href={`/work/${featured.slug}`}>
              See the Inbox Zero build <span className="arrow">→</span>
            </Link>
            <span className="hero-hint">
              SOP, templates and filter list included · no signup
            </span>
          </div>

          <div className="hero-meta">
            <span>
              <i className="dot-live" aria-hidden="true" /> Available {site.availability.split(" · ")[0]}
            </span>
            <span>{site.location}</span>
            <span>Four-hour overlap with US and AU</span>
          </div>
        </div>
      </section>

      {featured.video && (
        <section className="hero-film" aria-label={`${featured.video.title} walkthrough`}>
          <div className="shell">
            <div className="film-head">
              <p className="eyebrow">Watch the build</p>
              <span>3:31 · one take, no cuts</span>
            </div>

            <figure className="film">
              <video controls playsInline preload="none" poster={featured.video.poster}>
                <source src={featured.video.src} type="video/mp4" />
                Your browser cannot play this video. The same steps are written up in the case study.
              </video>
              <figcaption>
                Eight unread messages to zero, with the labels and filters shown live — narrated at a
                working pace, not a demo pace.
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section aria-label="At a glance">
        <div className="shell">
          <div className="proof">
            <div>
              <b>8 → 0</b>
              <span>unread messages to inbox zero</span>
            </div>
            <div>
              <b>15 min</b>
              <span>daily routine, written down</span>
            </div>
            <div>
              <b>7 + 8</b>
              <span>labels and filters doing the sorting</span>
            </div>
            <div>
              <b>24 h</b>
              <span>reply time, Monday to Saturday</span>
            </div>
          </div>
          <p className="proof-note">
            Figures from Build 01, a self-directed practice sandbox. No client results are claimed.
          </p>
        </div>
      </section>

      <section className="section" id="work">
        <div className="shell">
          <div className="section-head">
            <h2>The work</h2>
            <p className="section-note">
              Every build is a practice project in a sandbox. Each claim has a file, a screenshot, and a
              recording behind it.
            </p>
          </div>

          <div className="work-card">
            <div className="work-copy">
              <div className="work-kicker">
                <span className="tag">Build {featured.number}</span>
                <span>{featured.kicker}</span>
              </div>
              <h3>{featured.title}</h3>
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

      <section className="section" id="services">
        <div className="shell">
          <div className="section-head">
            <h2>Six ways I can help</h2>
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
                  <span className="service-status">
                    {service.status === "available" ? "Available now" : "Coming soon"}
                  </span>
                  <span className="service-engagement">{service.engagement}</span>
                </span>
              </div>
            ))}
          </div>

          <p className="service-foot">
            <b>Available now</b> means there is proof behind the line: a case study, a build you can
            open, or work I can walk you through on a call. <b>Coming soon</b> means the proof build is
            still in progress — those lines are quoted once their walkthrough is published, one a week.
          </p>
        </div>
      </section>

      <section className="section" id="process">
        <div className="shell">
          <div className="section-head">
            <h2>How I work</h2>
            <p className="section-note">
              Four steps, the same on every engagement. Nothing is built before step two is in writing.
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

      <section className="section" id="about">
        <div className="shell">
          <div className="section-head">
            <h2>About</h2>
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

      <section className="contact" id="contact">
        <div className="shell">
          <p className="eyebrow">Contact</p>
          <h2>Tell me what is broken.</h2>
          <p className="contact-lede">
            Three lines is enough: what lands in your inbox, what you use now, and what you want to stop
            doing. I will answer with what I would do first, whether or not you hire me.
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
            <span>{site.phone}</span>
          </div>
        </div>
      </section>
    </>
  );
}
