import { getObraSocialById } from "@/api/ObraSocialesApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import EditObraSocialForm from "./EditObraSocialForm";

export default function EditObraSocial() {
  const params = useParams();
  const obraSocialId = params.obraSocialId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editObraSocial", obraSocialId],
    queryFn: () => getObraSocialById(obraSocialId),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditObraSocialForm data={data} obraSocialId={obraSocialId} />;
}
