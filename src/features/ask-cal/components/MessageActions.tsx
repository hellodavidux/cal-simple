import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import type { MessageFeedback } from "../../../types/askCal";
import { IconButton } from "../../../components/ui/IconButton";

type MessageActionsProps = {
  content: string;
  feedback: MessageFeedback | null;
  onFeedback: (value: MessageFeedback) => void;
};

export function MessageActions({
  content,
  feedback,
  onFeedback,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content.replace(/\*\*/g, ""));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="absolute -bottom-7 left-0 flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
      <IconButton
        label="Helpful"
        onClick={() => onFeedback("up")}
        className={`p-1 hover:bg-white/10 ${
          feedback === "up" ? "text-white" : "text-cal-subtle hover:text-cal-muted"
        }`}
      >
        <ThumbsUp
          className={`h-3.5 w-3.5 ${feedback === "up" ? "fill-current" : ""}`}
        />
      </IconButton>
      <IconButton
        label="Not helpful"
        onClick={() => onFeedback("down")}
        className={`p-1 hover:bg-white/10 ${
          feedback === "down"
            ? "text-white"
            : "text-cal-subtle hover:text-cal-muted"
        }`}
      >
        <ThumbsDown
          className={`h-3.5 w-3.5 ${feedback === "down" ? "fill-current" : ""}`}
        />
      </IconButton>
      <IconButton
        label="Copy"
        onClick={handleCopy}
        className="p-1 text-cal-subtle hover:bg-white/10 hover:text-cal-muted"
      >
        <Copy className="h-3.5 w-3.5" />
      </IconButton>
      {copied && (
        <span className="ml-1 text-[11px] text-cal-subtle">Copied</span>
      )}
    </div>
  );
}
