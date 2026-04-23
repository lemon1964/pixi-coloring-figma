export type DemoSetSourceType = "project-layout" | "figma-json";

export interface DemoSetConfig {
  id: string;
  title: string;
  buttonLabel: string;
  basePath: string;
  displayScale?: number;
  sourceType: DemoSetSourceType;
  layoutFile?: string;
  figmaFile?: string;
  frameName?: string;
  strokeFile?: string;
  segmentPrefix?: string;
  framePadding?: number;
  zIndexOverrides?: Record<string, number>;
  reverseLayerOrder?: boolean;
}

export const demoSets: DemoSetConfig[] = [
  {
    id: "figma-ready",
    title: "Готовая Figma",
    buttonLabel: "готовая Figma",
    basePath: "/demo-coloring",
    displayScale: 1,
    sourceType: "project-layout",
    layoutFile: "layout.json",
  },
  {
    id: "geometry",
    title: "Geometry без stroke",
    buttonLabel: "geometry без stroke",
    basePath: "/geometry",
    displayScale: 0.21,
    sourceType: "figma-json",
    figmaFile: "figma-coordinates.json",
    frameName: "coloring",
    segmentPrefix: "seg",
  },
  {
    id: "turtle",
    title: "Turtle",
    buttonLabel: "turtle",
    basePath: "/turtle",
    displayScale: 1.4,
    sourceType: "figma-json",
    figmaFile: "coords.json",
    frameName: "canvas",
    segmentPrefix: "seg",
    framePadding: 24,
    reverseLayerOrder: true,
  },
];