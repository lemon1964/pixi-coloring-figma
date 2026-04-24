import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-stone-700">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-stone-600" : ""}>{item.label}</span>
              )}

              {!isLast ? <span className="text-stone-400">›</span> : null}
            </div>
          );
        })}
      </div>
    </nav>
  );
}