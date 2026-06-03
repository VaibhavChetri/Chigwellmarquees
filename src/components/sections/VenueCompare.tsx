import Link from "next/link";

import type { Venue } from "@/types";

/* VENUE COMPARISON STRIP (§Page 04 §3) — a TRUE, accessible table: column
   headers + row headers (scope), never colour-only. Helps couples choose at a
   glance: capacity, best-for, setting, and a link to each detail page.
   Server component. Horizontally scrollable on small screens. */
export function VenueCompare({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">Compare the three Chigwell Marquees spaces</caption>
        <thead>
          <tr className="border-b border-champagne">
            <th scope="col" className="py-4 pr-6 font-sans text-[0.68rem] uppercase tracking-[0.18em] text-taupe">
              Space
            </th>
            <th scope="col" className="py-4 pr-6 font-sans text-[0.68rem] uppercase tracking-[0.18em] text-taupe">
              Capacity
            </th>
            <th scope="col" className="py-4 pr-6 font-sans text-[0.68rem] uppercase tracking-[0.18em] text-taupe">
              Best for
            </th>
            <th scope="col" className="py-4 font-sans text-[0.68rem] uppercase tracking-[0.18em] text-taupe">
              <span className="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="border-b border-champagne/60 align-top">
              <th scope="row" className="py-6 pr-6 font-display text-step-1 font-normal text-ink">
                {venue.name}
              </th>
              <td className="py-6 pr-6 text-ink-soft">
                {venue.capacity.min}–{venue.capacity.max.toLocaleString("en-GB")} guests
              </td>
              <td className="py-6 pr-6 text-ink-soft">{venue.bestFor ?? venue.tagline}</td>
              <td className="py-6">
                <Link
                  href={`/venue/${venue.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-[0.74rem] uppercase tracking-[0.16em] text-gold-deep underline-offset-4 hover:underline"
                >
                  View
                  <span aria-hidden="true">&rarr;</span>
                  <span className="sr-only">{venue.name}</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
