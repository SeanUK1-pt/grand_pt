import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { navLinks } from "@/data/nav-links";

// First 3 entries are the range links, last 2 are company links — same
// grouping as before, now derived from the shared navLinks list instead of
// a separate hardcoded array.
const rangeLinks = navLinks.slice(0, 3);
const companyLinks = navLinks.slice(3);

export default async function Footer() {
  const t = await getTranslations("nav");

  return (
    <footer className="bg-ink text-ink-text-muted">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-body font-semibold text-ink-text">Grand Boats Portugal</p>
            <p className="mt-2 text-body-sm leading-relaxed">
              Premium recreational boats,
              <br />
              built in Ukraine.
            </p>
          </div>
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-text">Ranges</p>
            <ul className="mt-3 space-y-2 text-body-sm">
              {rangeLinks.map(({ key, href }) => (
                <li key={href}><Link href={href} className="hover:text-ink-text">{t(key)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-text">Company</p>
            <ul className="mt-3 space-y-2 text-body-sm">
              {companyLinks.map(({ key, href }) => (
                <li key={href}><Link href={href} className="hover:text-ink-text">{t(key)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-text">Dealer</p>
            <p className="mt-3 text-body-sm leading-relaxed">
              Algarve Boat Group
              <br />
              Portimão, Portugal
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-ink-line pt-6 text-caption">
          © {new Date().getFullYear()} Grand Boats Portugal. Represented by Algarve Boat Group.
        </div>
      </div>
    </footer>
  );
}
