import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShowcaseCarousel } from "@/components/showcase-carousel";
import { VideoPlayer } from "@/components/video-player";
import { getWork, work } from "@/content/work";
import { StructuredData } from "@/components/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};

  return {
    title: `${item.title} — ${item.kicker}`,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title: `${item.title} — ${item.kicker}`,
      description: item.summary,
      url: `/work/${item.slug}`,
      type: "article",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${item.title} — ${item.kicker}`,
        },
      ],
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  return (
    <>
      <StructuredData
        video={
          item.video
            ? {
                title: item.video.title,
                description: item.video.description,
                src: item.video.src,
                poster: item.video.poster,
                duration: item.video.duration,
                uploadDate: item.video.uploadDate,
              }
            : undefined
        }
      />
      <article>
        <div className="shell">
          <header className="cs-hero">
            <Link className="backlink" href="/#work">
              ← All work
            </Link>
            <p className="eyebrow">
              Build {item.number} · {item.kicker} · {item.year}
            </p>
            <h1>{item.title}</h1>
            <p className="cs-summary">{item.summary}</p>

            <dl className="cs-meta">
              {item.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          {item.media.before && item.media.after && (
            <div className="cs-media">
              <figure>
                <Image
                  className="shot"
                  src={item.media.before.src}
                  width={item.media.before.width}
                  height={item.media.before.height}
                  alt={item.media.before.alt}
                  sizes="(max-width: 720px) 100vw, 540px"
                  priority
                />
                <figcaption>{item.media.before.caption}</figcaption>
              </figure>
              <figure>
                <Image
                  className="shot"
                  src={item.media.after.src}
                  width={item.media.after.width}
                  height={item.media.after.height}
                  alt={item.media.after.alt}
                  sizes="(max-width: 720px) 100vw, 540px"
                />
                <figcaption>{item.media.after.caption}</figcaption>
              </figure>
            </div>
          )}

          {item.media.wide && (
            <div className="cs-wide">
              <figure>
                <Image
                  className="shot"
                  src={item.media.wide.src}
                  width={item.media.wide.width}
                  height={item.media.wide.height}
                  alt={item.media.wide.alt}
                  sizes="100vw"
                />
                <figcaption>{item.media.wide.caption}</figcaption>
              </figure>
            </div>
          )}

          {item.video && (
            <div className="video-wrap">
              <VideoPlayer
                src={item.video.src}
                poster={item.video.poster}
                title={item.video.title}
              />
              <div className="video-cap">
                <span>
                  {item.video.title} · {item.video.length}
                </span>
                <span>Voice-over, no captions. Recorded in one take.</span>
              </div>
            </div>
          )}

          {item.gallery && item.gallery.length > 0 && (
            <div className="cs-gallery">
              <div className="film-head">
                <p className="eyebrow">Every visual in this build</p>
                <span>{item.gallery.length} files · click one for full size</span>
              </div>
              <ShowcaseCarousel
                collection={{
                  id: item.slug,
                  no: item.number,
                  title: item.title,
                  kicker: item.kicker,
                  blurb: item.summary,
                  items: item.gallery,
                }}
              />
            </div>
          )}

          <div className="cs-body">
            <aside className="cs-aside" id="files">
              <h2>Files</h2>
              <ul>
                {item.files?.map((file) => (
                  <li key={file.href}>
                    <a href={file.href} target="_blank" rel="noreferrer">
                      {file.label} ↗
                    </a>
                    <span className="file-note">{file.note}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="prose">
              {item.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="callout">
                <b>Honesty label.</b> {item.honesty}
              </div>
            </div>
          </div>

          <div className="cs-next">
            <p>
              More files are published as each one clears the same check: the file itself, a preview
              you can open, a guide that says what to do with it, and a plain statement of what it
              does not do.
            </p>
            <Link className="link-arrow" href="/#contact">
              Talk about your inbox <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
