import { createClient } from "@/lib/supabase/server";
import BookForm from "./BookForm";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BookPage() {
  const supabase = await createClient();
  const { data: servicesData } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  const services = servicesData || [];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 pb-8 md:pb-12">
        <BookForm services={services} />
      </div>
    </div>
  );
}
