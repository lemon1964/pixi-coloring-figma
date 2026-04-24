"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/coloring/Breadcrumbs";
import ColoringIntro from "@/components/coloring/ColoringIntro";
import Palette from "@/components/coloring/Palette";
import TopBar from "@/components/coloring/TopBar";
import ColoringCanvas from "@/components/pixi/ColoringCanvas";
import type { ColoringItemConfig } from "@/data/coloring/coloringItems";
import { getColoringTopicBySlug } from "@/data/coloring/coloringTopics";
import { defaultPalette } from "@/data/coloring/defaultPalette";
import { loadColoringItemTask } from "@/lib/coloring/loadColoringItemTask";

interface ColoringWorkspaceProps {
  item: ColoringItemConfig;
}

export default function ColoringWorkspace({
  item,
}: ColoringWorkspaceProps) {
  const router = useRouter();
  const topic = getColoringTopicBySlug(item.topicSlug);

  const [selectedColor, setSelectedColor] = useState<number>(
    defaultPalette[0]?.hex ?? 0xff0000
  );
  const [task, setTask] = useState<ColoringTask | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      const loadedTask = await loadColoringItemTask(item);

      if (!isMounted) return;
      setTask(loadedTask);
    }

    run().catch((error) => {
      console.error("Failed to load coloring item", error);
    });

    return () => {
      isMounted = false;
    };
  }, [item]);

  return (
    <main className="mobile-safe min-h-screen bg-[#f7f4ef]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 sm:gap-5">
        <TopBar title={item.title} onBack={() => router.push(`/topic/${item.topicSlug}`)} />

        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            topic ? { label: topic.title, href: `/topic/${topic.slug}` } : { label: item.topicSlug },
            { label: item.title },
          ]}
        />

        <ColoringIntro item={item} />

        {!task ? (
          <div className="panel-surface rounded-2xl px-6 py-5 text-center">
            Загрузка...
          </div>
        ) : (
          <>
            <ColoringCanvas
              task={task}
              selectedColor={selectedColor}
              displayScale={item.displayScale ?? 1}
            />

            <Palette
              colors={task.colors}
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />
          </>
        )}
      </div>
    </main>
  );
}