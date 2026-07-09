# Hair & Beauty Unisex Salon Website

A production-quality marketing and booking website for Hair & Beauty Unisex Salon, built with Next.js (App Router), Tailwind CSS, and Framer Motion.

## Features
- **Mobile-first luxury design**: Dark and metallic gold color scheme matching the salon's brand.
- **Dynamic Services & Packages**: Comprehensive list of services with real pricing.
- **WhatsApp Booking Flow**: Users can build their appointment and send a clean, itemised WhatsApp message to the salon. No complex backend required.
- **Performance Optimized**: Built using Next.js App router and Tailwind CSS v4.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## How to Update Prices
All services and pricing are centralized in a single data file. 
To update prices:
1. Open `src/data/services.ts`.
2. Locate the service you want to update.
3. Change the `price` field. For services that require consultation, set `price: null, consultation: true`.
4. Ask the salon owner to fill out `service-price-list-INTAKE.md` (if available) to gather the real numbers.

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com/new).
3. Click Deploy. Vercel will automatically build and host your Next.js application.
