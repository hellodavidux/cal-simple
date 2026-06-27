export type Teammate = {
  id: string;
  name: string;
  email: string;
  schedule: string;
  timezone: string;
  timeRanges: { day: string; hours: string }[];
};

export const teammates: Teammate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@company.com",
    schedule: "Working hours",
    timezone: "America/New_York",
    timeRanges: [
      { day: "Sun", hours: "" },
      { day: "Mon", hours: "9:00 AM - 6:00 PM" },
      { day: "Tue", hours: "9:00 AM - 6:00 PM" },
      { day: "Wed", hours: "9:00 AM - 6:00 PM" },
      { day: "Thu", hours: "9:00 AM - 6:00 PM" },
      { day: "Fri", hours: "9:00 AM - 4:00 PM" },
      { day: "Sat", hours: "" },
    ],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@company.com",
    schedule: "Morning shift",
    timezone: "Europe/London",
    timeRanges: [
      { day: "Sun", hours: "" },
      { day: "Mon", hours: "6:00 AM - 12:00 PM" },
      { day: "Tue", hours: "6:00 AM - 12:00 PM" },
      { day: "Wed", hours: "6:00 AM - 12:00 PM" },
      { day: "Thu", hours: "6:00 AM - 12:00 PM" },
      { day: "Fri", hours: "6:00 AM - 12:00 PM" },
      { day: "Sat", hours: "" },
    ],
  },
  {
    id: "3",
    name: "Elena Rodríguez",
    email: "elena@company.com",
    schedule: "Evening hours",
    timezone: "Europe/Madrid",
    timeRanges: [
      { day: "Sun", hours: "" },
      { day: "Mon", hours: "5:00 PM - 10:00 PM" },
      { day: "Tue", hours: "5:00 PM - 10:00 PM" },
      { day: "Wed", hours: "5:00 PM - 10:00 PM" },
      { day: "Thu", hours: "5:00 PM - 10:00 PM" },
      { day: "Fri", hours: "5:00 PM - 9:00 PM" },
      { day: "Sat", hours: "10:00 AM - 2:00 PM" },
    ],
  },
  {
    id: "4",
    name: "James Park",
    email: "james@company.com",
    schedule: "Working hours",
    timezone: "Asia/Seoul",
    timeRanges: [
      { day: "Sun", hours: "" },
      { day: "Mon", hours: "10:00 AM - 7:00 PM" },
      { day: "Tue", hours: "10:00 AM - 7:00 PM" },
      { day: "Wed", hours: "10:00 AM - 7:00 PM" },
      { day: "Thu", hours: "10:00 AM - 7:00 PM" },
      { day: "Fri", hours: "10:00 AM - 5:00 PM" },
      { day: "Sat", hours: "" },
    ],
  },
];

function summarizeAvailability(timeRanges: Teammate["timeRanges"]) {
  const active = timeRanges.filter((row) => row.hours);
  if (active.length === 0) return "Unavailable";

  const weekdays = active.filter((row) =>
    ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(row.day),
  );
  const weekend = active.filter((row) => ["Sat", "Sun"].includes(row.day));

  if (weekdays.length === 5 && weekend.length === 0) {
    const hours = weekdays[0]?.hours;
    const allSame = weekdays.every((row) => row.hours === hours);
    if (allSame && hours) return `Mon–Fri, ${hours}`;
  }

  return `${active.length} days/week`;
}

export function getTeammateAvailabilitySummary(teammate: Teammate) {
  return summarizeAvailability(teammate.timeRanges);
}
