interface PaletteProps {
  colors: ColoringPaletteColor[];
  selectedColor: number;
  onSelect: (color: number) => void;
}

export default function Palette({
  colors,
  selectedColor,
  onSelect,
}: PaletteProps) {
  return (
    <div className="palette-dock w-full">
      <div className="panel-surface w-full px-3 py-3 sm:px-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onSelect(color.hex)}
              className="h-10 w-10 rounded-full border-2 border-white shadow sm:h-11 sm:w-11"
              style={{
                backgroundColor: color.css,
                outline: selectedColor === color.hex ? "3px solid #111" : "none",
              }}
              aria-label={color.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}