import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/about" element={<h1 className="text-6xl">About</h1>} />
          <Route path="/contact" element={<h1 className="text-6xl">Contact</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
