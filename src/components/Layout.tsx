import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-cal-bg">
      <Sidebar />
      <main className="relative flex-1 overflow-auto">
        <div className="min-h-full bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_60%)] p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
