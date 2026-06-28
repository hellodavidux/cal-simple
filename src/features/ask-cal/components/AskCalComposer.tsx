import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUp,
  Box,
  ChevronDown,
  Paperclip,
  Scan,
} from "lucide-react";
import { IconButton } from "../../../components/ui/IconButton";

type AskCalComposerProps = {
  hasMessages: boolean;
  isThinking: boolean;
  onSend: (message: string) => void;
  autoFocus?: boolean;
  /** Controlled value — when provided the component is fully controlled (Remotion / agent mode). */
  value?: string;
  /** Required when `value` is provided. */
  onValueChange?: (v: string) => void;
};

export function AskCalComposer({
  hasMessages,
  isThinking,
  onSend,
  autoFocus = false,
  value,
  onValueChange,
}: AskCalComposerProps) {
  const [internalInput, setInternalInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = value !== undefined;
  const effectiveValue = isControlled ? value : internalInput;

  useEffect(() => {
    if (autoFocus) {
      textareaRef.current?.focus();
    }
  }, [autoFocus]);

  const submit = () => {
    const trimmed = effectiveValue.trim();
    if (!trimmed || isThinking) return;
    onSend(trimmed);
    if (!isControlled) setInternalInput("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (isControlled) {
      onValueChange?.(event.target.value);
    } else {
      setInternalInput(event.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shrink-0 border-t border-[#2a2a2a] p-3">
      <div className="rounded-lg border border-[#333] bg-[#1a1a1a]">
        <textarea
          ref={textareaRef}
          value={effectiveValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={
            hasMessages
              ? "Reply…"
              : "Ask about bookings, links, or availability…"
          }
          rows={2}
          disabled={isThinking}
          className="w-full resize-none bg-transparent px-3.5 pt-3 pb-1 text-sm text-white placeholder:text-cal-subtle focus:outline-none disabled:opacity-60"
        />
        <div className="flex items-center justify-between px-2 pb-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-cal-subtle transition hover:bg-white/5 hover:text-cal-muted"
          >
            <Box className="h-3.5 w-3.5" />
            Skills
            <ChevronDown className="h-3 w-3" />
          </button>
          <div className="flex items-center gap-1">
            {!hasMessages && (
              <IconButton
                label="Focus"
                className="p-1.5 text-cal-subtle hover:bg-white/5 hover:text-cal-muted"
              >
                <Scan className="h-4 w-4" />
              </IconButton>
            )}
            <IconButton
              label="Attach file"
              className="p-1.5 text-cal-subtle hover:bg-white/5 hover:text-cal-muted"
            >
              <Paperclip className="h-4 w-4" />
            </IconButton>
            <button
              type="submit"
              disabled={!effectiveValue.trim() || isThinking}
              className="ml-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#3a3a3a] text-white transition hover:bg-[#4a4a4a] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
