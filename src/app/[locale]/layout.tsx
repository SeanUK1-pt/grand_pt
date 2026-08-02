import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://grandboats.pt";
const DEFAULT_OG_IMAGE = "/images/boats/g750/detail-11.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Grand Boats Portugal",
  description:
    "Grand Boats Portugal — authorised dealer for the Golden Line, Silver Line and Drive Line ranges. Represented by Algarve Boat Group.",
  openGraph: {
    siteName: "Grand Boats Portugal",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 2160, height: 945 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

// Sitewide Organization/AutoDealer structured data — page-specific data
// (Product per model, etc.) layers on top of this per-page, it doesn't
// replace it.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Algarve Boat Group",
  alternateName: "Grand Boats Portugal",
  description:
    "Authorised Grand Boats dealer for Portugal — Golden Line, Silver Line and Drive Line RIBs.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Marina de Lagos, Loja 11",
    addressLocality: "Lagos",
    postalCode: "8600-780",
    addressCountry: "PT",
  },
  telephone: "+351282045109",
  email: "miguel@algarveboatgroup.com",
  areaServed: "PT",
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
