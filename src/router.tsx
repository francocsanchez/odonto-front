import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import DashboardView from "@views/DashboardView";
import CreatePaciente from "@views/pacientes/CreatePaciente";
import ListPacientes from "@views/pacientes/ListPacientes";
import EditPaciente from "@views/pacientes/EditPaciente";
import ViewRegistrosPage from "@/views/registros/ViewRegistrosPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />

          <Route path="/pacientes" element={<ListPacientes />} />
          <Route path="/pacientes/create" element={<CreatePaciente />} />
          <Route path="/pacientes/:pacienteId/edit" element={<EditPaciente />} />
          <Route path="/pacientes/:pacienteId/registros" element={<ViewRegistrosPage />} />
          <Route path="/pacientes/:pacienteId/registros/:estado" element={<ViewRegistrosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
