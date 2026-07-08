# Assets Required for Final Delivery

The following placeholders are currently used on the site and must be replaced with real assets before the site goes live.

## 1. Professional Logo
- **Current State**: Using a CSS/Text lockup.
- **Action Required**: The salon does not currently have a professional logo. Treat this as an upsell opportunity. Once designed, export as an SVG and replace the logo lockup in `src/components/ui/Navbar.tsx` and `src/components/ui/Footer.tsx`.

## 2. Real Salon Photography
- **Current State**: Unsplash stock photos are used on the Home Page Hero and Gallery sections. Each instance is marked with `{/* TODO: swap for real salon photo */}` in the codebase.
- **Action Required**: Conduct a photoshoot (or acquire photos from the owner) capturing the salon's interior, staff, and before/after client shots. Replace the placeholder URLs in:
  - `src/app/page.tsx` (Hero background image)
  - `src/app/gallery/page.tsx` (The 3 placeholder images under "Salon Experience")

## 3. Real Google Reviews
- **Current State**: Using 3 placeholder testimonials on the Home page. Marked with `{/* TODO: real Google reviews needed */}`.
- **Action Required**: Ensure the Google Business Profile is claimed and optimized. Once real reviews start coming in, copy 3 glowing 5-star reviews and update the `Testimonials` section in `src/app/page.tsx`.

## 4. Confirmed Operating Hours
- **Current State**: Using "9:00 am – 9:00 pm".
- **Action Required**: Confirm these exact hours with Kapil. If there are any differences (e.g., closed on a specific day), update them in `src/app/page.tsx` and `src/components/ui/Footer.tsx`.
