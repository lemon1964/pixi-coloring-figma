export interface ColoringItemConfig {
  slug: string;
  topicSlug: string;
  title: string;
  description?: string;
  introTitle?: string;
  introText?: string;
  jsonBasePath: string;
  figmaFile: string;
  assetBasePath: string;
  frameName: string;
  segmentPrefix?: string;
  displayScale?: number;
  framePadding?: number;
  reverseLayerOrder?: boolean;
  previewPath: string;
}

export const coloringItems: ColoringItemConfig[] = [
  {
    slug: "geometry",
    topicSlug: "geometry",
    title: "Геометрия",
    description: "Тестовый пакет без отдельного stroke",
    introTitle: "Простые фигуры для первых раскрасок",
    introText:
      "Эта раскраска подходит для самых первых занятий. Крупные формы и понятные границы помогают ребенку спокойно знакомиться с цветами и формами.",
    jsonBasePath: "/geometry",
    figmaFile: "coords.json",
    assetBasePath: "/geometry",
    frameName: "coloring",
    segmentPrefix: "seg",
    displayScale: 0.21,
    previewPath: "/previews/geometry-v2.png",
  },
  {
    slug: "turtle",
    topicSlug: "animals",
    title: "Черепаха",
    description: "Пакет из Figma с декоративным слоем",
    introTitle: "Добрая раскраска с черепахой",
    introText:
      "Можно раскрашивать черепаху в привычные или совсем сказочные цвета. Главное — чтобы ребенку было интересно и удобно попадать по крупным сегментам.",
    jsonBasePath: "/coloring-pack-1",
    figmaFile: "coords.json",
    assetBasePath: "/coloring-pack-1/turtle",
    frameName: "turtle",
    segmentPrefix: "seg",
    displayScale: 1.4,
    framePadding: 24,
    reverseLayerOrder: true,
    previewPath: "/previews/turtle-v2.png",
  },
  {
    slug: "rocket",
    topicSlug: "animals",
    title: "Ракета",
    description: "Раскраска из общего Figma JSON",
    introTitle: "Веселая раскраска с ракетой",
    introText:
      "Яркая ракета хорошо подходит для свободного выбора цветов. Можно раскрасить ее как настоящую или придумать собственный сказочный вариант.",
    jsonBasePath: "/coloring-pack-1",
    figmaFile: "coords.json",
    assetBasePath: "/coloring-pack-1/rocket",
    frameName: "rocket",
    segmentPrefix: "seg",
    displayScale: 1,
    framePadding: 24,
    reverseLayerOrder: true,
    previewPath: "/previews/rocket-v2.png",
  },
  {
    slug: "whale",
    topicSlug: "animals",
    title: "Кит",
    description: "Раскраска из общего Figma JSON",
    introTitle: "Веселая раскраска с китом",
    introText:
      "Кита можно раскрасить в голубой, фиолетовый, розовый или любой другой цвет. Простые крупные формы делают раскраску удобной и спокойной.",
    jsonBasePath: "/coloring-pack-1",
    figmaFile: "coords.json",
    assetBasePath: "/coloring-pack-1/whale",
    frameName: "whale",
    segmentPrefix: "seg",
    displayScale: 1,
    framePadding: 24,
    reverseLayerOrder: true,
    previewPath: "/previews/whale-v2.png",
  },
];

export function getColoringItemBySlug(slug: string): ColoringItemConfig | null {
  return coloringItems.find((item) => item.slug === slug) ?? null;
}

export function getColoringItemsByTopicSlug(
  topicSlug: string
): ColoringItemConfig[] {
  return coloringItems.filter((item) => item.topicSlug === topicSlug);
}