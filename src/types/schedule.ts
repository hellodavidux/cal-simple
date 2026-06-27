export type DayHours = {
  day: string;
  hours: string;
};

export type StartingHoursPreset = "custom" | "morning" | "evening";

export type Schedule = {
  id: string;
  name: string;
  isDefault?: boolean;
  timeRanges: DayHours[];
};
