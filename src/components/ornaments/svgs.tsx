/* ============================================================================
   BOTANICAL SVG LINE-ART LIBRARY — §3.6.
   Hand-drawn-feel sprigs, laurels, vines & a centred flourish. Stored in code
   as design-system assets (never in the CMS). Hairline stroke in --champagne /
   --sage; never filled. All decorative → aria-hidden at the usage site.
   Paths carry data-draw so the Botanical Bloom (.bloom.is-visible) can stroke
   them on. Pure presentational — safe in Server Components.
   ============================================================================ */

type OrnamentProps = {
  className?: string;
  /** Stroke colour token; defaults to champagne hairline. */
  stroke?: string;
  strokeWidth?: number;
};

const base = (stroke = "var(--champagne)", strokeWidth = 1.25) => ({
  fill: "none",
  stroke,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** A single delicate sprig — used in the ScriptEyebrow. */
export function Sprig({ className, stroke, strokeWidth }: OrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 24"
      width="64"
      height="24"
      aria-hidden="true"
      focusable="false"
    >
      <g {...base(stroke, strokeWidth)} style={{ ["--draw-len" as string]: "120" }}>
        <path data-draw d="M2 12 H40" />
        <path data-draw d="M40 12 q6 -6 12 -4" />
        <path data-draw d="M40 12 q6 6 12 4" />
        <path data-draw d="M22 12 q-3 -5 -8 -6" />
        <path data-draw d="M30 12 q-3 5 -8 6" />
        <circle data-draw cx="54" cy="9" r="1.6" />
        <circle data-draw cx="54" cy="15" r="1.6" />
      </g>
    </svg>
  );
}

/** A symmetrical laurel pair flanking a centred flourish (FlourishDivider). */
export function Flourish({ className, stroke, strokeWidth }: OrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 40"
      width="240"
      height="40"
      aria-hidden="true"
      focusable="false"
    >
      <g {...base(stroke, strokeWidth)} style={{ ["--draw-len" as string]: "320" }}>
        {/* left vine */}
        <path data-draw d="M10 20 C50 20 70 12 104 20" />
        <path data-draw d="M40 20 q-4 -7 -12 -8" />
        <path data-draw d="M58 20 q-4 -7 -12 -8" />
        <path data-draw d="M76 20 q-4 -7 -12 -8" />
        {/* centre bloom */}
        <path data-draw d="M120 8 C112 14 112 26 120 32 C128 26 128 14 120 8 Z" />
        <circle data-draw cx="120" cy="20" r="2" />
        {/* right vine (mirror) */}
        <path data-draw d="M230 20 C190 20 170 12 136 20" />
        <path data-draw d="M200 20 q4 -7 12 -8" />
        <path data-draw d="M182 20 q4 -7 12 -8" />
        <path data-draw d="M164 20 q4 -7 12 -8" />
      </g>
    </svg>
  );
}

/** A corner vine for hero / card corners (OrnamentCorner). */
export function CornerVine({ className, stroke, strokeWidth }: OrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      width="120"
      height="120"
      aria-hidden="true"
      focusable="false"
    >
      <g {...base(stroke, strokeWidth)} style={{ ["--draw-len" as string]: "260" }}>
        <path data-draw d="M6 6 C6 48 24 78 70 96 C92 104 104 110 114 114" />
        <path data-draw d="M22 40 q-9 -3 -14 -12" />
        <path data-draw d="M38 64 q-9 0 -16 -8" />
        <path data-draw d="M60 84 q-6 5 -16 6" />
        <path data-draw d="M84 98 q-4 7 -13 9" />
        <circle data-draw cx="10" cy="10" r="1.6" />
        <circle data-draw cx="112" cy="112" r="1.6" />
      </g>
    </svg>
  );
}
