export const username = "david-hr-15min-chat";

export const eventTypes = [
  {
    id: "1",
    title: "Reunión de 30 min",
    slug: "30min",
    duration: 30,
    hidden: false,
    enabled: true,
  },
  {
    id: "2",
    title: "15-min casual chat",
    slug: "15min",
    duration: 15,
    hidden: false,
    enabled: true,
  },
  {
    id: "3",
    title: "Reunión Secreta",
    slug: "secret",
    duration: 15,
    hidden: true,
    enabled: false,
  },
];

export const workingHours = [
  { day: "Sun", hours: "9:00 AM - 9:30 PM" },
  { day: "Mon", hours: "9:00 AM - 10:00 PM" },
  { day: "Tue", hours: "9:00 AM - 10:30 PM" },
  { day: "Wed", hours: "9:00 AM - 9:15 PM" },
  { day: "Thu", hours: "9:00 AM - 11:30 PM" },
  { day: "Fri", hours: "9:00 AM - 11:15 PM" },
  { day: "Sat", hours: "9:00 AM - 5:30 PM" },
];

export const timezone = "Europe/Copenhagen";
