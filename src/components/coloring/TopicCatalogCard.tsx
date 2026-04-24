import Image from "next/image";
import Link from "next/link";
import type { ColoringTopicConfig } from "@/data/coloring/coloringTopics";

interface TopicCatalogCardProps {
  topic: ColoringTopicConfig;
}

export default function TopicCatalogCard({ topic }: TopicCatalogCardProps) {
  return (
    <Link
      href={`/topic/${topic.slug}`}
      className="kid-card group block overflow-hidden rounded-3xl p-3 sm:p-4"
    >
      <div className="overflow-hidden rounded-2xl bg-stone-100">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
          <Image
            loading="eager"
            src={topic.previewPath}
            alt={topic.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </div>

      <div className="px-1 pt-4">
        <h2 className="text-base font-semibold text-stone-800 sm:text-lg">
          {topic.title}
        </h2>

        {topic.description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-stone-600">
            {topic.description}
          </p>
        ) : null}

        <div className="mt-4 inline-flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800">
          Открыть тему
        </div>
      </div>
    </Link>
  );
}