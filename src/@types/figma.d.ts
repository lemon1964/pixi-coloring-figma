type FigmaCoordinateNodeType =
  | "RECTANGLE"
  | "ELLIPSE"
  | "POLYGON"
  | "VECTOR"
  | "STAR"
  | "GROUP"
  | string;

interface FigmaCoordinateNode {
  x: number;
  y: number;
  width: number;
  height: number;
  type: FigmaCoordinateNodeType;
  isAsset?: boolean;
}

type FigmaCoordinateFrameNodes = Record<string, FigmaCoordinateNode>;

type FigmaCoordinateExport = Record<string, FigmaCoordinateFrameNodes>;

interface ConvertFigmaJsonOptions {
  taskId: string;
  frameName?: string;
  strokeFile?: string;
  segmentPrefix?: string;
  framePadding?: number;
  zIndexOverrides?: Record<string, number>;
}