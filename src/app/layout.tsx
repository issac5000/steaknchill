import type { Metadata } from "next";
import { Bebas_Neue, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { LanguageProvider } from "@/i18n";

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  icons: {
    icon: "/logopng.webp",
    apple: "/logopng.webp",
  },
  title: "Steak N' Chill | Steakhouse - Bruxelles",
  description:
    "Restaurant Steak N' Chill à Bruxelles. Steakhouse & grillades de viandes d'exceptions. Wagyu, Tomahawk, Entrecôtes et plus. Bd du Jardin Botanique 7, 1000 Bruxelles. Réservez maintenant.",
  keywords:
    "steak n chill, steaknchill, restaurant bruxelles, steakhouse, wagyu, tomahawk, grillades, halal, viande d'exception",
  openGraph: {
    title: "Steak N' Chill | Steakhouse Bruxelles",
    description:
      "Steakhouse halal au cœur de Bruxelles. Viandes d'exception, ambiance chaleureuse.",
    siteName: "Steak N' Chill",
    locale: "fr_BE",
    type: "website",
    url: "https://steaknchill.vercel.app",
    images: [
      {
        url: "https://steaknchill.vercel.app/og-image.jpg",
        width: 1160,
        height: 1436,
        alt: "Steak N' Chill - Steakhouse Bruxelles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steak N' Chill | Steakhouse Bruxelles",
    description:
      "Steakhouse halal au cœur de Bruxelles. Viandes d'exception, ambiance chaleureuse.",
    images: ["https://steaknchill.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${inter.variable} ${greatVibes.variable} antialiased grain-overlay`}
      >
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
