# Assets Required for Final Delivery

The following placeholders are currently used on the site and must be replaced with real assets before the site goes live.

## 1. Real Per-Service Prices
- **Action Required**: Have Kapil fill out `service-price-list-INTAKE.md` with the full price list. Update `src/data/services.ts` to reflect real prices for haircuts, spas, and facials (currently marked as "Price on request").

## 2. Real Google Review Link
- **Action Required**: Ensure the Google Business Profile is claimed and optimized. Add the real Google Review link to the "Loved your visit?" placeholder in `src/app/page.tsx`.

## 3. Real Salon/Interior Photos
- **Action Required**: Conduct a photoshoot (or acquire photos from the owner) capturing the salon's interior. Replace the stock placeholder URLs in `src/app/page.tsx` (Hero background image) and `src/app/gallery/page.tsx` (the 3 placeholder images under "Salon Experience").

## 4. Exact Map Pin
- **Action Required**: Verify the exact Google Maps embed URL for the salon's location in Model Town, Rohtak, and update the `<iframe>` in `src/app/page.tsx`.
