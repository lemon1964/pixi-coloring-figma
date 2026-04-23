export interface ColoringItemConfig {
    slug: string;
    title: string;
    description?: string;
    jsonBasePath: string;
    figmaFile: string;
    assetBasePath: string;
    frameName: string;
    segmentPrefix?: string;
    displayScale?: number;
    framePadding?: number;
    reverseLayerOrder?: boolean;
    previewPath?: string;
  }
  
  export const coloringItems: ColoringItemConfig[] = [
    {
      slug: "geometry",
      title: "Геометрия",
      description: "Тестовый пакет без отдельного stroke",
      jsonBasePath: "/geometry",
      figmaFile: "coords.json",
      assetBasePath: "/geometry",
      frameName: "coloring",
      segmentPrefix: "seg",
      displayScale: 0.21,
    },
    {
      slug: "turtle",
      title: "Черепаха",
      description: "Пакет из Figma с декоративным слоем",
      jsonBasePath: "/coloring-pack-1",
      figmaFile: "coords.json",
      assetBasePath: "/coloring-pack-1/turtle",
      frameName: "turtle",
    //   frameName: "canvas",
      segmentPrefix: "seg",
      displayScale: 1.4,
      framePadding: 24,
      reverseLayerOrder: true,
    },
    {
      slug: "rocket",
      title: "Ракета",
      description: "Раскраска из общего Figma JSON",
      jsonBasePath: "/coloring-pack-1",
      figmaFile: "coords.json",
      assetBasePath: "/coloring-pack-1/rocket",
      frameName: "rocket",
      segmentPrefix: "seg",
      displayScale: 1,
      framePadding: 24,
      reverseLayerOrder: true,
    },
    {
      slug: "whale",
      title: "Кит",
      description: "Раскраска из общего Figma JSON",
      jsonBasePath: "/coloring-pack-1",
      figmaFile: "coords.json",
      assetBasePath: "/coloring-pack-1/whale",
      frameName: "whale",
      segmentPrefix: "seg",
      displayScale: 1,
      framePadding: 24,
      reverseLayerOrder: true,
    },
  ];
  
  export function getColoringItemBySlug(slug: string): ColoringItemConfig | null {
    return coloringItems.find((item) => item.slug === slug) ?? null;
  }