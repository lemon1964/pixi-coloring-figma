import { demoSets, type DemoSetConfig } from "@/data/coloring/demoSets";
import { defaultPalette } from "@/data/coloring/defaultPalette";
import { buildColoringTask } from "@/lib/coloring/buildColoringTask";
import { convertFigmaJsonToLayout } from "@/lib/coloring/convertFigmaJsonToLayout";
import { fetchJson } from "@/lib/utils/fetchJson";

export async function loadColoringTask(
  demoSet: DemoSetConfig
): Promise<ColoringTask> {
  let layout: ColoringLayout;

  if (demoSet.sourceType === "figma-json") {
    const figmaJson = await fetchJson<FigmaCoordinateExport>(
      `${demoSet.basePath}/${demoSet.figmaFile ?? "figma-coordinates.json"}`
    );

    layout = convertFigmaJsonToLayout(figmaJson, {
      taskId: demoSet.id,
      frameName: demoSet.frameName,
      strokeFile: demoSet.strokeFile,
      segmentPrefix: demoSet.segmentPrefix ?? "seg",
      framePadding: demoSet.framePadding ?? 0,
      zIndexOverrides: demoSet.zIndexOverrides,
    });
  } else {
    layout = await fetchJson<ColoringLayout>(
      `${demoSet.basePath}/${demoSet.layoutFile ?? "layout.json"}`
    );
  }

  return buildColoringTask(layout, demoSet.basePath, defaultPalette);
}

export function getDemoSetById(id: string): DemoSetConfig {
  return demoSets.find((item) => item.id === id) ?? demoSets[0];
}