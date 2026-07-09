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
  title: "Hair & Beauty Unisex Salon in Model Town, Rohtak",
  description: "Premium unisex salon near Double Park Rohtak. We specialize in keratin, botox, bridal salon services, hair spa, and more in Rohtak.",
  keywords: ["Hair & Beauty Unisex Salon in Model Town", "Rohtak", "keratin", "botox", "bridal salon in Rohtak", "unisex salon near Double Park Rohtak"],
  openGraph: {
    title: "Hair & Beauty Unisex Salon | Model Town, Rohtak",
    description: "Premium unisex salon near Double Park Rohtak. Book your appointment for keratin, botox, and bridal services today.",
    url: "https://hairandbeautysalon.com",
    siteName: "Hair & Beauty Unisex Salon",
    locale: "en_IN",
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
  "name": "Hair & Beauty Unisex Salon",
  "image": "https://hairandbeautysalon.com/salon-ads/keratin-offer.jpeg",
  "@id": "",
  "url": "https://hairandbeautysalon.com",
  "telephone": "+918222830906",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Near Double Park, H.No 190 L, Balaji Wali Gali",
    "addressLocality": "Model Town, Rohtak",
    "addressRegion": "Haryana",
    "postalCode": "124001",
    "addressCountry": "IN"
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
