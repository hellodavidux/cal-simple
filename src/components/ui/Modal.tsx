import type { FormEvent, ReactNode } from "react";
import { Button } from "./Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onSubmit?: (event: FormEvent) => void;
  size?: "md" | "lg";
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  onSubmit,
  size = "md",
}: ModalProps) {
  if (!open) return null;

  const content = (
    <>
      <div className="space-y-5 p-6">
        <div>
          <h2
            id="modal-title"
            className="text-lg font-semibold tracking-tight text-white"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-cal-muted">{description}</p>
          )}
        </div>
        {children}
      </div>
      {footer && (
        <div className="flex items-center justify-end gap-3 border-t border-cal-border bg-cal-surface px-6 py-4">
          {footer}
        </div>
      )}
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-xl border border-cal-border bg-cal-elevated shadow-2xl ${
          size === "lg" ? "max-w-lg" : "max-w-md"
        }`}
      >
        {onSubmit ? <form onSubmit={onSubmit}>{content}</form> : content}
      </div>
    </div>
  );
}

type ModalActionsProps = {
  onClose: () => void;
  closeLabel?: string;
  submitLabel: string;
  submitDisabled?: boolean;
};

export function ModalActions({
  onClose,
  closeLabel = "Cancel",
  submitLabel,
  submitDisabled,
}: ModalActionsProps) {
  return (
    <>
      <Button variant="ghost" onClick={onClose}>
        {closeLabel}
      </Button>
      <Button
        type="submit"
        className="rounded-full px-5"
        disabled={submitDisabled}
      >
        {submitLabel}
      </Button>
    </>
  );
}
