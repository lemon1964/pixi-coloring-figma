import type { DemoSetConfig } from "@/data/coloring/demoSets";

interface DemoSetSwitchProps {
  items: DemoSetConfig[];
  activeSetId: string;
  onSelect: (id: string) => void;
}

export default function DemoSetSwitch({
  items,
  activeSetId,
  onSelect,
}: DemoSetSwitchProps) {
  return (
    <div className="panel-surface w-full px-3 py-3 sm:px-4">
      <div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs text-gray-600 shadow sm:px-4 sm:py-2 sm:text-sm"
            style={{
              outline: activeSetId === item.id ? "2px solid #111" : "none",
            }}
          >
            {item.buttonLabel}
          </button>
        ))}
      </div>
    </div>
  );
}