"use client";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/marketing/NavigationLink";
import { usePathname } from "next/navigation";
import { Cloud, Menu, X, ArrowUpRight } from "lucide-react";
import ThemeSettings from "./ThemeSettings";

const links = [
  { name: "Home", href: "/" },
  { name: "Our services", href: "/services" },
  { name: "Our work", href: "/portfolio" },
  { name: "About us", href: "/about" },
];

export default function ClientHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className="gc-header">
      <a href="#main-content" className="gc-skip">
        Skip to content
      </a>
      <div className="gc-container">
        <nav className="gc-nav" aria-label="Main navigation">
          <Link
            href="/"
            className="gc-brand"
            aria-label="GoCloudEx home"
            onClick={() => setOpen(false)}
          >
            <span className="gc-brand-icon">
              <Cloud size={32} strokeWidth={1.8} />
            </span>
            <span className="gc-brand-name">
              GoCloud<em>Ex</em>
            </span>
          </Link>
          <div className="gc-nav-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="gc-nav-actions">
            <ThemeSettings />
            <Link className="gc-button" href="/contact">
              Let’s talk <ArrowUpRight size={16} />
            </Link>
            <button
              ref={button}
              type="button"
              className="gc-menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
        {open && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="gc-mobile-nav"
          >
            {[...links, { name: "Contact", href: "/contact" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active(link.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
