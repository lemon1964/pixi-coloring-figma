interface ColoringLayoutFrame {
  width: number;
  height: number;
}

interface ColoringLayoutStroke {
  file: string;
}

interface ColoringLayoutSegment {
  id: string;
  file: string;
  x: number;
  y: number;
  zIndex?: number;
}

interface ColoringLayout {
  version: number;
  taskId: string;
  frame: ColoringLayoutFrame;
  stroke?: ColoringLayoutStroke;
  segments: ColoringLayoutSegment[];
}

interface ColoringSegment {
  id: string;
  texture: string;
  x: number;
  y: number;
  zIndex?: number;
}

interface ColoringPaletteColor {
  id: string;
  hex: number;
  css: string;
}

interface ColoringTask {
  stroke?: string;
  segments: ColoringSegment[];
  colors: ColoringPaletteColor[];
  width: number;
  height: number;
}

type ColoringDebugPositions = Record<
  string,
  {
    x: number;
    y: number;
  }
>;

interface ColoringLayoutFrame {
  width: number;
  height: number;
}

interface ColoringLayoutStroke {
  file: string;
}

interface ColoringLayoutSegment {
  id: string;
  file: string;
  x: number;
  y: number;
  zIndex?: number;
  interactive?: boolean;
}

interface ColoringLayout {
  version: number;
  taskId: string;
  frame: ColoringLayoutFrame;
  stroke?: ColoringLayoutStroke;
  segments: ColoringLayoutSegment[];
}

interface ColoringSegment {
  id: string;
  texture: string;
  x: number;
  y: number;
  zIndex?: number;
  interactive?: boolean;
}

interface ColoringPaletteColor {
  id: string;
  hex: number;
  css: string;
}

interface ColoringTask {
  stroke?: string;
  segments: ColoringSegment[];
  colors: ColoringPaletteColor[];
  width: number;
  height: number;
}

type ColoringDebugPositions = Record<
  string,
  {
    x: number;
    y: number;
  }
>;