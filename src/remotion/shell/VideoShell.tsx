import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { EventTypesPage } from "../../pages/EventTypesPage";

/**
 * Static dashboard shell for Remotion compositions.
 * Uses MemoryRouter so NavLink/Sidebar render without a browser Router,
 * and renders EventTypesPage as the frozen background content.
 * Overlay children (the Ask Cal widget) are rendered on top via the wrapper div.
 */
export function VideoShell({ children }: { children?: ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <div
        className="flex min-h-screen bg-cal-bg"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Sidebar />
        <main className="relative flex-1 overflow-auto">
          <div className="min-h-full bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_60%)] p-6">
            <EventTypesPage />
          </div>
        </main>
        {children}
      </div>
    </MemoryRouter>
  );
}
