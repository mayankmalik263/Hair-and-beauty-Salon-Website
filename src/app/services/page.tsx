import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const services = [
  {
    category: "Signature Hair Treatments",
    items: [
      { name: "Keratin Smoothing", price: "₹1,999", description: "Straight, smooth, stunning. Advanced frizz control and long-lasting damage protection." },
      { name: "Botox Protein Treatment (Shoulder length)", price: "₹1,999", description: "Smoother, stronger, shinier hair. Complete frizz elimination and deep protein nourishment." },
      { name: "Botox Protein Treatment (Any length)", price: "₹2,699", description: "Smoother, stronger, shinier hair. Complete frizz elimination and deep protein nourishment." },
      { name: "Nanoplastiya (Shoulder length)", price: "₹1,999", description: "Intense damage repair, strengthens hair from within, adds brilliant lasting shine." },
      { name: "Nanoplastiya (Any length)", price: "₹2,699", description: "Intense damage repair, strengthens hair from within, adds brilliant lasting shine." },
    ]
  },
  {
    category: "Hair Care & Styling",
    items: [
      { name: "Premium Hair Cut", price: "Starting ₹299", description: "Expert styling customized for your face shape and preference." },
      { name: "Deep Conditioning Hair Spa", price: "Starting ₹499", description: "Rejuvenating treatment for dry, damaged hair." },
      { name: "Hair Styling (Blow dry, Tongs, Curls)", price: "Starting ₹399", description: "Perfect styling for any occasion." },
    ]
  },
  {
    category: "Skin & Facials",
    items: [
      { name: "O3+ Professional Facial", price: "Starting ₹1,499", description: "Premium brightening and anti-aging treatment." },
      { name: "Hydra Facial", price: "Starting ₹1,999", description: "Deep cleansing, exfoliation, and hydration." },
      { name: "Fruit / Gold Facial", price: "Starting ₹999", description: "Natural glow and skin rejuvenation." },
      { name: "D-Tan / Bleach", price: "Starting ₹299", description: "Instantly removes sun tan and brightens skin." },
      { name: "Clean-up", price: "Starting ₹499", description: "Basic cleansing and exfoliation." },
    ]
  },
  {
    category: "Waxing & Threading",
    items: [
      { name: "Full Body Waxing (RICA)", price: "Starting ₹1,199", description: "Smooth, painless hair removal using premium RICA wax." },
      { name: "Full Arms & Underarms", price: "Starting ₹299", description: "Quick and hygienic hair removal." },
      { name: "Full Legs", price: "Starting ₹399", description: "Smooth and long-lasting results." },
      { name: "Threading (Eyebrows, Upper lip, Full face)", price: "Starting ₹49", description: "Precise shaping and hair removal." },
    ]
  },
  {
    category: "Nails & Body",
    items: [
      { name: "Luxury Manicure", price: "Starting ₹399", description: "Complete nail care, massage, and polish." },
      { name: "Luxury Pedicure", price: "Starting ₹499", description: "Relaxing foot soak, scrub, and nail care." },
      { name: "Body Polishing", price: "Starting ₹1,499", description: "Full body exfoliation and hydration for glowing skin." },
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative bg-zinc-950 py-12 md:py-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl text-gold-500">
            Our Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Comprehensive grooming and beauty solutions tailored to your unique style. 
            Experience luxury with our expert professionals.
          </p>
        </div>
      </section>

      {/* Services List */}
      <Section className="bg-black">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="flex flex-col space-y-16">
            {services.map((category, i) => (
              <div key={i} className="scroll-mt-24" id={category.category.replace(/\s+/g, '-').toLowerCase()}>
                <h2 className="mb-8 font-serif text-3xl font-bold text-white border-b border-white/10 pb-4">
                  {category.category}
                </h2>
                
                <div className="flex flex-col space-y-4">
                  {category.items.map((item, j) => (
                    <div key={j} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/5 bg-zinc-950/50 p-6 transition-all duration-300 hover:border-gold-500/30 hover:bg-black hover:shadow-[0_0_15px_rgba(201,162,39,0.05)]">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-zinc-200 transition-colors group-hover:text-gold-400">{item.name}</h3>
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent ml-4 hidden sm:block opacity-50 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="mt-2 text-sm text-zinc-400 max-w-xl">{item.description}</p>
                      </div>
                      
                      <div className="flex flex-col sm:items-end gap-3 mt-4 sm:mt-0">
                        <span className="text-xl font-bold text-gold-500">{item.price}</span>
                        <Link 
                          href={`/book?service=${encodeURIComponent(item.name)}`}
                          className={buttonVariants({ variant: "outline", size: "sm", className: "w-fit" })}
                        >
                          Book Now <ChevronRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Combos CTA */}
      <section className="bg-gold-500 py-16 text-black">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">Looking for Packages?</h2>
          <p className="text-lg font-medium mb-8 max-w-2xl mx-auto">
            Check out our Ladies Exclusive Combos and Pre-Bridal packages for the best value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#ladies-exclusive-combos" className="inline-flex items-center justify-center rounded-md border-2 border-black bg-transparent px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-black hover:text-gold-500">
              View Combos
            </Link>
            <Link href="/#pre-bridal-packages" className="inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800">
              Bridal Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
