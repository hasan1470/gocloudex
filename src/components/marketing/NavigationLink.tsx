"use client";

import Link, { useLinkStatus } from "next/link";
import { createPortal } from "react-dom";
import type { ComponentProps } from "react";

function PendingNavigation() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return createPortal(
    <div className="gc-route-progress" role="status">
      <span className="sr-only">Loading page…</span>
    </div>,
    document.body,
  );
}

export default function NavigationLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...props}>
      {children}
      <PendingNavigation />
    </Link>
  );
}
