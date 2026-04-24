import { notFound } from "next/navigation";
import ColoringCatalogCard from "@/components/coloring/ColoringCatalogCard";
import TopBar from "@/components/coloring/TopBar";
import TopicArticle from "@/components/coloring/TopicArticle";
import TopicHero from "@/components/coloring/TopicHero";
import { getColoringItemsByTopicSlug } from "@/data/coloring/coloringItems";
import { getColoringTopicBySlug } from "@/data/coloring/coloringTopics";

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;

  const topic = getColoringTopicBySlug(slug);
  if (!topic) {
    notFound();
  }

  const items = getColoringItemsByTopicSlug(slug);

  return (
    <main className="mobile-safe min-h-screen bg-[#f7f4ef]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-5">
        <TopBar title={topic.title} />

        <TopicHero topic={topic} />

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ColoringCatalogCard key={item.slug} item={item} />
          ))}
        </section>

        <TopicArticle topic={topic} />
      </div>
    </main>
  );
}