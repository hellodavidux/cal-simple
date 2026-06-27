import { type FormEvent, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { StartingHoursPreset } from "../types/schedule";
import { STARTING_HOURS_OPTIONS } from "../utils/schedulePresets";

type AddScheduleModalProps = {
  open: boolean;
  onClose: () => void;
  onContinue: (name: string, preset: StartingHoursPreset) => void;
};

export function AddScheduleModal({
  open,
  onClose,
  onContinue,
}: AddScheduleModalProps) {
  const [name, setName] = useState("Working hours");
  const [preset, setPreset] = useState<StartingHoursPreset>("morning");

  useEffect(() => {
    if (open) {
      setName("Working hours");
      setPreset("morning");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onContinue(name.trim() || "Working hours", preset);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-schedule-title"
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-cal-border bg-cal-elevated shadow-2xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            <h2
              id="add-schedule-title"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Add a new schedule
            </h2>

            <div className="space-y-2">
              <label
                htmlFor="schedule-name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                id="schedule-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-md border border-cal-border bg-cal-bg px-3 text-sm text-white placeholder:text-cal-subtle focus:border-zinc-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="starting-hours"
                className="block text-sm font-medium text-white"
              >
                Starting hours
              </label>
              <div className="relative">
                <select
                  id="starting-hours"
                  value={preset}
                  onChange={(e) =>
                    setPreset(e.target.value as StartingHoursPreset)
                  }
                  className="h-10 w-full appearance-none rounded-md border border-cal-border bg-cal-bg px-3 pr-10 text-sm text-white focus:border-zinc-500 focus:outline-none"
                >
                  {STARTING_HOURS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cal-muted" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-cal-border bg-cal-surface px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1.5 text-sm font-medium text-white transition hover:text-cal-muted"
            >
              Close
            </button>
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
