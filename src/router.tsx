import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import DashboardView from "@views/DashboardView";
import CreatePaciente from "@views/pacientes/CreatePaciente";
import ListPacientes from "@views/pacientes/ListPacientes";
import EditPaciente from "@views/pacientes/EditPaciente";
import ViewRegistros from "@views/registros/ViewRegistros";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />

          <Route path="/pacientes" element={<ListPacientes />} />
          <Route path="/pacientes/:pacienteId/registros" element={<ViewRegistros />} />
          <Route path="/pacientes/:pacienteId/edit" element={<EditPaciente />} />
          <Route path="/pacientes/create" element={<CreatePaciente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
