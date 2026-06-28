import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { StartingHoursPreset } from "../types/schedule";
import { STARTING_HOURS_OPTIONS } from "../utils/schedulePresets";
import { Input } from "./ui/Input";
import { Modal, ModalActions } from "./ui/Modal";

type AddScheduleModalProps = {
  open: boolean;
  onClose: () => void;
  onContinue: (name: string, preset: StartingHoursPreset) => void;
};

export function AddScheduleModal({
  open,
  onClose,
  onContinue,
}: AddScheduleModalProps) {
  const [name, setName] = useState("Working hours");
  const [preset, setPreset] = useState<StartingHoursPreset>("morning");

  useEffect(() => {
    if (open) {
      setName("Working hours");
      setPreset("morning");
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onContinue(name.trim() || "Working hours", preset);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a new schedule"
      onSubmit={handleSubmit}
      footer={
        <ModalActions
          onClose={onClose}
          closeLabel="Close"
          submitLabel="Continue"
        />
      }
    >
      <div className="space-y-2">
        <label htmlFor="schedule-name" className="block text-sm font-medium text-white">
          Name
        </label>
        <Input
          id="schedule-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="starting-hours"
          className="block text-sm font-medium text-white"
        >
          Starting hours
        </label>
        <div className="relative">
          <select
            id="starting-hours"
            value={preset}
            onChange={(e) => setPreset(e.target.value as StartingHoursPreset)}
            className="h-10 w-full appearance-none rounded-md border border-cal-border bg-cal-bg px-3 pr-10 text-sm text-white focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500/50"
          >
            {STARTING_HOURS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cal-muted" />
        </div>
      </div>
    </Modal>
  );
}
