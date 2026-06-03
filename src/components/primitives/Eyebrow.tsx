import { cn } from "@/lib/utils";

/* Plain uppercase label eyebrow (§3.2). For the romantic script variant use
   ScriptEyebrow from the ornament system instead. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h2";
}) {
  return (
    <Tag
      className={cn(
        "font-sans text-[0.72rem] uppercase tracking-[0.18em] text-taupe",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
