import type { SiteSettings } from "@/types";

/* VENUE MAP + FIND-US (§Page 18 §4) — a real, accurate map of the venue via a
   keyless Google Maps embed (lazy-loaded), with directions and the free-parking
   note. Keyboard-skippable: a skip link jumps past the map iframe. When a
   Mapbox token is configured (NEXT_PUBLIC_MAPBOX_TOKEN) this can be swapped for
   a luxe custom Mapbox GL style without changing the page.
   The directions text is real content (not map-only). */
export function VenueMap({ settings }: { settings: SiteSettings }) {
  const { address, mapLat, mapLng } = settings.contact;
  const query = encodeURIComponent(address);
  const embedSrc = `https://maps.google.com/maps?q=${query}&z=14&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapLat},${mapLng}`;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Map */}
      <div className="flex flex-col gap-3">
        <a href="#after-map" className="sr-only focus:not-sr-only focus:mb-2 focus:inline-block focus:text-gold-deep">
          Skip map
        </a>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-champagne">
          <iframe
            title={`Map showing ${settings.brandName}, ${address}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full border-0"
          />
        </div>
        <span id="after-map" tabIndex={-1} className="sr-only">
          End of map.
        </span>
      </div>

      {/* Find us */}
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-step-2 text-ink">Find us</h3>
          <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{address}</p>
        </div>

        <div className="flex flex-col gap-2 text-ink-soft">
          <p>
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-taupe">By car · </span>
            40 minutes from Central London, 15 minutes off the M25, with easy access from the A12,
            M11 and M1.
          </p>
          <p>
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-taupe">Parking · </span>
            Plentiful free parking on-site.
          </p>
        </div>

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-[var(--radius-input)] border border-ink/30 px-6 py-3 font-sans text-[0.8rem] uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:text-gold-deep"
        >
          Get directions
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
