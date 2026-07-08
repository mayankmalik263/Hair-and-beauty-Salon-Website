"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  {
    src: "/ads/WhatsApp Image 2026-07-08 at 11.26.44 PM.jpeg",
    alt: "Keratin Treatment Offer",
    title: "Keratin Treatment",
  },
  {
    src: "/ads/WhatsApp Image 2026-07-08 at 11.26.44 PM (2).jpeg",
    alt: "Botox Protein Offer",
    title: "Botox Protein",
  },
  {
    src: "/ads/WhatsApp Image 2026-07-08 at 11.26.45 PM.jpeg",
    alt: "Nanoplastiya Offer",
    title: "Nanoplastiya",
  },
  {
    src: "/ads/1447733b-47fd-4e41-8236-53d046dbd220.jpg",
    alt: "Ladies Combo Offers",
    title: "Exclusive Combos",
  },
  {
    src: "/ads/6c7d8406-b98a-433d-9960-c4922f66cc1a.jpg",
    alt: "Pre-Bridal Packages",
    title: "Pre-Bridal Packages",
  },
  {
    src: "/ads/c4fcffbd-3888-4bab-baca-f7c47f06030f.jpg",
    alt: "Special Offers",
    title: "Special Offers",
  },
];

const stockPlaceholders = [
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
    alt: "Luxury Salon Interior",
    title: "Our Salon Ambience",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
    alt: "Hair Styling Service",
    title: "Expert Styling",
  },
  {
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
    alt: "Premium Hair Care Products",
    title: "Premium Products",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative bg-zinc-950 py-12 md:py-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl text-gold-500">
            Our Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            A glimpse into the luxury experience at Hair & Beauty Unisex Salon.
          </p>
        </div>
      </section>

      {/* Offers & Services Showcase */}
      <Section className="bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">Featured Services & Offers</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, i) => (
              <button 
                key={i} 
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 text-left"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i < 2}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-serif text-xl font-bold text-gold-400">{img.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Salon Interior (Placeholders) */}
      <Section className="bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold">Salon Experience</h2>
            <p className="mt-2 text-zinc-400 text-sm">
              {/* {/* TODO: swap for real salon interior photos */}
              (Images shown are for representation. Real photos coming soon.)
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stockPlaceholders.map((img, i) => (
              <button 
                key={i} 
                className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 text-left"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i < 2}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-serif text-lg font-bold text-white">{img.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute right-4 top-4 z-[110] rounded-full bg-black/50 p-2 text-white hover:bg-gold-500 hover:text-black transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative h-[80vh] w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
