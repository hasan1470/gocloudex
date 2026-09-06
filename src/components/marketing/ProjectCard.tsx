import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectPreview } from "@/data/showcase";

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: ProjectPreview;
  priority?: boolean;
}) {
  return (
    <article className="gc-project">
      <Link
        className={`gc-project-visual gc-project-${project.slug}`}
        href={`/portfolio/${project.slug}`}
        aria-label={`View ${project.title} case study`}
      >
        <div className="gc-browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{project.title}</span>
        </div>
        <div className="gc-project-image">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 580px"
            priority={priority}
          />
        </div>
        <span className="gc-project-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="gc-project-meta">
        <span>{project.category}</span>
        <span>{project.kind}</span>
      </div>
      <h3>
        <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
      </h3>
      <p>{project.summary}</p>
      <div className="gc-tags">
        {project.stack.slice(0, 3).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}
