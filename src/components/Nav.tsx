import Link from "next/link";
import NavMobile from "./NavMobile";

const links = [
  { label: "Golden Line", href: "/ranges/golden-line/" },
  { label: "Silver Line", href: "/ranges/silver-line/" },
  { label: "Drive Line", href: "/ranges/drive-line/" },
  { label: "Our Story", href: "/our-story/" },
  { label: "Contact", href: "/contact/" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-grand-blue/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Grand Boats
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger + drawer */}
        <NavMobile />
      </div>
    </header>
  );
}
