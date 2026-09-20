import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/*
 * Fonts are downloaded at build time and served from our own origin
 * (/_next/static/media/*.woff2) with a size-adjusted fallback font, so the
 * browser never contacts fonts.googleapis.com / fonts.gstatic.com.
 * Both families are variable fonts, so every weight the design used
 * (300-700) is covered by one file per style/subset.
 */
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-jakarta",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  title: "PatientsCure — Ayurvedic Health Information, Home Remedies & Classical Herbal Care",
  description:
    "Evidence-informed Ayurvedic health publication, comprehensive disease guides, authentic desi nuskhe home remedies, and medicinal herb encyclopedia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#242a24] antialiased">
        <Header />

        <main className="flex-grow">{children}</main>

        <Footer />

        {/*
          AdSense loader: kept site-wide (so Auto ads / verification keep working)
          but deferred until the browser is idle after `load` so it does not compete
          with FCP/LCP or add to Total Blocking Time. A stable `id` guarantees
          next/script injects it only once, even across client-side navigations.
          <AdSense> slots queue `adsbygoogle.push({})`, which the script drains
          when it arrives.
        */}
        {ADSENSE_CLIENT ? (
          <Script
            id="adsense-loader"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        ) : null}
      </body>
    </html>
  );
}
