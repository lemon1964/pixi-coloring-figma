"use client";

import { useEffect, useMemo, useState } from "react";
import DemoSetSwitch from "@/components/coloring/DemoSetSwitch";
import Palette from "@/components/coloring/Palette";
import TopBar from "@/components/coloring/TopBar";
import ColoringCanvas from "@/components/pixi/ColoringCanvas";
import { demoSets } from "@/data/coloring/demoSets";
import { defaultPalette } from "@/data/coloring/defaultPalette";
import { getDemoSetById, loadColoringTask } from "@/lib/coloring/loadColoringTask";

const debugPositions: ColoringDebugPositions = {
  seg1: { x: 20, y: 0 },
  seg2: { x: 20, y: 40 },
  seg3: { x: 20, y: 90 },
  seg5: { x: 20, y: 150 },
  seg6: { x: 20, y: 210 },
};

export default function DemoColoringPage() {
  const [activeSetId, setActiveSetId] = useState<string>("figma-ready");
  const [testSpread, setTestSpread] = useState(true);
  const [selectedColor, setSelectedColor] = useState<number>(
    defaultPalette[0]?.hex ?? 0xff0000
  );
  const [task, setTask] = useState<ColoringTask | null>(null);

  const activeSet = useMemo(() => getDemoSetById(activeSetId), [activeSetId]);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      const loadedTask = await loadColoringTask(activeSet);

      if (!isMounted) return;

      setTask(loadedTask);
    }

    run().catch((error) => {
      console.error("Failed to load coloring task", error);
    });

    return () => {
      isMounted = false;
    };
  }, [activeSet]);

  const canSpread = activeSet.id === "figma-ready";

  return (
    <main className="min-h-screen bg-neutral-100 p-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
        <TopBar
          title={activeSet.title}
          canSpread={canSpread}
          testSpread={testSpread}
          onToggleSpread={() => setTestSpread((prev) => !prev)}
        />

        <DemoSetSwitch
          items={demoSets}
          activeSetId={activeSetId}
          onSelect={setActiveSetId}
        />

        {!task ? (
          <div className="rounded-lg bg-white px-6 py-4 shadow">Загрузка...</div>
        ) : (
          <>
            <ColoringCanvas
              task={task}
              selectedColor={selectedColor}
              testSpread={canSpread ? testSpread : false}
              debugPositions={canSpread ? debugPositions : undefined}
              displayScale={activeSet.displayScale ?? 1}
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