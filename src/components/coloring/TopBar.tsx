interface TopBarProps {
  title: string;
  canSpread: boolean;
  testSpread: boolean;
  onToggleSpread: () => void;
}

export default function TopBar({
  title,
  canSpread,
  testSpread,
  onToggleSpread,
}: TopBarProps) {
  return (
    <div className="panel-surface w-full px-3 py-3 sm:px-4">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
        <button className="rounded-lg bg-white px-3 py-2 text-sm text-gray-500 shadow sm:px-4">
          Назад
        </button>

        <h1 className="text-center text-sm font-semibold text-gray-500 sm:text-lg">
          {title}
        </h1>

        <button
          type="button"
          onClick={onToggleSpread}
          disabled={!canSpread}
          className="rounded-lg bg-white px-3 py-2 text-sm text-gray-500 shadow disabled:opacity-40 sm:px-4"
        >
          {testSpread ? "Собрать" : "Раздвинуть"}
        </button>
      </div>
    </div>
  );
}