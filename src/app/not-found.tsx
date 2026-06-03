import Link from "next/link";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { Button } from "@/components/primitives/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="font-script text-[2.2rem] leading-none text-gold">Lost in the grounds</p>
      <h1 className="mt-4 font-display text-step-4 text-ink">404</h1>
      <FlourishDivider />
      <p className="max-w-md text-ink-soft">
        The page you&rsquo;re looking for has wandered off down the tree-lined drive. Let&rsquo;s
        find your way back.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Return home</Button>
        <Link
          href="/contact"
          className="font-sans text-[0.82rem] uppercase tracking-[0.16em] text-gold-deep underline-offset-4 hover:underline"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
