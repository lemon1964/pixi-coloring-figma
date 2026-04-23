export const buildColoringTask = (
  layout: ColoringLayout,
  basePath: string,
  colors: ColoringPaletteColor[]
): ColoringTask => {
  return {
    stroke: layout.stroke?.file ? `${basePath}/${layout.stroke.file}` : undefined,
    width: layout.frame.width,
    height: layout.frame.height,
    colors,
    segments: [...layout.segments]
      .sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
      .map((segment) => ({
        id: segment.id,
        texture: `${basePath}/${segment.file}`,
        x: segment.x,
        y: segment.y,
        zIndex: segment.zIndex,
        interactive: segment.interactive,
      })),
  };
};