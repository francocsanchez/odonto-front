import { getPacienteById } from "@/api/PacienteAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import EditPacienteForm from "./EditPacienteForm";

export default function EditPaciente() {
  const params = useParams();
  const pacienteId = params.pacienteId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editPaciente", pacienteId],
    queryFn: () => getPacienteById(pacienteId),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditPacienteForm data={data} pacienteId={pacienteId} />;
}
