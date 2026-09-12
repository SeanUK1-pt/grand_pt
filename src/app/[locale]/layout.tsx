import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Grand Boats Portugal — RHIBs & RIB Boats, Nationwide Delivery",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Grand Boats Portugal — RHIBs and rigid inflatable boats (RIBs) from the Golden, Silver and Drive Line ranges. Hand-laid hulls, delivered anywhere in Portugal by Algarve Boat Group.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 2160, height: 945 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

// Sitewide Organization/AutoDealer structured data — page-specific data
// (Product per model, BreadcrumbList, etc.) layers on top of this per-page,
// it doesn't replace it. Keyword/areaServed breadth here is deliberate:
// this business wants to surface for RHIB/RIB searches from anywhere in
// Portugal, not just Algarve-local queries, even though the physical base
// is in Lagos.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Algarve Boat Group",
  alternateName: "Grand Boats Portugal",
  description:
    "Authorised Grand Boats dealer for Portugal, selling and delivering RHIBs and rigid inflatable boats (RIBs) from the Golden Line, Silver Line and Drive Line ranges nationwide.",
  slogan: "RHIBs and RIB boats, delivered anywhere in Portugal.",
  knowsAbout: [
    "RHIB",
    "RIB",
    "rigid inflatable boats",
    "barcos insufláveis rígidos",
    "embarcações semirrígidas",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/grand-logo.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Marina de Lagos, Loja 11",
    addressLocality: "Lagos",
    postalCode: "8600-780",
    addressCountry: "PT",
  },
  telephone: "+351282045109",
  email: "miguel@algarveboatgroup.com",
  areaServed: [
    { "@type": "Country", name: "Portugal" },
    "Algarve",
    "Lisboa",
    "Porto",
    "Cascais",
    "Vilamoura",
    "Setúbal",
    "Faro",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Brand",
      name: "Grand",
    },
  },
  sameAs: ["https://www.algarveboatsales.com"],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale's subtree — without this,
  // Next.js treats the route as dynamic because the locale is only known
  // at request time.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NextIntlClientProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
