import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-gold-500">
                Hair & Beauty
              </span>
              <span className="mt-1 h-[1px] w-full bg-gold-400" />
              <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-zinc-400">
                Unisex Salon
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Style That Speaks, Beauty That Stays. Premium Hair, Skin & Beauty Services for Men, Women & Kids.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold-400">Quick Links</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/services" className="transition-colors hover:text-gold-400">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="transition-colors hover:text-gold-400">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/book" className="transition-colors hover:text-gold-400">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-gold-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold-400">Visit Us</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>
                  Near Double Park, Model Town,
                  <br />
                  Rohtak, Haryana 124001
                  <br />
                  (H.No 190 L, Balaji Wali Gali)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold-500" />
                <span>Open Daily: 9:00 am – 9:00 pm</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                <a href="tel:8222830906" className="transition-colors hover:text-gold-400">
                  8222830906
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Hair & Beauty Unisex Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
