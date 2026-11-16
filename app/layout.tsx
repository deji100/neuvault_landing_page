import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import ThemeModeToggle from "@/components/general/ThemeModeToggle";
import ReferralTracker from "@/components/general/ReferralTracker";
import ExtensionFab from "@/components/general/ExtensionFab";
import MarketingEvents from "@/components/general/MarketingEvents";
import GoogleAnalytics from "@/components/general/GoogleAnalytics";
import JsonLd from "@/components/seo/JsonLd";
import { guidePages } from "@/lib/guides";
import { comparisonPages } from "@/lib/comparisons";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  solutionPages,
} from "@/lib/seo";

// Send only known public routes to the client, never the full content catalogs.
const publicAnalyticsPaths = [
  ...guidePages.map((page) => `/guides/${page.slug}`),
  ...comparisonPages.map((page) => `/compare/${page.slug}`),
  ...solutionPages.map((page) => `/${page.slug}`),
];

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
});

const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = localFont({
  src: "./fonts/instrument-sans-latin.woff2",
  weight: "400 700",
  variable: "--font-instrument",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "NeuVault Technologies Limited" }],
  creator: "NeuVault Technologies Limited",
  publisher: "NeuVault Technologies Limited",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "NeuVault local-first notes, files, and Planner",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Site-wide entities only. Pages add their own (SoftwareApplication on the home
  // and solution pages, Article on guides) so no entity is emitted twice on one page.
  const jsonLd = [buildOrganizationJsonLd(), buildWebSiteJsonLd()];

  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        {/* Dark is the default; only a visitor's own choice of light (from the switch) overrides it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('neuvault-theme');var mode=saved==='light'?'light':'dark';document.documentElement.dataset.theme=mode;document.documentElement.style.colorScheme=mode;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${bricolage.variable} ${instrument.variable} antialiased`}>
        <JsonLd data={jsonLd} />
        <Navbar />
        {children}
        <Footer />
        <ThemeModeToggle />
        <ReferralTracker />
        <MarketingEvents />
        <GoogleAnalytics publicPaths={publicAnalyticsPaths} />
        <ExtensionFab />
      </body>
    </html>
  );
}
