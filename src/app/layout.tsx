import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CookieConsent } from "@/components/CookieConsent";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dela-bags.vercel.app';
const shareImage = 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&h=630&auto=format&fit=crop';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DELA BAGS | Handcrafted Luxury Handbags & Accessories",
    template: "%s | DELA BAGS",
  },
  description: "Discover handcrafted luxury handbags, premium sling bags, tote bags, and men's leather accessories designed for elegance and durability.",
  keywords: ["DELA BAGS", "handbags India", "ladies handbags", "sling bags", "tote bags", "leather laptop bags", "vegan leather bags"],
  authors: [{ name: "DELA BAGS Atelier" }],
  creator: "DELA BAGS",
  publisher: "DELA BAGS",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "DELA BAGS | Handcrafted Luxury Handbags & Accessories",
    description: "Discover handcrafted luxury handbags, premium sling bags, tote bags, and men's leather accessories designed for elegance and durability.",
    siteName: "DELA BAGS",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "DELA BAGS Luxury Handbag Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DELA BAGS | Handcrafted Luxury Handbags & Accessories",
    description: "Discover handcrafted luxury handbags, premium sling bags, tote bags, and men's leather accessories.",
    images: [shareImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <GoogleAnalytics />
        <Providers>
          {children}
        </Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
