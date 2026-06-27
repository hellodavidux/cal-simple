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
import { eventTypes as initialEvents, username } from "../data/mock";
import { Toggle } from "../components/Toggle";

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
    <div className="mx-auto max-w-5xl rounded-xl border border-cal-border bg-cal-surface p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Event types</h1>
          <p className="mt-1 text-sm text-cal-muted">
            Configure different events for people to book on your calendar.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cal-subtle" />
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-44 rounded-md border border-cal-border bg-cal-bg pl-9 pr-3 text-sm text-white placeholder:text-cal-subtle focus:border-zinc-500 focus:outline-none"
            />
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
        {filtered.map((event, index) => (
          <div
            key={event.id}
            className={`flex items-center justify-between gap-4 px-4 py-4 ${
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
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-xs font-medium text-amber-400">
                    <EyeOff className="h-3 w-3" />
                    Hidden
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Toggle
                enabled={event.enabled}
                onChange={() => toggleEvent(event.id)}
              />
              <button
                type="button"
                className="rounded p-1.5 text-cal-muted transition hover:bg-cal-elevated hover:text-white"
                aria-label="Open booking page"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded p-1.5 text-cal-muted transition hover:bg-cal-elevated hover:text-white"
                aria-label="Copy link"
              >
                <Link2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded p-1.5 text-cal-muted transition hover:bg-cal-elevated hover:text-white"
                aria-label="More options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
