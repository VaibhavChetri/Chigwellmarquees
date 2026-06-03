/* Fonts via next/font (§3.2): self-hosted, subset, display:swap.
   - Display: Fraunces (variable serif, romantic italic)
   - UI/body: Geist Sans (self-hosted via the `geist` package)
   - Script accent: Pinyon Script (script eyebrow + host signature only) */
import { GeistSans } from "geist/font/sans";
import { Fraunces, Pinyon_Script } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

export const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-pinyon",
});

/** GeistSans already exposes `--font-geist-sans`; re-exported for clarity. */
export const geistSans = GeistSans;
