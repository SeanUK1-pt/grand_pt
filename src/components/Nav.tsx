import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import NavMobile from "./NavMobile";
import LanguageSwitcher from "./LanguageSwitcher";
import { navLinks } from "@/data/nav-links";

export default async function Nav() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo/grand-boats-logo.svg"
            alt="Grand Boats"
            width={392}
            height={74}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label={tc("mainNav")}>
            <ul className="flex items-center gap-6">
              {navLinks.map(({ key, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-body-sm font-medium text-ink-text-muted transition-colors hover:text-ink-text"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher dark />
        </div>

        {/* Mobile hamburger + drawer */}
        <NavMobile />
      </div>
    </header>
  );
}
