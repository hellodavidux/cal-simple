import { useState } from "react";
import { Globe, MoreHorizontal, Plus } from "lucide-react";
import { timezone, workingHours } from "../data/mock";

export function AvailabilityPage() {
  const [tab, setTab] = useState<"my" | "team">("my");

  return (
    <div className="mx-auto max-w-5xl rounded-xl border border-cal-border bg-cal-surface p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Availability</h1>
          <p className="mt-1 text-sm text-cal-muted">
            Configure times when you are available for bookings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-md border border-cal-border bg-cal-bg p-0.5">
            <button
              type="button"
              onClick={() => setTab("my")}
              className={`rounded px-3 py-1.5 text-sm font-medium transition ${
                tab === "my"
                  ? "bg-cal-elevated text-white"
                  : "text-cal-muted hover:text-white"
              }`}
            >
              My availability
            </button>
            <button
              type="button"
              onClick={() => setTab("team")}
              className={`rounded px-3 py-1.5 text-sm font-medium transition ${
                tab === "team"
                  ? "bg-cal-elevated text-white"
                  : "text-cal-muted hover:text-white"
              }`}
            >
              Team availability
            </button>
          </div>
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-md bg-white px-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-cal-border">
        <div className="flex items-start justify-between gap-4 border-b border-cal-border px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-white">Working hours</h2>
            <span className="rounded border border-cal-border bg-cal-bg px-1.5 py-0.5 text-xs text-cal-muted">
              Default
            </span>
          </div>
          <button
            type="button"
            className="rounded p-1.5 text-cal-muted transition hover:bg-cal-elevated hover:text-white"
            aria-label="More options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-2">
          {workingHours.map((row) => (
            <div
              key={row.day}
              className="flex items-center gap-6 border-b border-cal-border py-3 last:border-b-0"
            >
              <span className="w-10 shrink-0 text-sm font-medium text-white">
                {row.day}
              </span>
              <span className="text-sm text-cal-muted">{row.hours}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-cal-border px-5 py-4">
          <Globe className="h-4 w-4 text-cal-muted" />
          <span className="text-sm text-cal-muted">{timezone}</span>
        </div>

        <div className="border-t border-cal-border px-5 py-4 text-center text-sm text-cal-muted">
          Temporarily out-of-office?{" "}
          <button
            type="button"
            className="font-medium text-white underline-offset-2 hover:underline"
          >
            Add a redirect
          </button>
        </div>
      </div>
    </div>
  );
}
