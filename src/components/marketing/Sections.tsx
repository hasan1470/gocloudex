import Link from "@/components/marketing/NavigationLink";
import { ArrowUpRight, Check } from "lucide-react";
import { deliveryProcess } from "@/data/services";

export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="gc-section-heading">
      <div>
        <span className="gc-eyebrow">{label}</span>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
export function Process() {
  return (
    <section className="gc-section gc-process-section">
      <div className="gc-container">
        <SectionHeading
          label="How we work"
          title="A clear process. At every step."
          description="A shared plan, visible progress and a practical handover. You know what is being built and why."
        />
        <div className="gc-process">
          {deliveryProcess.map((step, index) => (
            <article key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ProjectCTA() {
  return (
    <section className="gc-cta">
      <div className="gc-container gc-cta-inner">
        <div>
          <span className="gc-eyebrow">Your next chapter</span>
          <h2>
            Have something
            <br />
            worth building?
          </h2>
          <p>Bring your idea, your current website or a problem to solve.</p>
        </div>
        <Link className="gc-button gc-button-white" href="/contact">
          Let’s talk about it <ArrowUpRight size={20} />
        </Link>
      </div>
    </section>
  );
}
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="gc-checklist">
      {items.map((item) => (
        <li key={item}>
          <Check size={18} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
