"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, CalendarDays, Clock, User, Phone, Check } from "lucide-react";
import { Service } from "@/data/services";

// Generate time slots from 9 AM to 9 PM
const timeSlots: string[] = [];
for (let i = 9; i < 21; i++) {
  const hour = i > 12 ? i - 12 : i;
  const ampm = i >= 12 ? "PM" : "AM";
  timeSlots.push(`${hour}:00 ${ampm}`);
  timeSlots.push(`${hour}:30 ${ampm}`);
}
timeSlots.push("9:00 PM");

function BookingForm({ services }: { services: Service[] }) {
  // Group services by category
  const servicesByCategory = useMemo(() => {
    return services.reduce((acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push(service);
      return acc;
    }, {} as Record<string, Service[]>);
  }, [services]);
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service");

  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });
  
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-select logic
  useEffect(() => {
    if (preSelectedService) {
      // Try to find a match. Previous links might have used "Combo-QuickRefresh" or "Keratin Smoothing"
      const decodedParam = decodeURIComponent(preSelectedService).toLowerCase().replace(/-/g, " ");
      const match = services.find(s => 
        s.name.toLowerCase() === decodedParam ||
        s.id.toLowerCase() === decodedParam ||
        `combo-${s.name.toLowerCase().replace(/\s+/g, '')}` === preSelectedService.toLowerCase()
      );
      if (match) {
        setSelectedServices(new Set([match.id]));
      }
    }
  }, [preSelectedService]);

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectedItems = useMemo(() => {
    return services.filter(s => selectedServices.has(s.id));
  }, [selectedServices]);

  const { subtotal, hasConsultation } = useMemo(() => {
    let subtotal = 0;
    let hasConsultation = false;
    
    selectedItems.forEach(item => {
      if (item.price === null || item.price === 0 || item.consultation) {
        hasConsultation = true;
      } else {
        subtotal += item.price;
      }
    });

    return { subtotal, hasConsultation };
  }, [selectedItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (selectedServices.size === 0) {
      setError("Please select at least one service.");
      return;
    }

    if (!formData.name || !formData.phone) {
      setError("Please fill in your name and phone number.");
      return;
    }

    // Validate phone (10 digits roughly)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Build the message
    let preferredText = "flexible";
    if (formData.date || formData.time) {
      const datePart = formData.date ? new Date(formData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "";
      const timePart = formData.time || "";
      preferredText = [datePart, timePart].filter(Boolean).join(", ");
    }

    const lines = [
      "Hello Luxe Salon! I would like to book an appointment.",
      "",
      `Naam: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Preferred: ${preferredText}`,
      "",
      "Services:"
    ];

    selectedItems.forEach(item => {
      let priceText = "";
      if (item.price === null || item.consultation) priceText = "On consultation";
      else if (item.price === 0) priceText = "Price on request";
      else priceText = `Rs ${item.price}`;

      lines.push(`- ${item.name} (${priceText})`);
    });

    lines.push("");
    
    let totalText = `Estimated total: Rs ${subtotal}`;
    if (hasConsultation) {
      totalText += " (consultation/on-request items alag se)";
    }
    
    lines.push(totalText);
    lines.push("");
    lines.push("Please confirm kar dijiye. Dhanyavaad!");

    const text = lines.join("\n");
    const url = `https://wa.me/918222830906?text=${encodeURIComponent(text)}`;
    
    window.open(url, "_blank");
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 md:px-6 mt-8">
      {/* Left Column: Service Selection */}
      <div className="flex-1 space-y-10">
        <div className="text-center md:text-left mb-6">
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Build Your Appointment</h2>
          <p className="text-zinc-400">Select the services you want. No advance payment required.</p>
        </div>

        {Object.entries(servicesByCategory).map(([category, catServices]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-gold-500 border-b border-white/10 pb-2">{category}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {catServices.map(service => {
                const isSelected = selectedServices.has(service.id);
                const isConsultation = service.price === null || service.price === 0 || service.consultation;
                let priceDisplay = "";
                
                if (service.price === null || service.consultation) priceDisplay = "On consultation";
                else if (service.price === 0) priceDisplay = "Price on request";
                else priceDisplay = `₹${service.price}`;

                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    type="button"
                    className={`flex flex-col items-start text-left p-4 rounded-xl border transition-all duration-200 ${
                      isSelected 
                        ? "bg-gold-500/10 border-gold-500 ring-1 ring-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                        : "bg-zinc-900 border-white/5 hover:border-white/20 hover:bg-zinc-800/80"
                    }`}
                  >
                    <div className="flex justify-between w-full items-start mb-1">
                      <span className={`font-medium ${isSelected ? "text-white" : "text-zinc-200"}`}>
                        {service.name}
                      </span>
                      <div className={`shrink-0 ml-2 rounded-full p-0.5 ${isSelected ? "bg-gold-500 text-black" : "bg-zinc-800 text-transparent"}`}>
                        <Check className="h-3 w-3" />
                      </div>
                    </div>
                    <span className={`text-sm ${isSelected ? "text-gold-400 font-medium" : "text-zinc-500"}`}>
                      {priceDisplay}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Details & Summary (Sticky) */}
      <div className="lg:w-[400px] shrink-0">
        <div className="sticky top-24 rounded-2xl border border-white/10 bg-zinc-950 p-6 flex flex-col gap-6 shadow-2xl">
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-gold-500" /> Your Details
            </h3>
            
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-black pl-10 pr-4 py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 transition-colors hover:border-white/20 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">Phone (WhatsApp)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-black pl-10 pr-4 py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 transition-colors hover:border-white/20 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="date" className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">Preferred Date (optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarDays className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/10 bg-black pl-10 pr-2 py-2.5 text-base sm:text-sm text-white transition-colors hover:border-white/20 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="time" className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">Preferred Time (optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-4 w-4 text-zinc-500" />
                    </div>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/10 bg-black pl-10 pr-10 py-2.5 text-base sm:text-sm text-white transition-colors hover:border-white/20 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 appearance-none"
                    >
                      <option value="" disabled>Select time...</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <h3 className="text-sm font-medium text-zinc-400 mb-3">Booking Summary</h3>
            <div className="flex justify-between items-end mb-1">
              <span className="text-zinc-300">{selectedItems.length} {selectedItems.length === 1 ? 'service' : 'services'}</span>
              <span className="text-2xl font-bold text-white">₹{subtotal}</span>
            </div>
            
            {hasConsultation && (
              <p className="text-xs text-gold-400 mt-2 flex items-start gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>Plus items priced on request/consultation</span>
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button 
              onClick={handleSubmit}
              variant="primary" 
              size="lg" 
              className="w-full text-base relative"
              disabled={isSubmitting || selectedServices.size === 0 || !formData.name || !formData.phone}
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent absolute" />
              ) : (
                "Book via WhatsApp"
              )}
            </Button>
            <div className="mt-4 space-y-2 text-center text-xs text-zinc-500">
              <p className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gold-500/70" />
                No advance payment. Pay only after your service.
              </p>
              <p>Kapil will confirm your appointment on WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookForm({ services }: { services: Service[] }) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-zinc-950 py-12 md:py-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl text-gold-500">
            Book an Appointment
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Secure your spot for a premium grooming experience. Select your services below.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium text-zinc-300">
            Apni services choose kariye, price dekhiye, aur WhatsApp pe book kar dijiye. Kapil aapko khud confirm karega.
          </p>
        </div>
      </section>

      {/* Main Form */}
      <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-zinc-500">Loading booking form...</div>}>
        <BookingForm services={services} />
      </Suspense>
    </div>
  );
}
