"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        // Text is visible by default, including before hydration and without JS.
        const animation = entry.target.animate(
          [{ opacity: 0.35, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 550, easing: "cubic-bezier(.2,.7,.2,1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.2 });
    document.querySelectorAll("#main-content .gc-site h2").forEach((heading) => observer.observe(heading));
    const stop = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    preference.addEventListener("change", stop);
    return () => {
      stop();
      preference.removeEventListener("change", stop);
    };
  }, [pathname]);

  return <div key={pathname} className="gc-arrival-line" aria-hidden="true" />;
}
