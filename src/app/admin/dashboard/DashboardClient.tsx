"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { LogOut, Plus, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

type Service = {
  id: string;
  name: string;
  category: string;
  price: number | null;
  consultation: boolean;
  active: boolean;
  sort_order: number;
};

type Offer = {
  id: string;
  description: string;
  active: boolean;
  sort_order: number;
};

export default function DashboardClient({ initialServices, initialOffers }: { initialServices: Service[], initialOffers: Offer[] }) {
  const [activeTab, setActiveTab] = useState<"services" | "offers">("services");
  const [services, setServices] = useState<Service[]>(initialServices);
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.push("/admin");
    router.refresh();
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete service.");
    } else {
      toast.success("Service deleted.");
      setServices(services.filter(s => s.id !== id));
    }
  };

  const toggleServiceActive = async (id: string, current: boolean) => {
    const { error } = await supabase.from("services").update({ active: !current }).eq("id", id);
    if (error) {
      toast.error("Failed to update status.");
    } else {
      toast.success("Status updated.");
      setServices(services.map(s => s.id === id ? { ...s, active: !current } : s));
    }
  };

  const deleteOffer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;
    
    const { error } = await supabase.from("offers").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete offer.");
    } else {
      toast.success("Offer deleted.");
      setOffers(offers.filter(o => o.id !== id));
    }
  };

  const toggleOfferActive = async (id: string, current: boolean) => {
    const { error } = await supabase.from("offers").update({ active: !current }).eq("id", id);
    if (error) {
      toast.error("Failed to update status.");
    } else {
      toast.success("Status updated.");
      setOffers(offers.map(o => o.id === id ? { ...o, active: !current } : o));
    }
  };

  // Group services by category for display
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  // Modal Submit Handlers
  const handleServiceSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const consultation = formData.get("consultation") === "on";
    const priceStr = formData.get("price") as string;
    
    // Validation
    if (!name.trim()) return toast.error("Name is required");
    if (!category.trim()) return toast.error("Category is required");
    
    let price: number | null = null;
    if (!consultation) {
      if (priceStr.trim() === "") return toast.error("Price is required unless on consultation");
      price = parseInt(priceStr, 10);
      if (isNaN(price) || price < 0) return toast.error("Price must be a valid positive number");
    }

    const payload = {
      name: name.trim(),
      category: category.trim(),
      price,
      consultation,
      active: true,
      sort_order: editingService ? editingService.sort_order : services.length + 1
    };

    if (editingService) {
      const { data, error } = await supabase.from("services").update(payload).eq("id", editingService.id).select().single();
      if (error) return toast.error("Failed to update service");
      setServices(services.map(s => s.id === editingService.id ? data : s));
      toast.success("Service updated");
    } else {
      const { data, error } = await supabase.from("services").insert(payload).select().single();
      if (error) return toast.error("Failed to add service");
      setServices([...services, data]);
      toast.success("Service added");
    }
    
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const handleOfferSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get("description") as string;

    if (!description.trim()) return toast.error("Description is required");

    const payload = {
      description: description.trim(),
      active: true,
      sort_order: editingOffer ? editingOffer.sort_order : offers.length + 1
    };

    if (editingOffer) {
      const { data, error } = await supabase.from("offers").update(payload).eq("id", editingOffer.id).select().single();
      if (error) return toast.error("Failed to update offer");
      setOffers(offers.map(o => o.id === editingOffer.id ? data : o));
      toast.success("Offer updated");
    } else {
      const { data, error } = await supabase.from("offers").insert(payload).select().single();
      if (error) return toast.error("Failed to add offer");
      setOffers([...offers, data]);
      toast.success("Offer added");
    }

    setIsOfferModalOpen(false);
    setEditingOffer(null);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-4 border-b border-white/10 pb-[-1px]">
          <button
            onClick={() => setActiveTab("services")}
            className={`pb-2 text-sm font-medium transition-colors ${activeTab === "services" ? "border-b-2 border-gold-500 text-gold-500" : "text-zinc-400 hover:text-white"}`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`pb-2 text-sm font-medium transition-colors ${activeTab === "offers" ? "border-b-2 border-gold-500 text-gold-500" : "text-zinc-400 hover:text-white"}`}
          >
            Offers Strip
          </button>
        </div>
        <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>

      {activeTab === "services" && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Manage Services</h2>
            <Button onClick={() => { setEditingService(null); setIsServiceModalOpen(true); }} variant="primary" size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Service
            </Button>
          </div>
          
          {Object.entries(servicesByCategory).map(([category, catservices]) => (
            <div key={category} className="rounded-xl border border-white/10 bg-black overflow-hidden">
              <div className="bg-zinc-900/50 px-4 py-3 border-b border-white/10">
                <h3 className="font-semibold text-gold-500">{category}</h3>
              </div>
              <ul className="divide-y divide-white/5">
                {catservices.map((s) => (
                  <li key={s.id} className="flex items-center justify-between p-4 hover:bg-zinc-900/20">
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {s.name}
                        {!s.active && <span className="text-[10px] uppercase tracking-wider bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full">Hidden</span>}
                      </div>
                      <div className="text-sm text-zinc-400 mt-1">
                        {s.consultation ? "On consultation" : s.price === 0 || s.price === null ? "Price on request" : `₹${s.price}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleServiceActive(s.id, s.active)} className="p-2 text-zinc-500 hover:text-white" title={s.active ? "Hide service" : "Show service"}>
                        {s.active ? "Hide" : "Show"}
                      </button>
                      <button onClick={() => { setEditingService(s); setIsServiceModalOpen(true); }} className="p-2 text-zinc-500 hover:text-white" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteService(s.id)} className="p-2 text-zinc-500 hover:text-red-500" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === "offers" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Manage Offers</h2>
            <Button onClick={() => { setEditingOffer(null); setIsOfferModalOpen(true); }} variant="primary" size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Offer
            </Button>
          </div>
          
          <div className="rounded-xl border border-white/10 bg-black overflow-hidden">
            <ul className="divide-y divide-white/5">
              {offers.map((o) => (
                <li key={o.id} className="flex items-center justify-between p-4 hover:bg-zinc-900/20">
                  <div className="flex-1">
                    <div className="font-medium text-white flex items-center gap-2">
                      {o.description}
                      {!o.active && <span className="text-[10px] uppercase tracking-wider bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full">Hidden</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button onClick={() => toggleOfferActive(o.id, o.active)} className="p-2 text-zinc-500 hover:text-white" title={o.active ? "Hide offer" : "Show offer"}>
                      {o.active ? "Hide" : "Show"}
                    </button>
                    <button onClick={() => { setEditingOffer(o); setIsOfferModalOpen(true); }} className="p-2 text-zinc-500 hover:text-white" title="Edit">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteOffer(o.id)} className="p-2 text-zinc-500 hover:text-red-500" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
              {offers.length === 0 && (
                <li className="p-8 text-center text-zinc-500">No offers found. Add one above.</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-xl">
            <h3 className="mb-6 font-serif text-xl font-bold text-white">{editingService ? "Edit Service" : "Add Service"}</h3>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Name</label>
                <input name="name" defaultValue={editingService?.name} required className="w-full rounded-lg border border-white/10 bg-black p-2.5 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Category</label>
                <input name="category" defaultValue={editingService?.category} required placeholder="e.g. Hair Treatments" className="w-full rounded-lg border border-white/10 bg-black p-2.5 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="consultation" name="consultation" defaultChecked={editingService?.consultation} className="h-4 w-4 rounded border-white/10 bg-black text-gold-500 focus:ring-gold-500 focus:ring-offset-black" />
                <label htmlFor="consultation" className="text-sm font-medium text-zinc-300">Priced on consultation</label>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Price (₹)</label>
                <input name="price" type="number" defaultValue={editingService?.price ?? ""} placeholder="e.g. 1999" className="w-full rounded-lg border border-white/10 bg-black p-2.5 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
                <p className="mt-1 text-[10px] text-zinc-500">Leave blank if on consultation. Enter 0 for 'Price on request'.</p>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsServiceModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Service</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-xl">
            <h3 className="mb-6 font-serif text-xl font-bold text-white">{editingOffer ? "Edit Offer" : "Add Offer"}</h3>
            <form onSubmit={handleOfferSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Description</label>
                <input name="description" defaultValue={editingOffer?.description} required placeholder="e.g. Free hand massage" className="w-full rounded-lg border border-white/10 bg-black p-2.5 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOfferModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Offer</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
