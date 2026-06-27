import type { DayHours, StartingHoursPreset } from "../types/schedule";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const WEEKDAYS = new Set(["Mon", "Tue", "Wed", "Thu", "Fri"]);

export const STARTING_HOURS_OPTIONS: {
  value: StartingHoursPreset;
  label: string;
}[] = [
  { value: "custom", label: "Custom (no preset)" },
  { value: "morning", label: "Morning (6 AM–12 PM Mon–Fri)" },
  { value: "evening", label: "Evening (5 PM–10 PM Mon–Fri)" },
];

export function getPresetTimeRanges(preset: StartingHoursPreset): DayHours[] {
  if (preset === "custom") {
    return DAYS.map((day) => ({ day, hours: "" }));
  }

  if (preset === "morning") {
    return DAYS.map((day) => ({
      day,
      hours: WEEKDAYS.has(day) ? "6:00 AM - 12:00 PM" : "",
    }));
  }

  return DAYS.map((day) => ({
    day,
    hours: WEEKDAYS.has(day) ? "5:00 PM - 10:00 PM" : "",
  }));
}

export function formatHours(hours: string) {
  return hours || "Unavailable";
}
