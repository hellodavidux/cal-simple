export type Booking = {
  id: string;
  eventType: string;
  guest: string;
  guestEmail: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
};

export const upcomingBookings: Booking[] = [
  {
    id: "1",
    eventType: "Reunión de 30 min",
    guest: "Sarah Chen",
    guestEmail: "sarah@company.com",
    date: "Mon, Jun 30",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "2",
    eventType: "15-min casual chat",
    guest: "Marcus Johnson",
    guestEmail: "marcus@company.com",
    date: "Mon, Jun 30",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: "3",
    eventType: "Reunión de 30 min",
    guest: "Elena Rodríguez",
    guestEmail: "elena@company.com",
    date: "Tue, Jul 1",
    time: "11:00 AM",
    status: "pending",
  },
];
