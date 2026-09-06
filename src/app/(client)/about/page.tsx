import type { Metadata } from "next";
import { Cloud } from "lucide-react";
import { ProjectCTA, Process } from "@/components/marketing/Sections";
export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "GoCloudEx is an independent digital studio focused on useful websites and applications, thoughtful design and maintainable development.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <div className="gc-site">
      <section className="gc-page-hero">
        <div className="gc-container">
          <span className="gc-eyebrow">About GoCloudEx</span>
          <h1>
            A small studio.
            <br />
            <span>A considered approach.</span>
          </h1>
          <p className="gc-lead" style={{ maxWidth: 700 }}>
            We bring design and development together to make websites and
            digital products that are clear, useful and built around real needs.
          </p>
        </div>
      </section>
      <section className="gc-section">
        <div className="gc-container gc-about-grid">
          <div className="gc-about-panel">
            <Cloud size={62} strokeWidth={1.2} />
            <h3>
              Good work starts
              <br />
              with understanding.
            </h3>
            <p>
              Who will use it? What do they need to do? How will your team
              maintain it? These questions shape our work from the first
              conversation.
            </p>
          </div>
          <div className="gc-about-body">
            <span className="gc-eyebrow">The studio</span>
            <h2>
              Practical thinking.
              <br />
              Careful execution.
            </h2>
            <p>
              GoCloudEx works across business websites, e-commerce and custom
              applications. Our portfolio brings together client work,
              independent tools and working demonstrations of more complex
              workflows.
            </p>
            <p>
              We choose technology around the project. That might mean WordPress
              for familiar content editing, Shopify for a store, or React and
              Next.js for an application with a custom workflow.
            </p>
            <p>
              We value clear scope, reviewable progress and a useful handover.
              Our case studies explain the implementation and link to live
              experiences, with demonstration limits and starter credits made
              clear.
            </p>
            <div className="gc-tags">
              {[
                "Thoughtful design",
                "Useful functionality",
                "Clear communication",
                "Maintainable code",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Process />
      <ProjectCTA />
    </div>
  );
}
