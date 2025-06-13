import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import DashboardView from "@views/DashboardView";
import CrearRegistro from "@views/registros/CrearRegistro";
import CreatePaciente from "@/views/pacientes/CreatePaciente";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/registros/create" element={<CrearRegistro />} />
          <Route path="/pacientes/create" element={<CreatePaciente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
