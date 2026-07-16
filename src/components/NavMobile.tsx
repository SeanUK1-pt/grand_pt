"use client";

import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { navLinks } from "@/data/nav-links";

export default function NavMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span className={`block h-0.5 w-5 bg-ink-text transition-all duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-5 bg-ink-text transition-all duration-200 ${open ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-5 bg-ink-text transition-all duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Full-screen drawer — sibling of header, rendered in a portal-like fashion
          via absolute positioning off the header which is fixed z-50 */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full min-h-screen bg-ink px-6 py-8 md:hidden"
        >
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ key, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block py-3 text-title font-medium text-ink-text-muted transition-colors hover:text-ink-text"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
