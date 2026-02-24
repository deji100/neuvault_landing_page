import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const SITE_URL = "https://neuvault.app";

const OG_IMAGE = "https://res.cloudinary.com/dos5wwgty/image/upload/v1771893076/android-chrome-512x512_togvtu.png";

const TITLE = "NeuVault – A Private, Local-First Vault for Your Documents";
const DESCRIPTION =
  "Organize personal documents securely on your device. NeuVault turns scattered files, notes, and voice into a calm, searchable vault — with privacy by default and encrypted backups you control.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: "%s – NeuVault",
  },

  description: DESCRIPTION,

  applicationName: "NeuVault",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "NeuVault" }],
  creator: "NeuVault",
  publisher: "NeuVault",

  keywords: [
    "document vault",
    "document organizer",
    "personal document management",
    "secure document storage",
    "local-first documents",
    "private file organizer",
    "offline document storage",
    "scan documents",
    "voice notes to text",
    "encrypted backup",
    "file management app",
  ],

  // Helps Google show the right canonical URL
  alternates: {
    canonical: "/",
  },

  // Basic robots. (If you have staging, override there to noindex.)
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

  // OpenGraph for social sharing (FB, LinkedIn, etc.)
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "NeuVault",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "NeuVault",
      },
    ],
    locale: "en_US",
  },

  // Twitter cards
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
    // Optional: add your handle later
    // site: "@neuvault",
    // creator: "@neuvault",
  },

  // Nice-to-have: PWA + platform hints
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}