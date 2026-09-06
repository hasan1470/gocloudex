import type { Metadata } from "next";
import Link from "@/components/marketing/NavigationLink";
import {
  ArrowUpRight,
  LayoutTemplate,
  Code2,
  ShoppingBag,
  Smartphone,
  Cloud,
  Search,
  MessageSquare,
  MousePointer2,
} from "lucide-react";
import { services } from "@/data/services";
import {
  Process,
  ProjectCTA,
  SectionHeading,
} from "@/components/marketing/Sections";

export const metadata: Metadata = {
  title: "Website, Application & Digital Services",
  description:
    "Website design, web applications, e-commerce, mobile development and practical growth services. Explore our deliverables, process and related projects.",
  alternates: { canonical: "/services" },
};
const icons = [
  LayoutTemplate,
  Code2,
  ShoppingBag,
  Smartphone,
  Cloud,
  Search,
  MessageSquare,
  MousePointer2,
];

export default function ServicesPage() {
  return (
    <div className="gc-site">
      <section className="gc-page-hero">
        <div className="gc-container">
          <div className="gc-hero-topline">
            <span className="gc-eyebrow">What we do</span>
            <span className="gc-small-label">
              Strategy → Design → Development
            </span>
          </div>
          <h1>
            The right expertise.
            <br />
            <span>For your next move.</span>
          </h1>
          <div className="gc-hero-bottom">
            <p className="gc-lead">
              From your first website to the software behind your business. We
              design and build digital experiences that are useful, considered
              and easy to grow.
            </p>
            <a className="gc-text-link" href="#services">
              Explore our services <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </section>
      <section id="services" className="gc-section">
        <div className="gc-container">
          <SectionHeading
            label="Our capabilities"
            title="Built around what you need."
            description="Choose a focused service or bring several disciplines together for one connected project."
          />
          <div className="gc-services-grid">
            {services.map((service, index) => {
              const Icon = icons[index];
              return (
                <Link
                  className="gc-service-card"
                  key={service.slug}
                  href={"/services/" + service.slug}
                >
                  <div className="gc-card-top">
                    <Icon size={26} strokeWidth={1.5} />
                    <span>{service.number}</span>
                  </div>
                  <span className="gc-service-category">
                    {service.category}
                  </span>
                  <h3>{service.shortTitle}</h3>
                  <p>{service.summary}</p>
                  <ul>
                    {service.deliverables.slice(0, 3).map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ul>
                  <span className="gc-card-link">
                    Explore service <ArrowUpRight size={18} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="gc-engagement gc-container">
        <div>
          <span className="gc-eyebrow">Flexible by design</span>
          <h2>
            A starting point
            <br />
            that suits your stage.
          </h2>
        </div>
        <div className="gc-engagement-options">
          <article>
            <span>01</span>
            <div>
              <h3>Launch something new</h3>
              <p>
                A defined project from the first brief to a tested release and
                handover.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Improve what you have</h3>
              <p>
                A focused review and a prioritized set of design, functionality
                or speed improvements.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Keep moving forward</h3>
              <p>
                Ongoing development or maintenance, with an agreed scope and
                review rhythm.
              </p>
            </div>
          </article>
        </div>
      </section>
      <Process />
      <ProjectCTA />
    </div>
  );
}
