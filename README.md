# Hair & Beauty Unisex Salon Website

A production-quality marketing and booking website for Hair & Beauty Unisex Salon, built with Next.js (App Router), Tailwind CSS, Supabase, and Framer Motion.

## Features
- **Mobile-first luxury design**: Dark and metallic gold color scheme matching the salon's brand.
- **Dynamic Services & Packages**: Comprehensive list of services with real pricing.
- **Booking Flow with Graceful Fallback**: Integrates with Supabase to store bookings. If Supabase is not configured, it gracefully falls back to sending a pre-filled WhatsApp message.
- **Performance Optimized**: Built using Next.js App router and Tailwind CSS v4.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Supabase Environment Variables (Optional)**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   *Note: If you omit these keys, the booking form will automatically fallback to WhatsApp redirection.*

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Supabase Schema

If you are using Supabase, run the following SQL command in the Supabase SQL editor to create the necessary table:

```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  service text not null,
  booking_date date not null,
  time_slot text not null,
  status text default 'pending',
  created_at timestamptz default now()
);
```

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com/new).
3. Under Environment Variables, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Click Deploy. Vercel will automatically build and host your Next.js application.
