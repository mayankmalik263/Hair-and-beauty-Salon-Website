# Hair & Beauty Unisex Salon Website

A production-quality marketing and booking website for Hair & Beauty Unisex Salon, built with Next.js (App Router), Tailwind CSS, and Framer Motion.

## Features
- **Mobile-first luxury design**: Dark and metallic gold color scheme matching the salon's brand.
- **Dynamic Services & Packages**: Comprehensive list of services with real pricing.
- **WhatsApp Booking Flow**: Users can build their appointment and send a clean, itemised WhatsApp message to the salon. No complex backend required.
- **Performance Optimized**: Built using Next.js App router and Tailwind CSS v4.

## Setup Instructions

### 1. Supabase Setup (Database & Admin)
This project uses Supabase for the owner's admin panel and storing services and offers.
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **Project Settings -> API** and copy your `Project URL` and `anon` `public` key.
3. In this repository, create a `.env.local` file and add them:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```
4. In your Supabase dashboard, go to the **SQL Editor**, paste the contents of `supabase_migration.sql` from this repository, and click **Run**. This will create the `services` and `offers` tables, enable Row Level Security, and insert seed data.
5. In your Supabase dashboard, go to **Authentication -> Users** and click **Add User**. Enter the salon owner's email and a secure password. This is their login for the `/admin` dashboard.

### 2. Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Admin Dashboard & Updating Prices
All services, prices, and special offers are managed dynamically through the Owner Dashboard.

1. Navigate to `/admin` on the live site (or `http://localhost:3000/admin` locally).
2. Log in using the email and password created in Supabase Authentication.
3. From the dashboard, you can:
   - **Add/Edit/Delete Services**: Update prices, mark services as "Priced on consultation", or hide them temporarily.
   - **Manage Offers**: Add new promotional lines to the homepage banner.
   
Changes saved in the dashboard will automatically appear on the live website within 60 seconds.

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com/new).
3. Click Deploy. Vercel will automatically build and host your Next.js application.
