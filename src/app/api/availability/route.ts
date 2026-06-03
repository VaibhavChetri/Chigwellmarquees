import { NextResponse } from "next/server";

import type { AvailabilitySlot } from "@/types";

/* GET /api/availability?from=&to= (§7.6) → AvailabilitySlot[].
   Stub generator now; future-syncable to the real booking system. Deterministic
   pseudo-status so the calendar renders consistently in dev. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const start = from ? new Date(from) : new Date();
  const end = to ? new Date(to) : new Date(start.getTime() + 90 * 86_400_000);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return NextResponse.json({ message: "Invalid date range." }, { status: 422 });
  }

  const slots: AvailabilitySlot[] = [];
  const statuses: AvailabilitySlot["status"][] = ["available", "provisional", "booked"];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayIndex = Math.floor(d.getTime() / 86_400_000);
    // Mostly available; sprinkle provisional/booked deterministically.
    const status =
      dayIndex % 11 === 0 ? statuses[2] : dayIndex % 7 === 0 ? statuses[1] : statuses[0];
    slots.push({ date: d.toISOString().slice(0, 10), status: status ?? "available" });
  }

  return NextResponse.json(slots, {
    status: 200,
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
