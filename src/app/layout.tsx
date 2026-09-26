import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getThemeSettings } from "@/lib/theme";
import GoogleAnalytics from '@/components/GoogleAnalytics';

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

  // Inject theme colors and typography from WordPress plugin settings
  // (or defaults if WordPress is unreachable).
  const themeCss = `:root {
  --color-primary: ${theme.primaryColor};
  --color-accent: ${theme.accentColor};
  --color-bg: ${theme.bgColor};
  --color-ink: ${theme.inkColor};
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
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <head>
        <style id="theme-vars" dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
<body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
  <GoogleAnalytics />

  <Header />

  <main className="flex-grow">{children}</main>

  <Footer />

  {/* AdSense loader */}
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
