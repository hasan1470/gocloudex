"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

export default function HeroMotion({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const artwork = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });
    if (artwork.current) observer.observe(artwork.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={artwork} className="gc-hero-art" data-paused={paused || !visible}>
      {children}
      <div className="gc-art-caption">
        <span>Ideas, taking shape.</span>
        <button
          type="button"
          className="gc-motion-toggle"
          aria-label={paused ? "Play hero animation" : "Pause hero animation"}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          <span>{paused ? "Play" : "Pause"}</span>
        </button>
      </div>
    </div>
  );
}
