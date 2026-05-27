// components/layout/BreadcrumbTrail.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

export function BreadcrumbTrail() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { href, label };
  });

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
      <Link href="/" className="hover:text-[#D4A017] transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {breadcrumbs.map((crumb, idx) => (
        <Fragment key={crumb.href}>
          <ChevronRight className="w-4 h-4" />
          {idx === breadcrumbs.length - 1 ? (
            <span className="text-[#0D1B2A] font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-[#D4A017] transition-colors">
              {crumb.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}