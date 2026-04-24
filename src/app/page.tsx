import TopicCatalogCard from "@/components/coloring/TopicCatalogCard";
import { coloringTopics } from "@/data/coloring/coloringTopics";

export default function HomePage() {
  return (
    <main className="mobile-safe min-h-screen bg-[#f7f4ef]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 sm:gap-6">
        <section className="kid-section rounded-3xl px-5 py-6 sm:px-6 sm:py-7">
          <div className="max-w-3xl">
            <p className="kid-eyebrow">Kid coloring sandbox</p>

            <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-800 sm:text-4xl">
              Раскраски онлайн для детей
            </h1>

            <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base">
              Выберите тему, откройте раскраску и раскрашивайте прямо в браузере.
              Это тестовая площадка для пакетов из Figma и будущей интеграции в
              Kidbe.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coloringTopics.map((topic) => (
            <TopicCatalogCard key={topic.slug} topic={topic} />
          ))}
        </section>
      </div>
    </main>
  );
}