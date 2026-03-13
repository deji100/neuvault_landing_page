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
const TITLE = "NeuVault | Private Document Vault for IDs, Receipts, Medical Records, and Reminders";
const DESCRIPTION =
  "NeuVault is a private, local-first mobile vault for the documents people actually need later: passports, receipts, visas, warranties, medical records, notes, and voice. Capture them fast, find them quickly, and get reminders before they matter.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | NeuVault",
  },
  description: DESCRIPTION,
  applicationName: "NeuVault",
  authors: [{ name: "NeuVault" }],
  creator: "NeuVault",
  publisher: "NeuVault",
  keywords: [
    "private document vault",
    "important documents app",
    "passport organizer app",
    "receipt organizer app",
    "visa document organizer",
    "medical record organizer",
    "document reminder app",
    "document expiration reminders",
    "local-first document organizer",
    "offline document organizer",
    "secure document storage",
    "encrypted document backup",
    "voice notes to text",
    "scan and organize documents",
    "family document vault",
  ],
  alternates: {
    canonical: "/",
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
        alt: "NeuVault private document vault preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
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
