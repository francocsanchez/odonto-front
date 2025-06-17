import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import DashboardView from "@views/DashboardView";

import CreatePaciente from "@views/pacientes/CreatePaciente";
import ListPacientes from "@views/pacientes/ListPacientes";
import EditPaciente from "@views/pacientes/EditPaciente";

import ViewRegistrosPage from "@/views/registros/ViewRegistrosPage";
import CrearRegistro from "@views/registros/CrearRegistro";

import ListObraSociales from "@views/obrasSociales/ListObraSociales";
import CreateObraSocial from "./views/obrasSociales/CreateObraSocial";
import EditObraSocial from "./views/obrasSociales/EditObraSocial";

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
          <Route path="/pacientes/:pacienteId/registros/nuevo-registro" element={<CrearRegistro />} />
          <Route path="/pacientes/:pacienteId/registros/:estado" element={<ViewRegistrosPage />} />

          <Route path="/obras-sociales" element={<ListObraSociales />} />
          <Route path="/obras-sociales/create" element={<CreateObraSocial />} />
          <Route path="/obras-sociales/:obraSocialId/edit" element={<EditObraSocial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
