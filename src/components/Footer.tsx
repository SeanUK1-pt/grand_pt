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
  const tf = await getTranslations("footer");

  return (
    <footer className="bg-ink text-ink-text-muted">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-body font-semibold text-ink-text">Grand Boats Portugal</p>
            <p className="mt-2 text-body-sm leading-relaxed">
              {tf("tagline")}
              <br />
              {tf("taglineLine2")}
            </p>
          </div>
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-text">{tf("rangesHeading")}</p>
            <ul className="mt-3 space-y-2 text-body-sm">
              {rangeLinks.map(({ key, href }) => (
                <li key={href}><Link href={href} className="hover:text-ink-text">{t(key)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-text">{tf("companyHeading")}</p>
            <ul className="mt-3 space-y-2 text-body-sm">
              {companyLinks.map(({ key, href }) => (
                <li key={href}><Link href={href} className="hover:text-ink-text">{t(key)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-text">{tf("dealerHeading")}</p>
            <p className="mt-3 text-body-sm leading-relaxed">
              Algarve Boat Group
              <br />
              {tf("dealerLocation")}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-ink-line pt-6 text-caption sm:flex-row sm:items-center sm:justify-between">
          <p>{tf("copyright", { year: new Date().getFullYear() })}</p>
          <p>
            {tf("groupHeading")}{" "}
            <a
              href="https://algarveboatsales.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink-text"
            >
              Algarve Boat Sales
            </a>
            {" · "}
            <a
              href="https://www.algarveboatrental.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink-text"
            >
              Algarve Boat Rental
            </a>
            {" · "}
            <a
              href="https://yamarin.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink-text"
            >
              Yamarin Portugal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
