import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AvailabilityPage } from "./pages/AvailabilityPage";
import { EventTypesPage } from "./pages/EventTypesPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<EventTypesPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          <Route path="bookings" element={<PlaceholderPage title="Bookings" />} />
          <Route path="teams" element={<PlaceholderPage title="Teams" />} />
          <Route path="apps" element={<PlaceholderPage title="Apps" />} />
          <Route path="routing" element={<PlaceholderPage title="Routing" />} />
          <Route path="workflows" element={<PlaceholderPage title="Workflows" />} />
          <Route path="insights" element={<PlaceholderPage title="Insights" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
