import { upcomingBookings } from "../../../data/bookings";
import { eventTypes, timezone, username, workingHours } from "../../../data/mock";
import type { AskCalIntent } from "../../../types/askCal";
import { detectIntent } from "./detectIntent";

function findEventTypeSlug(query: string): string | undefined {
  const q = query.toLowerCase().trim();
  const match = eventTypes.find(
    (event) =>
      q.includes(event.slug) ||
      q.includes(event.title.toLowerCase()) ||
      (q.includes("15") && event.slug === "15min") ||
      (q.includes("30") && event.slug === "30min"),
  );
  return match?.slug;
}

function formatBookingsAnswer(): string {
  if (upcomingBookings.length === 0) {
    return "You don't have any upcoming bookings. Your calendar is clear — share an event link if you'd like to fill some slots.";
  }

  const lines = upcomingBookings.map((booking) => {
    const status =
      booking.status === "pending" ? " _(pending)_" : "";
    return `• **${booking.eventType}** with ${booking.guest} — ${booking.date} at ${booking.time} (${timezone})${status}`;
  });

  return `You have **${upcomingBookings.length} upcoming bookings**:\n\n${lines.join("\n")}\n\nWant me to draft a reminder, reschedule one, or check open slots around any of these?`;
}

function formatEventLinkAnswer(query: string): string {
  const slug = findEventTypeSlug(query) ?? "15min";
  const event = eventTypes.find((item) => item.slug === slug) ?? eventTypes[1];

  if (!event.enabled) {
    return `**${event.title}** is currently disabled. Enable it under Event types if you'd like to share the link.`;
  }

  const link = `cal.com/${username}/${event.slug}`;

  return `Here's your **${event.title}** booking link:\n\n**${link}**\n\nGuests can pick any open slot within your availability (${timezone}). It's ${event.duration} minutes and ${event.hidden ? "hidden from your public page" : "visible on your public page"}.`;
}

function formatAvailabilityAnswer(): string {
  const tomorrow = workingHours.find((row) => row.day === "Mon");
  const hours = tomorrow?.hours ?? "9:00 AM - 6:00 PM";

  return `Based on your default schedule, you're generally free **tomorrow (Mon)** during:\n\n**${hours}** (${timezone})\n\nYou already have bookings at **10:00 AM** and **2:00 PM**, so those slots are blocked. The next open windows are roughly **10:30 AM – 1:45 PM** and **after 2:15 PM**.\n\nWant me to suggest times to offer a guest?`;
}

function formatEventTypesAnswer(): string {
  const lines = eventTypes.map((event) => {
    const state = event.enabled
      ? event.hidden
        ? "enabled, hidden"
        : "enabled"
      : "disabled";
    return `• **${event.title}** — ${event.duration}m, ${state}`;
  });

  return `You have **${eventTypes.length} event types** set up:\n\n${lines.join("\n")}\n\nAsk for a link to any of them, or say which one you'd like to tweak.`;
}

function formatFallbackAnswer(): string {
  return `I can help with things like:\n\n• **Bookings** — "What do I have this week?"\n• **Links** — "Share my 15-min chat link"\n• **Availability** — "When am I free tomorrow?"\n• **Event types** — "Which meeting types are active?"\n\nWhat would you like to do?`;
}

function replyForIntent(intent: AskCalIntent, query: string): string {
  switch (intent) {
    case "bookings":
      return formatBookingsAnswer();
    case "event-link":
      return formatEventLinkAnswer(query);
    case "availability":
      return formatAvailabilityAnswer();
    case "event-types":
      return formatEventTypesAnswer();
    default:
      return formatFallbackAnswer();
  }
}

export function generateReply(query: string): string {
  return replyForIntent(detectIntent(query), query);
}
