"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4 text-sm font-medium">
      <Link
        href="/"
        className={cn({
          "font-bold": pathname === "/",
        })}
      >
        Examples
      </Link>
      <Link
        href="/installation"
        className={cn({
          "font-bold": pathname === "/installation",
        })}
      >
        Installation
      </Link>
    </nav>
  );
}
