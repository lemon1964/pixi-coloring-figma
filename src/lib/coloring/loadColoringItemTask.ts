import { defaultPalette } from "@/data/coloring/defaultPalette";
import type { ColoringItemConfig } from "@/data/coloring/coloringItems";
import { buildColoringTask } from "@/lib/coloring/buildColoringTask";
import { convertFigmaJsonToLayout } from "@/lib/coloring/convertFigmaJsonToLayout";
import { fetchJson } from "@/lib/utils/fetchJson";

export async function loadColoringItemTask(
  item: ColoringItemConfig
): Promise<ColoringTask> {
  const figmaJson = await fetchJson<FigmaCoordinateExport>(
    `${item.jsonBasePath}/${item.figmaFile}`
  );

  const layout = convertFigmaJsonToLayout(figmaJson, {
    taskId: item.slug,
    frameName: item.frameName,
    segmentPrefix: item.segmentPrefix ?? "seg",
    framePadding: item.framePadding ?? 0,
    reverseLayerOrder: item.reverseLayerOrder ?? false,
  });

  return buildColoringTask(layout, item.assetBasePath, defaultPalette);
}