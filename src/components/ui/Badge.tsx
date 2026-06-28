type BadgeVariant = "default" | "success" | "warning" | "muted";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-cal-border bg-cal-bg text-cal-muted",
  success: "bg-emerald-500/15 text-emerald-400",
  warning: "bg-amber-500/15 text-amber-400",
  muted: "bg-cal-elevated text-cal-subtle",
};

export function Badge({ children, variant = "default", icon }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}
