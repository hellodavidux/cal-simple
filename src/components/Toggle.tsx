type ToggleProps = {
  enabled: boolean;
  onChange?: (enabled: boolean) => void;
};

export function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange?.(!enabled)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
        enabled ? "bg-white" : "bg-zinc-600"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full transition-transform ${
          enabled
            ? "translate-x-[18px] bg-black"
            : "translate-x-0.5 bg-zinc-300"
        }`}
      />
    </button>
  );
}
