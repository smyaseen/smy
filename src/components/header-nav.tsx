"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navs = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function HeaderNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="flex items-center gap-6 sm:gap-8">
      <Link href="/" className="text-[15px] font-bold tracking-tight">
        SMY
      </Link>
      <nav className="flex items-center gap-1">
        {navs.map((nav) => (
          <Link
            key={nav.href}
            href={nav.href}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
              isActive(nav.href) && "bg-secondary font-medium text-foreground",
            )}
          >
            {nav.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
