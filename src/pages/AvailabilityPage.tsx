import { useState } from "react";
import { ArrowRightLeft, Globe, MoreHorizontal, Plus, UserPlus } from "lucide-react";
import { AddRedirectModal } from "../components/AddRedirectModal";
import { AddScheduleModal } from "../components/AddScheduleModal";
import { TeamAvailabilityTable } from "../components/TeamAvailabilityTable";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardBody, CardFooter, CardHeader } from "../components/ui/Card";
import { IconButton } from "../components/ui/IconButton";
import { PageHeader, PageShell } from "../components/ui/PageShell";
import { SegmentedControl } from "../components/ui/SegmentedControl";
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
    <Card>
      <CardHeader
        title={schedule.name}
        badge={
          schedule.isDefault ? (
            <Badge variant="default">Default</Badge>
          ) : undefined
        }
        action={
          <IconButton label="More options">
            <MoreHorizontal className="h-4 w-4" />
          </IconButton>
        }
      />

      <CardBody>
        {schedule.timeRanges.map((row) => (
          <div
            key={row.day}
            className="flex items-center gap-6 border-b border-cal-border py-3 last:border-b-0"
          >
            <span className="w-10 shrink-0 text-sm font-medium text-white">
              {row.day}
            </span>
            <span className="text-sm text-cal-muted">{formatHours(row.hours)}</span>
          </div>
        ))}
      </CardBody>

      <CardFooter>
        <Globe className="h-4 w-4 text-cal-muted" />
        <span className="text-sm text-cal-muted">{timezone}</span>
      </CardFooter>
    </Card>
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
      <PageShell>
        <PageHeader
          title="Availability"
          description="Configure times when you are available for bookings."
          actions={
            <>
              <SegmentedControl
                value={tab}
                onChange={setTab}
                segments={[
                  { value: "my", label: "My availability" },
                  { value: "team", label: "Team availability" },
                ]}
              />
              <Button
                onClick={() => (tab === "my" ? setModalOpen(true) : undefined)}
                icon={
                  tab === "my" ? (
                    <Plus className="h-4 w-4" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )
                }
              >
                {tab === "my" ? "New" : "Invite"}
              </Button>
            </>
          }
        />

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
      </PageShell>

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
