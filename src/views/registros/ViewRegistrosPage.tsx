// @views/registros/ViewRegistrosPage.tsx
import { getPacienteById } from "@/api/PacienteAPI";
import { getAllRegistrosById, getAllRegistrosByPacienteIDWithEstado } from "@/api/RegistrosAPI";
import { formatFechaCompleta } from "@/helpers";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";

export default function ViewRegistrosPage() {
  const { pacienteId, estado } = useParams();

  const {
    data: registros,
    isLoading: loadingRegistros,
    isError,
  } = useQuery({
    queryKey: ["registros", pacienteId, estado],
    queryFn: () => (estado ? getAllRegistrosByPacienteIDWithEstado(pacienteId!, estado) : getAllRegistrosById(pacienteId!)),
    retry: false,
  });

  const { data: paciente, isLoading: loadingPaciente } = useQuery({
    queryKey: ["paciente", pacienteId],
    queryFn: () => getPacienteById(pacienteId!),
    enabled: !!pacienteId && (!registros || registros.length === 0),
  });

  if (loadingRegistros || loadingPaciente) return <p className="text-center">Cargando...</p>;
  if (isError) return <Navigate to="/404" />;

  if (!registros || registros.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-black uppercase">{paciente?.fullName}</h1>
        <p className="text-xl font-light text-gray-500 mt-2">No hay registros disponibles</p>
        <div className="space-x-9 mt-8">
          <Link
            to="/pacientes"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            Volver
          </Link>
          <Link
            to={`/pacientes/${pacienteId}/nuevo-registro`}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase text-sm mt-4"
          >
            + Crear Registro
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-black uppercase">{paciente?.fullName}</h1>
      <p className="text-xl font-light text-gray-500 mt-2">Última atención: {formatFechaCompleta(registros[registros.length - 1].fechaAtencion)}</p>

      <nav className="my-5">
        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            to={`/pacientes/${pacienteId}/registros`}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            Todos
          </Link>
          <Link
            to={`/pacientes/${pacienteId}/registros/aprobado`}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            Aprobados
          </Link>
          <Link
            to={`/pacientes/${pacienteId}/registros/pendiente`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            Pendientes
          </Link>
          <Link
            to={`/pacientes/${pacienteId}/registros/rechazado`}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            Rechazados
          </Link>

          <div className="flex-1"></div>

          <Link
            to="/pacientes"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            Volver
          </Link>
          <Link
            to={`/pacientes/${pacienteId}/nuevo-registro`}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            + Crear Registro
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto space-y-4">
        {registros.map((registro) => (
          <div key={registro._id} className="border border-gray-200 rounded-xl p-3 shadow-sm bg-white">
            <div className="flex justify-between">
              <p className="text-sm font-medium">
                Profesional: {registro.usuario.lastName}, {registro.usuario.name}
              </p>
              <p className="text-sm text-gray-500 mb-1">{formatFechaCompleta(registro.fechaAtencion)}</p>
            </div>
            {registro.atencion.map((a) => (
              <div
                key={a._id}
                className={`text-sm mt-2 ml-2 border-l-2 pl-3 ${
                  a.pagado === "aprobado" ? "border-green-500" : a.pagado === "pendiente" ? "border-yellow-500" : "border-red-500"
                }`}
              >
                <p className="font-semibold">Tratamiento: {a.codigo?.description ?? "Sin descripción"}</p>
                <p>Honorarios: ${a.pagoDentista}</p>
                <p
                  className={`uppercase font-bold ${
                    a.pagado === "aprobado" ? "text-green-600" : a.pagado === "pendiente" ? "text-yellow-600" : "text-red-600"
                  }`}
                >
                  {a.pagado}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
