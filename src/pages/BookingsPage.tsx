import { useState } from "react";
import { Calendar, Filter, MoreHorizontal, Search, Video } from "lucide-react";
import { upcomingBookings } from "../data/bookings";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { IconButton } from "../components/ui/IconButton";
import { Input } from "../components/ui/Input";
import { PageHeader, PageShell } from "../components/ui/PageShell";

function GuestAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-semibold text-white">
      {initials}
    </div>
  );
}

export function BookingsPage() {
  const [search, setSearch] = useState("");

  const filtered = upcomingBookings.filter(
    (b) =>
      b.guest.toLowerCase().includes(search.toLowerCase()) ||
      b.eventType.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PageShell>
      <PageHeader
        title="Bookings"
        description="See upcoming and past events booked through your event types."
        actions={
          <>
            <Input
              type="search"
              placeholder="Search bookings"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="w-48"
            />
            <Button variant="secondary" icon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
          </>
        }
      />

      <div className="mb-4 flex items-center gap-2 text-sm text-cal-muted">
        <Calendar className="h-4 w-4" />
        <span>
          {filtered.length} upcoming booking{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-cal-border">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-cal-muted">
            No bookings match your search.
          </div>
        ) : (
          filtered.map((booking, index) => (
            <div
              key={booking.id}
              className={`group flex items-center gap-4 px-4 py-4 transition hover:bg-cal-elevated/30 ${
                index < filtered.length - 1 ? "border-b border-cal-border" : ""
              }`}
            >
              <GuestAvatar name={booking.guest} />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-white">{booking.guest}</span>
                  <Badge
                    variant={
                      booking.status === "confirmed" ? "success" : "warning"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm text-cal-muted">
                  {booking.eventType}
                </p>
                <p className="mt-0.5 text-xs text-cal-subtle">
                  {booking.guestEmail}
                </p>
              </div>

              <div className="hidden shrink-0 text-right sm:block">
                <p className="text-sm font-medium text-white">{booking.date}</p>
                <p className="text-sm text-cal-muted">{booking.time}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                <IconButton label="Join meeting">
                  <Video className="h-4 w-4" />
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
