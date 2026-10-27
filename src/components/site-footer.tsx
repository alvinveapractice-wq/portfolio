import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>
          © 2026 {site.name} · {site.location}
        </span>
        <span>
          Practice builds are labelled · No client work is claimed ·{" "}
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </div>
    </footer>
  );
}
