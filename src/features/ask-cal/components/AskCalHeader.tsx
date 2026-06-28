import { Maximize2, Minus, X } from "lucide-react";
import { IconButton } from "../../../components/ui/IconButton";

type AskCalHeaderProps = {
  title: string;
  expanded: boolean;
  onMinimize: () => void;
  onToggleExpand: () => void;
  onClose: () => void;
};

export function AskCalHeader({
  title,
  expanded,
  onMinimize,
  onToggleExpand,
  onClose,
}: AskCalHeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#2a2a2a] px-4 py-3">
      <h2 className="truncate text-sm font-medium text-white">{title}</h2>
      <div className="flex items-center gap-0.5">
        <IconButton
          label="Minimize"
          onClick={onMinimize}
          className="p-1.5 text-cal-subtle hover:bg-white/5 hover:text-cal-muted"
        >
          <Minus className="h-3.5 w-3.5" />
        </IconButton>
        <IconButton
          label={expanded ? "Restore" : "Expand"}
          onClick={onToggleExpand}
          className="p-1.5 text-cal-subtle hover:bg-white/5 hover:text-cal-muted"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </IconButton>
        <IconButton
          label="Close"
          onClick={onClose}
          className="p-1.5 text-cal-subtle hover:bg-white/5 hover:text-cal-muted"
        >
          <X className="h-3.5 w-3.5" />
        </IconButton>
      </div>
    </header>
  );
}
