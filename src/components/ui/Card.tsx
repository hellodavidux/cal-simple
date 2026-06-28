import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-cal-border bg-cal-bg/40 ${className}`}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  title: string;
  badge?: ReactNode;
  action?: ReactNode;
};

export function CardHeader({ title, badge, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-cal-border px-5 py-4">
      <div className="flex items-center gap-2">
        <h2 className="font-medium text-white">{title}</h2>
        {badge}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, className = "" }: CardProps) {
  return <div className={`px-5 py-2 ${className}`}>{children}</div>;
}

export function CardFooter({ children }: CardProps) {
  return (
    <div className="flex items-center gap-2 border-t border-cal-border px-5 py-4">
      {children}
    </div>
  );
}
