import { useState } from "react";
import {
  Clock,
  EyeOff,
  ExternalLink,
  Link2,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { Toggle } from "../components/Toggle";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { IconButton } from "../components/ui/IconButton";
import { Input } from "../components/ui/Input";
import { PageHeader, PageShell } from "../components/ui/PageShell";
import { eventTypes as initialEvents, username } from "../data/mock";

export function EventTypesPage() {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.slug.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleEvent = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, enabled: !e.enabled } : e)),
    );
  };

  return (
    <PageShell>
      <PageHeader
        title="Event types"
        description="Configure different events for people to book on your calendar."
        actions={
          <>
            <Input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="w-44"
            />
            <Button icon={<Plus className="h-4 w-4" />}>New</Button>
          </>
        }
      />

      <div className="overflow-hidden rounded-lg border border-cal-border">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-cal-muted">
            No event types match your search.
          </div>
        ) : (
          filtered.map((event, index) => (
            <div
              key={event.id}
              className={`group flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-cal-elevated/30 ${
                index < filtered.length - 1 ? "border-b border-cal-border" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium text-white">{event.title}</span>
                  <span className="text-sm text-cal-subtle">
                    /{username}/{event.slug}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-cal-muted">
                    <Clock className="h-3.5 w-3.5" />
                    {event.duration}m
                  </span>
                  {event.hidden && (
                    <Badge variant="warning" icon={<EyeOff className="h-3 w-3" />}>
                      Hidden
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 opacity-100 transition sm:opacity-60 sm:group-hover:opacity-100">
                <Toggle
                  enabled={event.enabled}
                  onChange={() => toggleEvent(event.id)}
                />
                <IconButton label="Open booking page">
                  <ExternalLink className="h-4 w-4" />
                </IconButton>
                <IconButton label="Copy link">
                  <Link2 className="h-4 w-4" />
                </IconButton>
                <IconButton label="More options">
                  <MoreHorizontal className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </div>
    </PageShell>
  );
}
