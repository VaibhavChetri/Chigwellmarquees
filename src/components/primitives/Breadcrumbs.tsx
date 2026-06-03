import Link from "next/link";

/* Accessible breadcrumb trail (§5). The matching BreadcrumbList JSON-LD is
   emitted by each page via lib/seo. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <div className="border-b border-champagne bg-ivory">
      <nav aria-label="Breadcrumb" className="container-edge py-4">
        <ol className="flex flex-wrap items-center gap-2 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-taupe">
          {items.map((crumb, i) => {
            const last = i === items.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="hover:text-gold-deep">
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
