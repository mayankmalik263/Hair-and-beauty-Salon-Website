import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export const revalidate = 0; // Never cache the admin dashboard

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin");
  }

  // Fetch initial data
  const [{ data: services }, { data: offers }] = await Promise.all([
    supabase.from("services").select("*").order("sort_order", { ascending: true }),
    supabase.from("offers").select("*").order("sort_order", { ascending: true })
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <header className="border-b border-white/10 bg-black py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-gold-500">Owner Dashboard</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <DashboardClient initialServices={services || []} initialOffers={offers || []} />
      </main>
    </div>
  );
}
