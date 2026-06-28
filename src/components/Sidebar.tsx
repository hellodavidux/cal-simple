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
  Search,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { IconButton } from "./ui/IconButton";

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
    <aside className="flex h-screen w-[240px] shrink-0 flex-col border-r border-cal-border bg-cal-bg">
      <div className="flex items-center justify-between px-4 py-4">
        <img src="/cal-logo.png" alt="Cal.com" className="h-9 w-auto" />
        <IconButton label="Search">
          <Search className="h-4 w-4" />
        </IconButton>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
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

      <div className="flex flex-col gap-0.5 border-t border-cal-border px-3 py-3">
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

        <div className="mt-2 flex items-center gap-2.5 rounded-md px-2.5 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-semibold text-white">
            DH
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">David Hidalgo</p>
            <p className="truncate text-xs text-cal-subtle">david@cal.com</p>
          </div>
        </div>

        <p className="px-2.5 pt-2 text-[11px] text-cal-subtle">
          © 2024 Cal.com, Inc. v4.6.4
        </p>
      </div>
    </aside>
  );
}
