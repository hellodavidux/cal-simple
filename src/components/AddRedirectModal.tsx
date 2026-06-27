import { type FormEvent, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { teammates } from "../data/teammates";
import type { RedirectMode } from "../types/redirect";

type AddRedirectModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    startDate: string;
    endDate: string;
    mode: RedirectMode;
    colleagueId?: string;
    fallbackColleagueId?: string;
  }) => void;
};

const REDIRECT_MODES: { value: RedirectMode; label: string; description: string }[] =
  [
    {
      value: "specific",
      label: "Specific colleague",
      description: "Always redirect bookings to one person",
    },
    {
      value: "round-robin",
      label: "Round robin",
      description: "Rotate bookings across selected teammates",
    },
    {
      value: "first-available",
      label: "First available",
      description: "Send to whoever is free at booking time",
    },
  ];

export function AddRedirectModal({
  open,
  onClose,
  onSave,
}: AddRedirectModalProps) {
  const [name, setName] = useState("Out of office");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState<RedirectMode>("specific");
  const [colleagueId, setColleagueId] = useState(teammates[0]?.id ?? "");
  const [fallbackColleagueId, setFallbackColleagueId] = useState(
    teammates[1]?.id ?? "",
  );

  useEffect(() => {
    if (open) {
      setName("Out of office");
      setStartDate("");
      setEndDate("");
      setMode("specific");
      setColleagueId(teammates[0]?.id ?? "");
      setFallbackColleagueId(teammates[1]?.id ?? "");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave({
      name: name.trim() || "Out of office",
      startDate,
      endDate,
      mode,
      colleagueId: mode === "specific" ? colleagueId : undefined,
      fallbackColleagueId:
        mode === "first-available" ? fallbackColleagueId : undefined,
    });
  };

  const showColleaguePicker = mode === "specific" || mode === "round-robin";

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
        aria-labelledby="add-redirect-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-cal-border bg-cal-elevated shadow-2xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            <div>
              <h2
                id="add-redirect-title"
                className="text-lg font-semibold tracking-tight text-white"
              >
                Set up a redirect
              </h2>
              <p className="mt-1 text-sm text-cal-muted">
                While you&apos;re away, new bookings can be routed to a
                colleague or team.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="redirect-name"
                className="block text-sm font-medium text-white"
              >
                Label
              </label>
              <input
                id="redirect-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Summer vacation"
                className="h-10 w-full rounded-md border border-cal-border bg-cal-bg px-3 text-sm text-white placeholder:text-cal-subtle focus:border-zinc-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label
                  htmlFor="redirect-start"
                  className="block text-sm font-medium text-white"
                >
                  From
                </label>
                <input
                  id="redirect-start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-10 w-full rounded-md border border-cal-border bg-cal-bg px-3 text-sm text-white focus:border-zinc-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="redirect-end"
                  className="block text-sm font-medium text-white"
                >
                  To
                </label>
                <input
                  id="redirect-end"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-10 w-full rounded-md border border-cal-border bg-cal-bg px-3 text-sm text-white focus:border-zinc-500 focus:outline-none"
                />
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-white">
                Redirect logic
              </legend>
              <div className="space-y-2">
                {REDIRECT_MODES.map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer gap-3 rounded-lg border px-4 py-3 transition ${
                      mode === option.value
                        ? "border-zinc-500 bg-cal-bg"
                        : "border-cal-border hover:border-zinc-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="redirect-mode"
                      value={option.value}
                      checked={mode === option.value}
                      onChange={() => setMode(option.value)}
                      className="mt-0.5 accent-white"
                    />
                    <span>
                      <span className="block text-sm font-medium text-white">
                        {option.label}
                      </span>
                      <span className="block text-xs text-cal-muted">
                        {option.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {showColleaguePicker && (
              <div className="space-y-2">
                <label
                  htmlFor="redirect-colleague"
                  className="block text-sm font-medium text-white"
                >
                  {mode === "round-robin" ? "Team members" : "Colleague"}
                </label>
                {mode === "round-robin" ? (
                  <div className="space-y-2 rounded-md border border-cal-border bg-cal-bg p-3">
                    {teammates.map((teammate) => (
                      <label
                        key={teammate.id}
                        className="flex cursor-pointer items-center gap-3 text-sm"
                      >
                        <input
                          type="checkbox"
                          defaultChecked
                          className="accent-white"
                        />
                        <span className="text-white">{teammate.name}</span>
                        <span className="text-cal-muted">{teammate.email}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      id="redirect-colleague"
                      value={colleagueId}
                      onChange={(e) => setColleagueId(e.target.value)}
                      className="h-10 w-full appearance-none rounded-md border border-cal-border bg-cal-bg px-3 pr-10 text-sm text-white focus:border-zinc-500 focus:outline-none"
                    >
                      {teammates.map((teammate) => (
                        <option key={teammate.id} value={teammate.id}>
                          {teammate.name} ({teammate.email})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cal-muted" />
                  </div>
                )}
              </div>
            )}

            {mode === "first-available" && (
              <div className="space-y-2">
                <label
                  htmlFor="redirect-fallback"
                  className="block text-sm font-medium text-white"
                >
                  Fallback if no one is available
                </label>
                <div className="relative">
                  <select
                    id="redirect-fallback"
                    value={fallbackColleagueId}
                    onChange={(e) => setFallbackColleagueId(e.target.value)}
                    className="h-10 w-full appearance-none rounded-md border border-cal-border bg-cal-bg px-3 pr-10 text-sm text-white focus:border-zinc-500 focus:outline-none"
                  >
                    {teammates.map((teammate) => (
                      <option key={teammate.id} value={teammate.id}>
                        {teammate.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cal-muted" />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-cal-border bg-cal-surface px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1.5 text-sm font-medium text-white transition hover:text-cal-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Save redirect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
