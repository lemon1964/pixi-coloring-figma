import type { ColoringItemConfig } from "@/data/coloring/coloringItems";

interface ColoringIntroProps {
  item: ColoringItemConfig;
}

export default function ColoringIntro({ item }: ColoringIntroProps) {
  if (!item.introTitle && !item.introText) {
    return null;
  }

  return (
    <section className="kid-section rounded-3xl px-4 py-4 sm:px-5 sm:py-5">
      {item.introTitle ? (
        <h2 className="text-xl font-bold leading-tight text-stone-800 sm:text-2xl">
          {item.introTitle}
        </h2>
      ) : null}

      {item.introText ? (
        <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base">
          {item.introText}
        </p>
      ) : null}
    </section>
  );
}