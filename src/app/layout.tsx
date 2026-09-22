import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getThemeSettings, googleFontsHref, usesCustomFonts } from "@/lib/theme";

/*
 * These two are still self-hosted at build time (downloaded once, served
 * from our own origin) and remain the DEFAULT look — zero third-party font
 * requests for every visitor unless an editor picks different fonts in the
 * WordPress dashboard. When they do, RootLayout below pulls the chosen
 * families from Google Fonts at runtime instead (see usesCustomFonts()).
 */
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-jakarta",
});

const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  title: "PatientsCure — Ayurvedic Health Information, Home Remedies & Classical Herbal Care",
  description:
    "Evidence-informed Ayurvedic health publication, comprehensive disease guides, authentic desi nuskhe home remedies, and medicinal herb encyclopedia.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getThemeSettings();
  const customFonts = usesCustomFonts(theme);

  // Sanitized/range-clamped in getThemeSettings() (hex-only, letters-numbers
  // -spaces-only font names, numbers clamped to sane min/max), so this is
  // safe to inline directly.
  const themeCss = `:root {
  --color-primary: ${theme.primaryColor};
  --color-accent: ${theme.accentColor};
  --color-bg: ${theme.bgColor};
  --color-ink: ${theme.inkColor};
  --font-sans: ${customFonts ? `'${theme.bodyFont}', ` : "var(--font-jakarta), "}system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --font-serif: ${customFonts ? `'${theme.headingFont}', ` : "var(--font-playfair), "}Georgia, Cambria, 'Times New Roman', Times, serif;
  --content-body-size: ${theme.contentBodySize}px;
  --content-body-lh: ${theme.contentBodyLineHeight};
  --content-h1-size: ${theme.contentH1Size}px;
  --content-h1-lh: ${theme.contentH1LineHeight};
  --content-h2-size: ${theme.contentH2Size}px;
  --content-h2-lh: ${theme.contentH2LineHeight};
  --content-h3-size: ${theme.contentH3Size}px;
  --content-h3-lh: ${theme.contentH3LineHeight};
}`;

  return (
    // Root font-size drives Tailwind's rem-based type scale, so this one
    // number scales body text, headings, and every CPT detail page
    // (disease/remedy/ingredient/article) proportionally, site-wide.
    <html
      lang="en"
      className={fontSans.variable}
      style={{ fontSize: `${theme.baseTextScale}%` }}
    >
      <head>
        {customFonts ? (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={googleFontsHref(theme)} />
          </>
        ) : null}
        {/* Brand colors/fonts from the WordPress "Theme Settings" plugin. */}
        <style id="theme-vars" dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
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
