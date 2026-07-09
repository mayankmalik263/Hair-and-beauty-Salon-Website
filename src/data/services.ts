export type Service = {
  id: string;
  name: string;
  category: string;
  price: number | null; // rupees. null = priced on consultation
  consultation?: boolean; // true for colour, bridal makeup, etc.
  note?: string; // internal note, e.g. "TODO: confirm with owner"
};

export const services: Service[] = [
  // Hair - Cutting & Styling
  {
    id: "haircut",
    name: "Haircut",
    category: "Hair - Cutting & Styling",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "hair-wash",
    name: "Hair Wash",
    category: "Hair - Cutting & Styling",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "hair-spa",
    name: "Hair Spa",
    category: "Hair - Cutting & Styling",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "hair-colour",
    name: "Hair Colour",
    category: "Hair - Cutting & Styling",
    price: null,
    consultation: true,
  },

  // Hair Treatments
  {
    id: "keratin-smoothing",
    name: "Keratin Smoothing",
    category: "Hair Treatments",
    price: 1999,
    note: "varies by hair length, confirm long-length price",
  },
  {
    id: "botox-protein",
    name: "Botox Protein",
    category: "Hair Treatments",
    price: 1999,
    note: "varies by hair length, confirm long-length price",
  },
  {
    id: "nanoplastiya",
    name: "Nanoplastiya",
    category: "Hair Treatments",
    price: 1999,
    note: "varies by hair length, confirm long-length price",
  },

  // Skin & Facial
  {
    id: "facials",
    name: "Facials",
    category: "Skin & Facial",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "cleanup",
    name: "Cleanup",
    category: "Skin & Facial",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "d-tan",
    name: "D-Tan",
    category: "Skin & Facial",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "bleach",
    name: "Bleach",
    category: "Skin & Facial",
    price: 0,
    note: "TODO: get real price from owner",
  },

  // Threading & Waxing
  {
    id: "eyebrows",
    name: "Eyebrows",
    category: "Threading & Waxing",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "upper-lip",
    name: "Upper Lip",
    category: "Threading & Waxing",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "waxing",
    name: "Waxing",
    category: "Threading & Waxing",
    price: 0,
    note: "TODO: get real price from owner",
  },

  // Nails
  {
    id: "manicure",
    name: "Manicure",
    category: "Nails",
    price: 0,
    note: "TODO: get real price from owner",
  },
  {
    id: "pedicure",
    name: "Pedicure",
    category: "Nails",
    price: 0,
    note: "TODO: get real price from owner",
  },

  // Makeup
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    category: "Makeup",
    price: null,
    consultation: true,
  },
  {
    id: "party-makeup",
    name: "Party Makeup",
    category: "Makeup",
    price: 0,
    note: "TODO: get real price from owner",
  },

  // Combos & Packages
  {
    id: "combo-quick-refresh",
    name: "Quick Refresh",
    category: "Combos & Packages",
    price: 999,
  },
  {
    id: "combo-glow-care",
    name: "Glow Care",
    category: "Combos & Packages",
    price: 1499,
  },
  {
    id: "combo-beauty-boost",
    name: "Beauty Boost",
    category: "Combos & Packages",
    price: 1999,
  },
  {
    id: "combo-complete-makeover",
    name: "Complete Makeover",
    category: "Combos & Packages",
    price: 2499,
  },
  {
    id: "pre-bridal-silver",
    name: "Pre-Bridal Silver",
    category: "Combos & Packages",
    price: 3999,
  },
  {
    id: "pre-bridal-gold",
    name: "Pre-Bridal Gold",
    category: "Combos & Packages",
    price: 5999,
  },
  {
    id: "pre-bridal-platinum",
    name: "Pre-Bridal Platinum",
    category: "Combos & Packages",
    price: 7999,
  },
];
