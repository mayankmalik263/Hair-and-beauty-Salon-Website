import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxe Salon | Premium Hair & Beauty Studio",
  description: "Premium unisex salon in New York. We specialize in keratin, botox, bridal salon services, hair spa, and more.",
  keywords: ["Luxe Salon", "New York", "keratin", "botox", "bridal salon", "unisex salon"],
  openGraph: {
    title: "Luxe Salon | Premium Hair & Beauty Studio",
    description: "Premium unisex salon in New York. Book your appointment for keratin, botox, and bridal services today.",
    url: "https://luxesalontemplate.com",
    siteName: "Luxe Salon",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Luxe Salon",
  "image": "https://luxesalontemplate.com/salon-ads/keratin-offer.jpeg",
  "@id": "",
  "url": "https://luxesalontemplate.com",
  "telephone": "+15551234567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Fashion Street, Suite 100",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "postalCode": "10001",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:00",
    "closes": "21:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-gold-500/30">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#18181b', // zinc-900
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </body>
    </html>
  );
}
