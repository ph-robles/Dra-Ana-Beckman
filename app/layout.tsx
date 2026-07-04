import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { ScrollProgressBar } from "@/components/shared/scroll-progress-bar";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { FloatingActions } from "@/components/shared/floating-actions";
import { SITE, LOCATIONS } from "@/lib/constants";
import "./globals.css";
import Script from "next/script";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "harmonização orofacial",
    "harmonização facial",
    "enfermeira esteta",
    "botox",
    "preenchimento labial",
    "Piracicaba",
    "Ilha do Governador",
    "Rio de Janeiro",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf6f1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}/images/og-cover.jpg`,
  medicalSpecialty: "Harmonização Orofacial (HOF)",
  sameAs: [SITE.instagram],
  address: LOCATIONS.map((loc) => ({
    "@type": "PostalAddress",
    addressLocality: loc.city,
    addressRegion: loc.state,
    addressCountry: "BR",
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <LoadingScreen />
        <CustomCursor />
        <ScrollProgressBar />

        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>

        <FloatingActions />

        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#fbf6f1",
              border: "1px solid #d2a98f",
              color: "#372420",
            },
          }}
        />
      </body>
    </html>
  );
}
