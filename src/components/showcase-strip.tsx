import Image from "next/image";
import type { ShowcaseCollection } from "@/content/showcase";

/**
 * The secondary collections get a compact, static strip instead of a
 * full-bleed carousel. The stickers and wall art are real work, but they
 * are not what a small business owner came for — so they should read as
 * an extra, not as a third showcase that outweighs the flagship build.
 */
export function ShowcaseStrip({ collection }: { collection: ShowcaseCollection }) {
  return (
    <ul className="strip">
      {collection.items.map((item) => (
        <li className="strip-card" key={item.src}>
          <a
            className="strip-frame"
            href={item.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${item.label} full size`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(max-width: 700px) 45vw, 200px"
            />
          </a>
          <span className="strip-label">{item.label}</span>
          <a
            className="shot-dl"
            href={item.download ?? item.src}
            download
            aria-label={`Download ${item.label}`}
          >
            ↓ {item.downloadKind === "image" ? "Image" : "File"}
          </a>
        </li>
      ))}
    </ul>
  );
}
