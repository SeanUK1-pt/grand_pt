type FooterLink = { label: string; href: string }

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Ranges",
    links: [
      { label: "Golden Line", href: "/en/ranges/golden-line" },
      { label: "Silver Line", href: "/en/ranges/silver-line" },
      { label: "Drive Line", href: "/en/ranges/drive-line" },
      { label: "Compare models", href: "#" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Craftsmanship", href: "#" },
      { label: "News", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Owners", href: "#" },
      { label: "Servicing", href: "#" },
      { label: "Parts", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
]

/**
 * Neutral, brand-level footer on --color-ink. No per-range accent applies.
 */
export function SiteFooter() {
  return (
    <footer className="w-full bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-brand-contrast">
                <span className="text-body font-bold tracking-tight">G</span>
              </span>
              <span className="text-body font-semibold tracking-tight text-ink-text">
                Grand Dealer
              </span>
            </div>
            <p className="mt-4 text-body-sm leading-relaxed text-ink-text-muted text-pretty">
              Your local Grand dealership — sales, servicing and ownership for
              the Golden, Silver and Drive ranges.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-text">
                  {col.title}
                </h3>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-body-sm text-ink-text-muted transition-colors hover:text-ink-text"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-ink-text-muted">
            © {new Date().getFullYear()} Grand Dealer. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <li key={item}>
                <a href="#" className="text-caption text-ink-text-muted transition-colors hover:text-ink-text">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
