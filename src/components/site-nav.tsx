const navLinks = [
  { label: "Ranges", href: "/en/ranges/golden-line" },
  { label: "Our Story", href: "#" },
  { label: "Owners", href: "#" },
  { label: "Dealers", href: "#" },
  { label: "Contact", href: "#" },
]

/**
 * Neutral, brand-level top navigation. No per-range accent applies here —
 * this is the shared dealership chrome.
 */
export function SiteNav() {
  return (
    <header className="w-full border-b border-surface-line bg-surface">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        {/* Logo placeholder */}
        <a href="/" className="flex items-center gap-2" aria-label="Grand dealer home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-brand-contrast">
            <span className="text-body font-bold tracking-tight">G</span>
          </span>
          <span className="text-body font-semibold tracking-tight text-text-strong">
            Grand <span className="text-text-muted">Dealer</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-body-sm font-medium text-text-muted transition-colors hover:text-text-strong"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="rounded-md bg-brand px-4 py-2 text-body-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Book a viewing
        </a>
      </nav>
    </header>
  )
}
