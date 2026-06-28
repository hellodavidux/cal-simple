type Segment<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  segments: Segment<T>[];
};

export function SegmentedControl<T extends string>({
  value,
  onChange,
  segments,
}: SegmentedControlProps<T>) {
  return (
    <div
      className="flex rounded-md border border-cal-border bg-cal-bg p-0.5"
      role="tablist"
    >
      {segments.map((segment) => (
        <button
          key={segment.value}
          type="button"
          role="tab"
          aria-selected={value === segment.value}
          onClick={() => onChange(segment.value)}
          className={`rounded px-3 py-1.5 text-sm font-medium transition ${
            value === segment.value
              ? "bg-cal-elevated text-white shadow-sm"
              : "text-cal-muted hover:text-white"
          }`}
        >
          {segment.label}
        </button>
      ))}
    </div>
  );
}
