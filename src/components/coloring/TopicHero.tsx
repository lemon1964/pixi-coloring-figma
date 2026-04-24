import type { ColoringTopicConfig } from "@/data/coloring/coloringTopics";

interface TopicHeroProps {
  topic: ColoringTopicConfig;
}

export default function TopicHero({ topic }: TopicHeroProps) {
  return (
    <section className="kid-section rounded-3xl px-5 py-5 sm:px-6 sm:py-6">
      <div className="max-w-3xl">
        <p className="kid-eyebrow">Онлайн-раскраски</p>

        <h1 className="mt-2 text-2xl font-bold leading-tight text-stone-800 sm:text-3xl">
          {topic.heroTitle}
        </h1>

        <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base">
          {topic.heroText}
        </p>
      </div>
    </section>
  );
}