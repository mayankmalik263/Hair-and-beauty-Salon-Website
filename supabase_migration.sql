create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price integer,
  consultation boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table services enable row level security;
alter table offers enable row level security;

create policy "public read services" on services for select using (true);
create policy "public read offers"   on offers   for select using (true);

create policy "auth write services" on services for all to authenticated using (true) with check (true);
create policy "auth write offers"   on offers   for all to authenticated using (true) with check (true);

-- Seed Data for Offers
insert into offers (description, sort_order) values 
('Free eyebrows + upper lip for first 20 ladies', 1),
('Free hand & shoulder massage', 2),
('Premium tea/coffee on arrival', 3);

-- Seed Data for Services
insert into services (name, category, price, consultation, sort_order) values 
('Haircut', 'Hair - Cutting & Styling', 0, false, 1),
('Hair Wash', 'Hair - Cutting & Styling', 0, false, 2),
('Hair Spa', 'Hair - Cutting & Styling', 0, false, 3),
('Hair Colour', 'Hair - Cutting & Styling', null, true, 4),

('Keratin Smoothing', 'Hair Treatments', 1999, false, 1),
('Botox Protein', 'Hair Treatments', 1999, false, 2),
('Nanoplastiya', 'Hair Treatments', 1999, false, 3),

('Facials', 'Skin & Facial', 0, false, 1),
('Cleanup', 'Skin & Facial', 0, false, 2),
('D-Tan', 'Skin & Facial', 0, false, 3),
('Bleach', 'Skin & Facial', 0, false, 4),

('Eyebrows', 'Threading & Waxing', 0, false, 1),
('Upper Lip', 'Threading & Waxing', 0, false, 2),
('Waxing', 'Threading & Waxing', 0, false, 3),

('Manicure', 'Nails', 0, false, 1),
('Pedicure', 'Nails', 0, false, 2),

('Bridal Makeup', 'Makeup', null, true, 1),
('Party Makeup', 'Makeup', 0, false, 2),

('Quick Refresh', 'Combos & Packages', 999, false, 1),
('Glow Care', 'Combos & Packages', 1499, false, 2),
('Beauty Boost', 'Combos & Packages', 1999, false, 3),
('Complete Makeover', 'Combos & Packages', 2499, false, 4),
('Pre-Bridal Silver', 'Combos & Packages', 3999, false, 5),
('Pre-Bridal Gold', 'Combos & Packages', 5999, false, 6),
('Pre-Bridal Platinum', 'Combos & Packages', 7999, false, 7);
