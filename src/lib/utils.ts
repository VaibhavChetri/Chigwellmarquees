/* Small, dependency-free helpers shared across the app. */

/** Join class names, dropping falsy values. Keeps client bundles lean (no clsx). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Normalise RichText (string | string[]) into an array of paragraphs. */
export function paragraphs(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/** UK-friendly absolute site URL builder (for canonical / OG). */
export function absoluteUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Format an ISO date as "31 December 2026" (en-GB). Deterministic — safe for
 *  SSR (depends only on the input, not the current time). */
export function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
