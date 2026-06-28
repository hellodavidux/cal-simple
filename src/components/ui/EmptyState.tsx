import type { LucideIcon } from "lucide-react";
import { Button } from "./Button";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-cal-border bg-cal-bg/30 px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cal-elevated">
        <Icon className="h-5 w-5 text-cal-muted" />
      </div>
      <h3 className="text-base font-medium text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-cal-muted">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
