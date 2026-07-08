"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { supabase, hasSupabaseConfig } from "@/lib/supabase";
import { CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";

const servicesList = [
  "Keratin Smoothing",
  "Botox Protein Treatment",
  "Nanoplastiya",
  "Combo-QuickRefresh",
  "Combo-GlowCare",
  "Combo-BeautyBoost",
  "Combo-CompleteMakeover",
  "Pre-Bridal Silver",
  "Pre-Bridal Gold",
  "Pre-Bridal Platinum",
  "Hair Care & Styling",
  "Skin & Facials",
  "Waxing & Threading",
  "Nails & Body",
  "Other"
];

// Generate time slots from 9 AM to 9 PM
const timeSlots: string[] = [];
for (let i = 9; i < 21; i++) {
  const hour = i > 12 ? i - 12 : i;
  const ampm = i >= 12 ? "PM" : "AM";
  timeSlots.push(`${hour}:00 ${ampm}`);
  timeSlots.push(`${hour}:30 ${ampm}`);
}
// Add final 9:00 PM slot
timeSlots.push("9:00 PM");

function BookingForm() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: preSelectedService,
    date: "",
    time: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const constructWhatsAppUrl = (data: typeof formData) => {
    const text = `Hi, I would like to book an appointment for *${data.service}* on *${data.date}* at *${data.time}*. My name is ${data.name}.`;
    return `https://wa.me/918222830906?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      setError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    if (hasSupabaseConfig && supabase) {
      try {
        const { error: dbError } = await supabase.from("bookings").insert([
          {
            name: formData.name,
            phone: formData.phone,
            service: formData.service,
            booking_date: formData.date,
            time_slot: formData.time,
          },
        ]);

        if (dbError) throw dbError;
        setIsSuccess(true);
      } catch (err: any) {
        console.error("Booking error:", err);
        setError("Something went wrong while booking. Please try again or use WhatsApp directly.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Fallback: Directly open WhatsApp
      setIsSubmitting(false);
      window.open(constructWhatsAppUrl(formData), "_blank");
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8 text-center max-w-2xl mx-auto">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-gold-500">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white mb-4">
          {hasSupabaseConfig ? "Booking Request Received!" : "Redirected to WhatsApp!"}
        </h2>
        <p className="text-zinc-400 mb-8">
          {hasSupabaseConfig 
            ? `Thanks ${formData.name}, your request for ${formData.service} on ${formData.date} at ${formData.time} is received. We will confirm shortly via WhatsApp.`
            : `Thanks ${formData.name}, please complete your booking via the WhatsApp chat that opened.`}
        </p>
        
        {hasSupabaseConfig && (
          <a
            href={constructWhatsAppUrl(formData)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            <MessageCircle className="h-4 w-4" /> Message Us on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-zinc-950 p-6 md:p-8">
      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-md bg-red-500/10 p-4 text-sm text-red-500">
          <AlertCircle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-300">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white placeholder-zinc-500 transition-colors hover:border-gold-500/50 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            placeholder="Jane Doe"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Phone Number (WhatsApp)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white placeholder-zinc-500 transition-colors hover:border-gold-500/50 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="service" className="text-sm font-medium text-zinc-300">Service</label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white transition-colors hover:border-gold-500/50 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <option value="" disabled>Select a service</option>
            {servicesList.map((srv) => (
              <option key={srv} value={srv}>{srv}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-zinc-300">Preferred Date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white transition-colors hover:border-gold-500/50 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            style={{ colorScheme: "dark" }}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="time" className="text-sm font-medium text-zinc-300">Preferred Time Slot</label>
          <select
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white transition-colors hover:border-gold-500/50 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <option value="" disabled>Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? "Processing..." 
            : hasSupabaseConfig ? "Book Appointment" : "Book via WhatsApp"}
        </Button>
        {!hasSupabaseConfig && (
          <p className="text-center text-xs text-zinc-500">
            You will be redirected to WhatsApp to confirm your booking.
          </p>
        )}
      </div>
    </form>
  );
}

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-zinc-950 py-12 md:py-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl text-gold-500">
            Book an Appointment
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Secure your spot for a premium grooming experience. Select your service, date, and time.
          </p>
        </div>
      </section>

      <Section className="bg-black flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 w-full">
          <Suspense fallback={<div className="text-center text-zinc-500">Loading form...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </Section>
    </div>
  );
}
