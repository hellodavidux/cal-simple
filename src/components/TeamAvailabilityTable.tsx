import { useState } from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";
import {
  getTeammateAvailabilitySummary,
  teammates,
  type Teammate,
} from "../data/teammates";
import { formatHours } from "../utils/schedulePresets";

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-amber-500",
  "from-emerald-500 to-teal-500",
];

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
    >
      {initials}
    </div>
  );
}

function TeammateAvailabilityDetails({ teammate }: { teammate: Teammate }) {
  return (
    <div className="border-t border-cal-border bg-cal-bg/50 px-5 py-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm font-medium text-white">{teammate.schedule}</span>
        <span className="rounded border border-cal-border bg-cal-bg px-1.5 py-0.5 text-xs text-cal-muted">
          Schedule
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {teammate.timeRanges.map((row) => (
          <div key={row.day} className="flex items-center gap-4 text-sm">
            <span className="w-10 font-medium text-white">{row.day}</span>
            <span className="text-cal-muted">{formatHours(row.hours)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-cal-muted">
        <Globe className="h-4 w-4" />
        {teammate.timezone}
      </div>
    </div>
  );
}

export function TeamAvailabilityTable() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="overflow-hidden rounded-lg border border-cal-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-cal-border bg-cal-bg/40">
              <th className="px-5 py-3 font-medium text-cal-muted">Teammate</th>
              <th className="px-5 py-3 font-medium text-cal-muted">Schedule</th>
              <th className="px-5 py-3 font-medium text-cal-muted">
                Availability
              </th>
              <th className="px-5 py-3 font-medium text-cal-muted">Timezone</th>
              <th className="px-5 py-3 text-right font-medium text-cal-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teammates.map((teammate, index) => {
              const isExpanded = expandedId === teammate.id;

              return (
                <tr key={teammate.id} className="group align-top">
                  <td colSpan={5} className="p-0">
                    <div
                      className={`border-b border-cal-border transition ${
                        isExpanded ? "bg-cal-bg/30" : "hover:bg-cal-bg/20"
                      }`}
                    >
                      <div className="grid grid-cols-[minmax(180px,1.4fr)_minmax(120px,1fr)_minmax(160px,1.2fr)_minmax(140px,1fr)_auto] items-center">
                        <div className="flex items-center gap-3 px-5 py-4">
                          <Avatar name={teammate.name} index={index} />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-white">
                              {teammate.name}
                            </p>
                            <p className="truncate text-xs text-cal-subtle">
                              {teammate.email}
                            </p>
                          </div>
                        </div>
                        <div className="px-5 py-4 text-cal-muted">
                          {teammate.schedule}
                        </div>
                        <div className="px-5 py-4 text-cal-muted">
                          {getTeammateAvailabilitySummary(teammate)}
                        </div>
                        <div className="px-5 py-4 text-cal-muted">
                          {teammate.timezone}
                        </div>
                        <div className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => toggleExpanded(teammate.id)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-cal-border bg-cal-bg px-3 py-1.5 text-sm font-medium text-white transition hover:bg-cal-elevated"
                          >
                            {isExpanded ? (
                              <>
                                Hide
                                <ChevronUp className="h-3.5 w-3.5" />
                              </>
                            ) : (
                              <>
                                View
                                <ChevronDown className="h-3.5 w-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <TeammateAvailabilityDetails teammate={teammate} />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
