import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  GitBranch,
  Grid3x3,
  Users,
  Zap,
} from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import { PageHeader, PageShell } from "../components/ui/PageShell";

const placeholderMeta: Record<
  string,
  { icon: LucideIcon; description: string }
> = {
  Teams: {
    icon: Users,
    description:
      "Invite teammates, manage roles, and share event types across your organization.",
  },
  Apps: {
    icon: Grid3x3,
    description:
      "Connect Cal.com with Zoom, Google Calendar, Slack, and other tools.",
  },
  Routing: {
    icon: GitBranch,
    description:
      "Route bookings to the right person based on rules, forms, and availability.",
  },
  Workflows: {
    icon: Zap,
    description:
      "Automate reminders, follow-ups, and notifications for every booking.",
  },
  Insights: {
    icon: BarChart3,
    description:
      "Track booking trends, conversion rates, and team performance over time.",
  },
};

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  const { icon, description } = placeholderMeta[title] ?? {
    icon: Users,
    description: "This section is coming soon.",
  };

  return (
    <PageShell>
      <PageHeader title={title} />
      <EmptyState
        icon={icon}
        title={`${title} coming soon`}
        description={description}
      />
    </PageShell>
  );
}
