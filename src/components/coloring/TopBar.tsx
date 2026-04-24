"use client";

import { useRouter } from "next/navigation";

interface TopBarProps {
  title: string;
  onBack?: () => void;
}

export default function TopBar({ title, onBack }: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  };

  return (
    <header className="kid-topbar rounded-2xl px-3 py-3 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-stone-800">
          <span className="text-lg">🐝</span>
          <span className="text-base font-bold sm:text-lg">кидби</span>
        </div>

        <button
          type="button"
          onClick={handleBack}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm"
        >
          Назад
        </button>
      </div>

      <div className="mt-3 border-t border-dashed border-stone-300 pt-3">
        <h1 className="text-base font-semibold text-stone-700 sm:text-lg">
          {title}
        </h1>
      </div>
    </header>
  );
}