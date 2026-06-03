"use client";

import { useEffect } from "react";

import { Button } from "@/components/primitives/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: report to monitoring (Sentry/Vercel) when wired.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="font-script text-[2rem] leading-none text-gold">A small hiccup</p>
      <h1 className="mt-4 font-display text-step-3 text-ink">Something went awry.</h1>
      <p className="mt-4 max-w-md text-ink-soft">
        Please try again. If it keeps happening, do get in touch and we&rsquo;ll help personally.
      </p>
      <div className="mt-8">
        <Button onClick={reset}>Try again</Button>
      </div>
    </section>
  );
}
