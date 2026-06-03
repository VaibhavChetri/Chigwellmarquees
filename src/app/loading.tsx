/* Elegant global loading skeleton (§8). Calm, on-brand, no spinner jank. */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory">
      <div className="flex flex-col items-center gap-4">
        <span className="font-script text-[2.4rem] leading-none text-gold/70">
          The Chigwell Marquees
        </span>
        <span className="h-px w-24 animate-pulse bg-champagne" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
