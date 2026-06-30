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
    <footer className="bg-grand-blue text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-base font-semibold text-white">Grand Boats</p>
            <p className="mt-2 text-sm leading-6">
              Premium recreational boats,
              <br />
              built in Ukraine.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Ranges</p>
            <ul className="mt-3 space-y-2 text-sm">
              {rangeLinks.map(({ key, href }) => (
                <li key={href}><Link href={href} className="hover:text-white">{t(key)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              {companyLinks.map(({ key, href }) => (
                <li key={href}><Link href={href} className="hover:text-white">{t(key)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Dealer</p>
            <p className="mt-3 text-sm leading-6">
              Algarve Boat Group
              <br />
              Portimão, Portugal
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs">
          © {new Date().getFullYear()} Grand Boats / Algarve Boat Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
