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
                      <a href="tel:8222830906" className="text-xl font-semibold hover:text-gold-400 transition-colors">
                        8222830906
                      </a>
                      <a
                        href="https://wa.me/918222830906"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
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
                      Near Double Park, Model Town,<br />
                      Rohtak, Haryana 124001<br />
                      (H.No 190 L, Balaji Wali Gali)
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
            <div className="h-[400px] lg:h-auto min-h-[500px] overflow-hidden rounded-2xl border border-white/10 relative bg-zinc-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
              </div>
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
        </div>
      </Section>
    </div>
  );
}
