import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  GitBranch,
  Grid3x3,
  Link2,
  MessageCircle,
  Search,
  Settings,
  Users,
  Zap,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Event types", icon: Link2, end: true },
  { to: "/bookings", label: "Bookings", icon: Calendar },
  { to: "/availability", label: "Availability", icon: Clock },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/apps", label: "Apps", icon: Grid3x3, chevron: true },
  { to: "/routing", label: "Routing", icon: GitBranch },
  { to: "/workflows", label: "Workflows", icon: Zap },
  { to: "/insights", label: "Insights", icon: BarChart3, chevron: true },
];

const bottomItems = [
  { label: "View public page", icon: ExternalLink },
  { label: "Copy public page link", icon: Copy },
  { label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-[240px] shrink-0 flex-col border-r border-cal-border bg-cal-bg px-3 py-4">
      <div className="mb-6 flex items-center justify-between px-2">
        <img
          src="/cal-logo.png"
          alt="Cal.com"
          className="h-10 w-auto"
        />
        <button
          type="button"
          className="rounded-md p-1.5 text-cal-muted transition hover:bg-cal-elevated hover:text-white"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-cal-elevated text-white"
                  : "text-cal-muted hover:bg-cal-elevated/60 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.chevron && (
              <ChevronRight className="h-3.5 w-3.5 text-cal-subtle" />
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-0.5 border-t border-cal-border pt-3">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-cal-muted transition hover:bg-cal-elevated/60 hover:text-white"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
        <p className="px-2.5 pt-3 text-[11px] text-cal-subtle">
          © 2024 Cal.com, Inc. v4.6.4-hotfix1-h
        </p>
      </div>

      <button
        type="button"
        className="fixed bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-lg border border-cal-border bg-cal-elevated text-white shadow-lg transition hover:bg-zinc-800"
        aria-label="Support chat"
      >
        <MessageCircle className="h-4 w-4" />
      </button>
    </aside>
  );
}
