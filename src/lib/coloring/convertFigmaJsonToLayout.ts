function sortNodeEntries(
    entries: Array<[string, FigmaCoordinateNode]>
  ): Array<[string, FigmaCoordinateNode]> {
    return [...entries].sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
  }
  
  function round(value: number): number {
    return Math.round(value);
  }
  
  export function convertFigmaJsonToLayout(
    figmaJson: FigmaCoordinateExport,
    options: ConvertFigmaJsonOptions
  ): ColoringLayout {
    const {
      taskId,
      frameName,
      strokeFile,
      segmentPrefix = "seg",
    } = options;
  
    const resolvedFrameName = frameName ?? Object.keys(figmaJson)[0];
  
    if (!resolvedFrameName || !figmaJson[resolvedFrameName]) {
      throw new Error("Figma frame not found in coordinate export");
    }
  
    const frameNodes = figmaJson[resolvedFrameName];
    const nodeEntries = sortNodeEntries(Object.entries(frameNodes));
  
    if (nodeEntries.length === 0) {
      throw new Error("Figma frame contains no coordinate nodes");
    }
  
    const minX = Math.min(...nodeEntries.map(([, node]) => node.x));
    const minY = Math.min(...nodeEntries.map(([, node]) => node.y));
    const maxX = Math.max(...nodeEntries.map(([, node]) => node.x + node.width));
    const maxY = Math.max(...nodeEntries.map(([, node]) => node.y + node.height));
  
    const segments: ColoringLayoutSegment[] = nodeEntries.map(
      ([nodeId, node], index) => {
        const segIndex = index + 1;
        const segmentId = `${segmentPrefix}${segIndex}`;
  
        return {
          id: segmentId,
          file: `${segmentId}.png`,
          x: round(node.x - minX),
          y: round(node.y - minY),
          zIndex: segIndex,
        };
      }
    );
  
    const layout: ColoringLayout = {
      version: 1,
      taskId,
      frame: {
        width: round(maxX - minX),
        height: round(maxY - minY),
      },
      segments,
    };
  
    if (strokeFile) {
      layout.stroke = {
        file: strokeFile,
      };
    }
  
    return layout;
  }