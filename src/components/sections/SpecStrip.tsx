/* SPEC STRIP (§Page 02 §3) — specs[] as an elegant data row (seated/standing
   capacity, dimensions, climate, AV/staging). Gilded hairline dividers; stacks
   to rows on mobile. Server component. */
export function SpecStrip({ specs }: { specs: { label: string; value: string }[] }) {
  if (specs.length === 0) return null;
  return (
    <dl className="grid grid-cols-1 divide-y divide-champagne border-y border-champagne sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
      {specs.map((spec, i) => (
        <div
          key={spec.label}
          className="flex flex-col gap-2 px-2 py-7 sm:px-7"
          style={{ borderColor: "var(--champagne)" }}
          data-index={i}
        >
          <dt className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-taupe">
            {spec.label}
          </dt>
          <dd className="font-display text-step-1 text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
