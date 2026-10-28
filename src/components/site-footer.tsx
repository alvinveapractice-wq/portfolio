import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>
          © 2026 {site.name} · {site.location}
        </span>
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}
