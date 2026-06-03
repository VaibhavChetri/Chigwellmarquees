"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { AvailabilitySlot } from "@/types";

/* AVAILABILITY CALENDAR (§Page 18 §3) — the signature piece. A real month grid
   (role="grid") reading GET /api/availability. Status is conveyed by TEXT +
   ICON + colour (never colour alone). Roving-tabindex keyboard nav (arrows /
   Home / End), month paging. Gold accents. */

type Status = AvailabilitySlot["status"];

const STATUS_META: Record<Status, { label: string; icon: string; dot: string }> = {
  available: { label: "Available", icon: "○", dot: "bg-sage" },
  provisional: { label: "Provisional", icon: "◐", dot: "bg-gold" },
  booked: { label: "Booked", icon: "●", dot: "bg-rose-deep" },
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function iso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
/** Monday-based weekday index (0=Mon … 6=Sun). */
function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

export function AvailabilityCalendar() {
  const today = new Date();
  const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [slots, setSlots] = useState<Record<string, Status>>({});
  const [focusDate, setFocusDate] = useState<string>(todayIso);
  const gridRef = useRef<HTMLDivElement>(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = mondayIndex(new Date(year, month, 1));
  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  // Fetch availability for the visible month.
  useEffect(() => {
    const from = iso(year, month, 1);
    const to = iso(year, month, daysInMonth);
    let cancelled = false;
    fetch(`/api/availability?from=${from}&to=${to}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: AvailabilitySlot[]) => {
        if (cancelled) return;
        const map: Record<string, Status> = {};
        for (const s of data) map[s.date] = s.status;
        setSlots(map);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [year, month, daysInMonth]);

  // Move focus to the active day cell when focusDate changes (roving tabindex).
  useEffect(() => {
    const el = gridRef.current?.querySelector<HTMLElement>(`[data-date="${focusDate}"]`);
    if (el && document.activeElement !== el && gridRef.current?.contains(document.activeElement)) {
      el.focus();
    }
  }, [focusDate]);

  function changeMonth(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
    setFocusDate(iso(d.getFullYear(), d.getMonth(), 1));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const cur = new Date(`${focusDate}T00:00:00`);
    let next: Date | null = null;
    switch (e.key) {
      case "ArrowRight": next = new Date(cur.getTime() + 86_400_000); break;
      case "ArrowLeft": next = new Date(cur.getTime() - 86_400_000); break;
      case "ArrowDown": next = new Date(cur.getTime() + 7 * 86_400_000); break;
      case "ArrowUp": next = new Date(cur.getTime() - 7 * 86_400_000); break;
      case "Home": next = new Date(year, month, 1); break;
      case "End": next = new Date(year, month, daysInMonth); break;
      default: return;
    }
    e.preventDefault();
    if (next.getMonth() !== month || next.getFullYear() !== year) {
      setYear(next.getFullYear());
      setMonth(next.getMonth());
    }
    setFocusDate(iso(next.getFullYear(), next.getMonth(), next.getDate()));
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="mx-auto w-full max-w-xl rounded-[var(--radius-card)] border border-champagne bg-ivory p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <h3 aria-live="polite" className="font-display text-step-1 text-ink">
          {monthLabel}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold"
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      {/* Grid */}
      <div role="grid" aria-label={`Availability for ${monthLabel}`} ref={gridRef} onKeyDown={onKeyDown}>
        <div role="row" className="grid grid-cols-7">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              role="columnheader"
              className="pb-2 text-center font-sans text-[0.62rem] uppercase tracking-[0.12em] text-taupe"
            >
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1" role="rowgroup">
          {cells.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} role="gridcell" aria-hidden="true" />;
            const date = iso(year, month, day);
            const status = slots[date];
            const isPast = date < todayIso;
            const meta = status ? STATUS_META[status] : null;
            const isFocusable = date === focusDate;
            return (
              <div role="gridcell" key={date}>
                <button
                  data-date={date}
                  type="button"
                  tabIndex={isFocusable ? 0 : -1}
                  disabled={isPast}
                  onFocus={() => setFocusDate(date)}
                  aria-label={
                    isPast
                      ? `${day} ${monthLabel}, past date`
                      : `${day} ${monthLabel}, ${meta?.label ?? "availability unknown"}`
                  }
                  className={cn(
                    "flex aspect-square w-full flex-col items-center justify-center gap-0.5 rounded-[3px] border text-center transition-colors",
                    isPast
                      ? "border-transparent text-taupe/40"
                      : "border-champagne/60 hover:border-gold focus-visible:border-gold",
                    isFocusable && !isPast && "ring-1 ring-gold",
                  )}
                >
                  <span className="font-sans text-[0.82rem] text-ink">{day}</span>
                  {meta && !isPast && (
                    <span className="flex items-center gap-0.5">
                      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
                      <span aria-hidden="true" className="text-[0.55rem] text-taupe">{meta.icon}</span>
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend (text + icon + colour) */}
      <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-champagne pt-4">
        {(Object.keys(STATUS_META) as Status[]).map((s) => (
          <li key={s} className="flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
            <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", STATUS_META[s].dot)} />
            <span aria-hidden="true">{STATUS_META[s].icon}</span>
            {STATUS_META[s].label}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[0.72rem] text-taupe">
        Availability is indicative — enquire to confirm your date.
      </p>
    </div>
  );
}
