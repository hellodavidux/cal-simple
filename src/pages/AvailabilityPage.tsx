import { useState } from "react";
import { ArrowRightLeft, Globe, MoreHorizontal, Plus, UserPlus } from "lucide-react";
import { AddRedirectModal } from "../components/AddRedirectModal";
import { AddScheduleModal } from "../components/AddScheduleModal";
import { TeamAvailabilityTable } from "../components/TeamAvailabilityTable";
import { timezone, workingHours } from "../data/mock";
import { teammates } from "../data/teammates";
import type { Redirect } from "../types/redirect";
import type { Schedule, StartingHoursPreset } from "../types/schedule";
import { formatHours, getPresetTimeRanges } from "../utils/schedulePresets";

const initialSchedules: Schedule[] = [
  {
    id: "default",
    name: "Working hours",
    isDefault: true,
    timeRanges: workingHours,
  },
];

function ScheduleCard({ schedule }: { schedule: Schedule }) {
  return (
    <div className="overflow-hidden rounded-lg border border-cal-border">
      <div className="flex items-start justify-between gap-4 border-b border-cal-border px-5 py-4">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-white">{schedule.name}</h2>
          {schedule.isDefault && (
            <span className="rounded border border-cal-border bg-cal-bg px-1.5 py-0.5 text-xs text-cal-muted">
              Default
            </span>
          )}
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
        {schedule.timeRanges.map((row) => (
          <div
            key={row.day}
            className="flex items-center gap-6 border-b border-cal-border py-3 last:border-b-0"
          >
            <span className="w-10 shrink-0 text-sm font-medium text-white">
              {row.day}
            </span>
            <span className="text-sm text-cal-muted">
              {formatHours(row.hours)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-cal-border px-5 py-4">
        <Globe className="h-4 w-4 text-cal-muted" />
        <span className="text-sm text-cal-muted">{timezone}</span>
      </div>
    </div>
  );
}

const REDIRECT_MODE_LABELS: Record<Redirect["mode"], string> = {
  specific: "Specific colleague",
  "round-robin": "Round robin",
  "first-available": "First available",
};

function RedirectCard({ redirect }: { redirect: Redirect }) {
  const colleague = redirect.colleagueId
    ? teammates.find((t) => t.id === redirect.colleagueId)
    : undefined;

  const dateRange =
    redirect.startDate && redirect.endDate
      ? `${redirect.startDate} → ${redirect.endDate}`
      : redirect.startDate || redirect.endDate || "No dates set";

  return (
    <div className="flex items-start gap-3 rounded-lg border border-cal-border bg-cal-bg px-5 py-4">
      <ArrowRightLeft className="mt-0.5 h-4 w-4 shrink-0 text-cal-muted" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{redirect.name}</p>
        <p className="mt-0.5 text-xs text-cal-muted">
          {REDIRECT_MODE_LABELS[redirect.mode]}
          {colleague ? ` · ${colleague.name}` : ""}
        </p>
        <p className="mt-1 text-xs text-cal-subtle">{dateRange}</p>
      </div>
    </div>
  );
}

export function AvailabilityPage() {
  const [tab, setTab] = useState<"my" | "team">("my");
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);

  const handleCreateSchedule = (name: string, preset: StartingHoursPreset) => {
    const newSchedule: Schedule = {
      id: crypto.randomUUID(),
      name,
      timeRanges: getPresetTimeRanges(preset),
    };
    setSchedules((prev) => [...prev, newSchedule]);
    setModalOpen(false);
  };

  const handleSaveRedirect = (data: Omit<Redirect, "id">) => {
    setRedirects((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
    setRedirectModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto max-w-5xl rounded-xl border border-cal-border bg-cal-surface p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Availability
            </h1>
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
              onClick={() =>
                tab === "my" ? setModalOpen(true) : undefined
              }
              className="flex h-9 items-center gap-1.5 rounded-md bg-white px-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              {tab === "my" ? (
                <>
                  <Plus className="h-4 w-4" />
                  New
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Invite
                </>
              )}
            </button>
          </div>
        </div>

        {tab === "my" ? (
          <>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <ScheduleCard key={schedule.id} schedule={schedule} />
              ))}
            </div>

            {redirects.length > 0 && (
              <div className="mt-4 space-y-2">
                {redirects.map((redirect) => (
                  <RedirectCard key={redirect.id} redirect={redirect} />
                ))}
              </div>
            )}

            <div className="mt-4 overflow-hidden rounded-lg border border-cal-border">
              <div className="px-5 py-4 text-center text-sm text-cal-muted">
                Temporarily out-of-office?{" "}
                <button
                  type="button"
                  onClick={() => setRedirectModalOpen(true)}
                  className="font-medium text-white underline-offset-2 hover:underline"
                >
                  Add a redirect
                </button>
              </div>
            </div>
          </>
        ) : (
          <TeamAvailabilityTable />
        )}
      </div>

      <AddScheduleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onContinue={handleCreateSchedule}
      />

      <AddRedirectModal
        open={redirectModalOpen}
        onClose={() => setRedirectModalOpen(false)}
        onSave={handleSaveRedirect}
      />
    </>
  );
}
