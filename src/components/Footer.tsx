import Link from "next/link";

export default function Footer() {
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
              <li><Link href="/ranges/golden-line/" className="hover:text-white">Golden Line</Link></li>
              <li><Link href="/ranges/silver-line/" className="hover:text-white">Silver Line</Link></li>
              <li><Link href="/ranges/drive-line/" className="hover:text-white">Drive Line</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/our-story/" className="hover:text-white">Our Story</Link></li>
              <li><Link href="/contact/" className="hover:text-white">Contact</Link></li>
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
