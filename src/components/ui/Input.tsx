import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

export function Input({ icon, className = "", ...props }: InputProps) {
  if (icon) {
    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cal-subtle">
          {icon}
        </span>
        <input
          className={`h-9 w-full rounded-md border border-cal-border bg-cal-bg pl-9 pr-3 text-sm text-white placeholder:text-cal-subtle focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500/50 ${className}`}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      className={`h-10 w-full rounded-md border border-cal-border bg-cal-bg px-3 text-sm text-white placeholder:text-cal-subtle focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500/50 ${className}`}
      {...props}
    />
  );
}
