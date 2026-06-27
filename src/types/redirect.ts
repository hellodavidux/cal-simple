export type RedirectMode = "specific" | "round-robin" | "first-available";

export type Redirect = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  mode: RedirectMode;
  colleagueId?: string;
  fallbackColleagueId?: string;
};
