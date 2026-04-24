import type { ColoringTopicConfig } from "@/data/coloring/coloringTopics";

interface TopicArticleProps {
  topic: ColoringTopicConfig;
}

export default function TopicArticle({ topic }: TopicArticleProps) {
  if (!topic.articleTitle && !topic.articleParagraphs?.length) {
    return null;
  }

  return (
    <section className="kid-section rounded-3xl px-5 py-5 sm:px-6 sm:py-6">
      {topic.articleTitle ? (
        <h2 className="text-xl font-bold text-stone-800 sm:text-2xl">
          {topic.articleTitle}
        </h2>
      ) : null}

      <div className="mt-4 space-y-4 text-sm leading-6 text-stone-600 sm:text-base">
        {topic.articleParagraphs?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}