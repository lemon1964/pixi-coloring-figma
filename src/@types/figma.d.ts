type FigmaCoordinateNodeType =
  | "RECTANGLE"
  | "ELLIPSE"
  | "POLYGON"
  | "VECTOR"
  | "STAR"
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
}