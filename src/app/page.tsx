"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin, Phone, Star, Sparkles, MessageCircle, Scissors, Droplet, Wand2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

const faqData = [
  { q: "Where are you located?", a: "Near Double Park, Model Town, Rohtak, Haryana 124001." },
  { q: "What are your timings?", a: "We are open daily from 9:00 am to 9:00 pm." },
  { q: "Is this a unisex salon?", a: "Yes. We offer services for men, women and kids." },
  { q: "How do I book an appointment?", a: "Choose your services on our website and tap \"Book on WhatsApp\". Kapil confirms your appointment personally on WhatsApp." },
  { q: "Do I have to pay in advance?", a: "No. There is no advance or booking fee. You pay only after your service." },
  { q: "Do you offer hair colour and bridal makeup?", a: "Yes. These need a short consultation first, so the final price is confirmed on WhatsApp based on your hair and requirements." },
  { q: "What treatments do you offer?", a: "Keratin smoothing, Botox protein treatment, Nanoplastiya repair, hair spa, facials, waxing, threading, manicure, pedicure, and bridal and pre-bridal packages." },
  { q: "Can I message you in Hindi?", a: "Yes, message however you are comfortable. Kapil replies personally." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 z-10" />
          {/* {/* TODO: swap for real salon photo */}
          <div className="h-full w-full bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-50" />
        </div>
        
        <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-400 mb-6">
              Premium Unisex Salon
            </span>
            <h1 className="font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Style That Speaks, <br className="hidden sm:block" />
              <span className="text-gold-500">Beauty That Stays.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl">
              Premium Hair, Skin, and Beauty Services for Men, Women & Kids in Model Town, Rohtak.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/book" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/918222830906"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
              </a>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-black/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-gold-400">
                <CheckCircle2 className="h-4 w-4" /> No advance payment. Pay only after your service.
              </span>
              <p className="text-sm text-zinc-400 mt-2">
                Pick your services and book in 30 seconds.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-white/10 bg-black py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-400 md:text-base">
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-gold-500" /> Premium Products</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-gold-500" /> Hygienic & Safe</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-gold-500" /> Expert Professionals</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-gold-500" /> Luxury Experience</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-gold-500" /> 100% Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Offers Strip */}
      <section className="bg-gold-500 py-12 text-black">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">Limited Time Special Offers!</h2>
          <p className="text-lg font-medium mb-6">Free eyebrows + upper lip for first 20 ladies • Free hand & shoulder massage • Premium tea/coffee on arrival</p>
          <Link href="/book" className="inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
            Claim Your Offer
          </Link>
        </div>
      </section>

      {/* Signature Treatments */}
      <Section className="bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">Signature Hair Treatments</h2>
            <p className="mt-4 text-zinc-400">Transform your look with our premium smoothing and repair services.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black p-8 transition-colors hover:border-gold-500/50">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500">
                <Scissors className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-serif text-2xl font-bold">Keratin Smoothing</h3>
              <p className="text-2xl font-semibold text-gold-400 mb-6">₹1,999</p>
              <ul className="mb-8 space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Straight, smooth & stunning</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Advanced frizz control</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Long-lasting damage protection</li>
              </ul>
              <Link href="/book?service=Keratin+Smoothing" className={buttonVariants({ variant: "outline", className: "w-full" })}>Book Session</Link>
            </div>

            {/* Treatment 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-gold-500/30 bg-black p-8 transition-colors hover:border-gold-500/50">
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-gold-500 to-gold-600 px-4 py-1.5 text-[0.65rem] uppercase tracking-wider font-bold text-black rounded-bl-xl shadow-lg">POPULAR</div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500">
                <Droplet className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-serif text-2xl font-bold">Botox Protein</h3>
              <div className="mb-6">
                <p className="text-2xl font-semibold text-gold-400">₹1,999 <span className="text-sm font-normal text-zinc-400">shoulder</span></p>
                <p className="text-2xl font-semibold text-gold-400">₹2,699 <span className="text-sm font-normal text-zinc-400">any length</span></p>
              </div>
              <ul className="mb-8 space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Smoother, stronger, shinier hair</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Complete frizz elimination</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Deep protein nourishment</li>
              </ul>
              <Link href="/book?service=Botox+Protein+Treatment" className={buttonVariants({ variant: "primary", className: "w-full" })}>Book Session</Link>
            </div>

            {/* Treatment 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black p-8 transition-colors hover:border-gold-500/50">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500">
                <Wand2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-serif text-2xl font-bold">Nanoplastiya</h3>
              <div className="mb-6">
                <p className="text-2xl font-semibold text-gold-400">₹1,999 <span className="text-sm font-normal text-zinc-400">shoulder</span></p>
                <p className="text-2xl font-semibold text-gold-400">₹2,699 <span className="text-sm font-normal text-zinc-400">any length</span></p>
              </div>
              <ul className="mb-8 space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Intense damage repair</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Strengthens hair from within</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> Adds brilliant, lasting shine</li>
              </ul>
              <Link href="/book?service=Nanoplastiya" className={buttonVariants({ variant: "outline", className: "w-full" })}>Book Session</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Ladies Combos */}
      <Section className="bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">Ladies Exclusive Combos</h2>
            <p className="mt-4 text-zinc-400">Perfectly curated packages for your regular grooming needs.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Quick Refresh", price: "999", items: ["Hair Spa", "Hair Cut", "Eyebrows", "Upper Lip"] },
              { name: "Glow Care", price: "1,499", items: ["O3+/Fruit Cleanup", "Hair Spa", "Hair Cut", "Eyebrows & Upper Lip"] },
              { name: "Beauty Boost", price: "1,999", items: ["O3+ Professional Facial", "Hair Spa", "Hair Cut", "Manicure", "Eyebrows & Upper Lip"] },
              { name: "Complete Makeover", price: "2,499", items: ["O3+ Professional Facial", "Hair Spa", "Hair Cut", "Manicure", "Pedicure", "Eyebrows & Upper Lip"] },
            ].map((combo, i) => (
              <div key={i} className="flex flex-col rounded-xl border border-white/10 bg-zinc-950 p-6">
                <h3 className="font-serif text-xl font-bold text-gold-400">{combo.name}</h3>
                <p className="mt-2 text-2xl font-bold">₹{combo.price}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {combo.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/70" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={`/book?service=Combo-${combo.name.replace(/\s+/g, '')}`} className={buttonVariants({ variant: "outline", size: "sm", className: "mt-8" })}>
                  Select Combo
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pre-Bridal */}
      <Section className="bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">Pre-Bridal Packages</h2>
            <p className="mt-4 text-zinc-400">Prepare for your special day with our luxurious bridal treatments.</p>
          </div>
          
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {/* Silver */}
            <div className="rounded-2xl border border-white/10 bg-black p-8">
              <h3 className="text-center font-serif text-xl font-bold text-zinc-300">Silver</h3>
              <p className="mt-4 text-center text-4xl font-bold">₹3,999</p>
              <ul className="mt-8 space-y-4 text-sm text-zinc-400">
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 2 Facial (Clean-up/Fruit/D-Tan)</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 1 Manicure & 1 Pedicure</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 1 Hair Spa</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> Full Face Threading & Upper Lip</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> Full Arms & Underarms Waxing</li>
              </ul>
            </div>
            
            {/* Gold */}
            <div className="relative rounded-2xl border-2 border-gold-500 bg-black p-8 shadow-2xl shadow-gold-500/10 scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-1.5 text-xs tracking-wider font-bold text-black shadow-lg">MOST POPULAR</div>
              <h3 className="text-center font-serif text-xl font-bold text-gold-400">Gold</h3>
              <p className="mt-4 text-center text-4xl font-bold">₹5,999</p>
              <ul className="mt-8 space-y-4 text-sm text-zinc-300">
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 2 Premium Facial (Hydra/D-Tan/Fruit)</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 1 Premium Manicure & Pedicure</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 1 Deep Conditioning Hair Spa</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> Full Body Waxing</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> Body Polishing & D-Tan</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> Threading & Upper Lip</li>
              </ul>
            </div>
            
            {/* Platinum */}
            <div className="rounded-2xl border border-white/10 bg-black p-8">
              <h3 className="text-center font-serif text-xl font-bold text-zinc-100">Platinum</h3>
              <p className="mt-4 text-center text-4xl font-bold">₹7,999</p>
              <ul className="mt-8 space-y-4 text-sm text-zinc-400">
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 3 Luxury Facial (O3+/Hydra/Gold)</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 2 Luxury Manicure & Pedicure</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> 1 Luxury Hair Spa</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> Full Body Waxing & Body Polishing</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> D-Tan & Fruit Bleach</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold-500" /> Eyebrow Shaping & Upper Lip</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Reviews CTA */}
      <Section className="bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8 sm:p-12">
              <h2 className="mb-4 font-serif text-3xl font-bold text-white">Loved your visit?</h2>
              <p className="mb-8 text-lg text-zinc-400">Your review helps us grow. Leave us a review on Google.</p>
              <a 
                href="#" 
                className={buttonVariants({ variant: "primary", size: "lg" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="mr-2 h-5 w-5 fill-current text-black" />
                {/* TODO: real Google review link once the Google Business Profile is set up */}
                Leave a Google Review
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-zinc-950 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-6">
            {faqData.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black p-6">
                <h3 className="font-bold text-gold-400 mb-2">{faq.q}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Location */}
      <section className="bg-zinc-950">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24">
            <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">Visit Us Today</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-gold-500/10 p-3 text-gold-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p className="mt-1 text-zinc-400">Near Double Park, Model Town,<br />Rohtak, Haryana 124001<br />(H.No 190 L, Balaji Wali Gali)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-gold-500/10 p-3 text-gold-500">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Contact</h3>
                  <p className="mt-1 text-zinc-400">Phone & WhatsApp: <br />8222830906</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/book" className={buttonVariants({ variant: "primary" })}>Book Now</Link>
              <a href="tel:8222830906" className={buttonVariants({ variant: "outline" })}>Call Us</a>
            </div>
          </div>
          
          <div className="relative min-h-[400px] w-full md:min-h-full bg-zinc-900 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
            </div>
            {/* Embedded map pointing to Model Town, Rohtak */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13962.000305891393!2d76.5898867512135!3d28.898305716912384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85aebba71457%3A0xc3f5a2eec6d2cf9!2sModel%20Town%2C%20Rohtak%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="absolute inset-0 h-full w-full border-0 map-dark-filter z-10" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Salon Location Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
