import { Sparkles } from "lucide-react";

type AskCalFabProps = {
  onClick: () => void;
};

export function AskCalFab({ onClick }: AskCalFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-lg border border-cal-border bg-cal-elevated px-3.5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-zinc-800"
    >
      <Sparkles className="h-4 w-4 text-cal-muted" />
      Ask Cal
    </button>
  );
}
