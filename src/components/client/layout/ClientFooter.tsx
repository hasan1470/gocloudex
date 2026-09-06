import Link from "@/components/marketing/NavigationLink";
import { Cloud, Github, ArrowUpRight } from "lucide-react";
export default function ClientFooter() {
  return (
    <footer className="gc-footer">
      <div className="gc-container">
        <div className="gc-footer-grid">
          <div>
            <Link href="/" className="gc-brand">
              <Cloud size={32} strokeWidth={1.8} />
              <span className="gc-brand-name">
                GoCloud<em>Ex</em>
              </span>
            </Link>
            <p>
              Thoughtful websites and useful digital products. Designed with
              purpose, built with care.
            </p>
            <a
              className="gc-footer-social"
              href="https://github.com/hasan1470"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} /> Explore our GitHub <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              {[
                { label: "Home", href: "/" },
                { label: "Our services", href: "/services" },
                { label: "Selected work", href: "/portfolio" },
                { label: "About the studio", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>What we do</h3>
            <ul>
              {[
                { label: "Website design", slug: "website-design" },
                { label: "Web applications", slug: "web-application" },
                { label: "E-commerce", slug: "ecommerce-development" },
                {
                  label: "Mobile applications",
                  slug: "mobile-app-development",
                },
                { label: "Cloud & performance", slug: "cloud-solutions" },
              ].map((link) => (
                <li key={link.slug}>
                  <Link href={"/services/" + link.slug}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="gc-footer-bottom">
          <span>
            © {new Date().getFullYear()} GoCloudEx. All rights reserved.
          </span>
          <div>
            <span>Design. Develop. Keep improving.</span>
            <Link href="/portfolio">Explore the work ↗</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
