import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative bg-zinc-950 py-12 md:py-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl text-gold-500">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            We're here to help you look your best. Reach out to book an appointment or ask about our services.
          </p>
        </div>
      </section>

      <Section className="bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Contact Details */}
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-zinc-400 leading-relaxed">
                  Have questions about our signature treatments or bridal packages? 
                  Our team of expert professionals is ready to assist you. 
                  Call or WhatsApp us for the fastest response.
                </p>
              </div>

              <div className="space-y-8">
                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Phone & WhatsApp</h3>
                    <p className="text-zinc-400 mb-4">Available during business hours</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="tel:+15551234567" className="transition-colors hover:text-gold-400">
                        +1 (555) 123-4567
                      </a>
                      <a
                        href="https://wa.me/15551234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
                      >
                        <MessageCircle className="mr-2 w-4 h-4" /> Message
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                    <p className="text-zinc-400 leading-relaxed max-w-sm">
                      123 Fashion Street, Suite 100<br />
                      Style District, New York, NY 10001
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Business Hours</h3>
                    <ul className="text-zinc-400 space-y-1">
                      <li className="flex justify-between min-w-[200px]">
                        <span>Monday - Sunday</span>
                        <span>9:00 am - 9:00 pm</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[300px] md:h-[400px] lg:h-auto lg:min-h-[500px] overflow-hidden rounded-2xl border border-white/10 relative bg-zinc-900 group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
              </div>
              <iframe 
                src="https://maps.google.com/maps?q=Hair%20Salon%20New%20York&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="absolute inset-0 h-full w-full border-0 map-dark-filter z-10" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon Location Map"
              />
              {/* Clickable overlay to open exact Google Maps link */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Hair+Salon+New+York"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 flex items-center justify-center bg-transparent transition-colors hover:bg-black/20 group"
                aria-label="Open in Google Maps"
              >
                <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-xl bg-black/90 backdrop-blur-md border border-white/10 px-5 py-3 text-sm font-bold text-white shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-gold-500/50 group-hover:text-gold-400">
                  <MapPin className="h-5 w-5" />
                  Get Directions
                </div>
              </a>
            </div>

          </div>
        </div>
      </Section>
    </div>
  );
}
