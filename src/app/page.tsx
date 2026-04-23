import ColoringCatalogCard from "@/components/coloring/ColoringCatalogCard";
import { coloringItems } from "@/data/coloring/coloringItems";

export default function HomePage() {
  return (
    <main className="mobile-safe min-h-screen bg-neutral-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="panel-surface rounded-2xl px-5 py-5 sm:px-6 sm:py-6">
          <h1 className="text-3xl font-bold text-gray-700">
            Раскраски онлайн для детей
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Тестовая витрина раскрасок из Figma. По клику открывается
            интерактивная страница раскраски в браузере.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coloringItems.map((item) => (
            <ColoringCatalogCard key={item.slug} item={item} />
          ))}
        </section>
      </div>
    </main>
  );
}