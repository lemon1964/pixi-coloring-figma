import Link from "next/link";
import type { ColoringItemConfig } from "@/data/coloring/coloringItems";

interface ColoringCatalogCardProps {
  item: ColoringItemConfig;
}

export default function ColoringCatalogCard({
  item,
}: ColoringCatalogCardProps) {
  return (
    <Link
      href={`/coloring/${item.slug}`}
      className="panel-surface block overflow-hidden rounded-2xl p-3 transition-transform hover:scale-[1.01]"
    >
      <div className="flex min-h-35 flex-col justify-between rounded-xl bg-neutral-100 p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">{item.title}</h2>
          {item.description ? (
            <p className="mt-2 text-sm text-gray-500">{item.description}</p>
          ) : null}
        </div>

        <div className="mt-4 text-sm font-medium text-gray-500">
          Открыть раскраску
        </div>
      </div>
    </Link>
  );
}