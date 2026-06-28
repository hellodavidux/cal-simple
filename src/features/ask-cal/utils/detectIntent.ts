import type { AskCalIntent } from "../../../types/askCal";

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

export function detectIntent(query: string): AskCalIntent {
  const q = normalize(query);

  if (
    q.includes("booking") ||
    q.includes("bookings") ||
    q.includes("meeting") ||
    q.includes("meetings") ||
    q.includes("calendar") ||
    q.includes("schedule") ||
    q.includes("what's on") ||
    q.includes("whats on")
  ) {
    return "bookings";
  }

  if (
    q.includes("link") ||
    q.includes("share") ||
    q.includes("booking page") ||
    q.includes("event url")
  ) {
    return "event-link";
  }

  if (
    q.includes("free") ||
    q.includes("available") ||
    q.includes("availability") ||
    q.includes("open slot")
  ) {
    return "availability";
  }

  if (
    q.includes("event type") ||
    q.includes("event types") ||
    q.includes("meeting type")
  ) {
    return "event-types";
  }

  return "fallback";
}

export function deriveChatTitle(
  intent: AskCalIntent,
  query?: string,
): string {
  switch (intent) {
    case "bookings":
      return "Upcoming bookings";
    case "event-link":
      return "Share booking link";
    case "availability":
      return "Check availability";
    case "event-types":
      return "Event types";
    default:
      if (!query) return "New chat";
      return query.length > 36 ? `${query.slice(0, 36)}…` : query;
  }
}
