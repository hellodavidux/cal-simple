import { SUGGESTED_PROMPTS } from "../constants";

type SuggestedPromptsProps = {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
};

export function SuggestedPrompts({ onSelect, disabled }: SuggestedPromptsProps) {
  return (
    <div className="mb-auto space-y-3 pt-2">
      <p className="text-sm text-cal-subtle">
        Ask about bookings, availability, or your event types.
      </p>
      <div className="flex flex-col gap-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(prompt)}
            className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2.5 text-left text-sm text-cal-muted transition hover:border-[#3a3a3a] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
