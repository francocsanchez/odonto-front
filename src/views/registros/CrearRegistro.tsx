import { getPacienteById } from "@/api/PacienteAPI";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export default function CrearRegistro() {
  const { pacienteId } = useParams();

  const { data: paciente, isLoading: loadingPaciente } = useQuery({
    queryKey: ["paciente", pacienteId],
    queryFn: () => getPacienteById(pacienteId!),
  });

  if (paciente)
    return (
      <>
        <h1 className="text-3xl font-black uppercase">{paciente.fullName}</h1>
        <p className=" text-xl font-light text-gray-500 mt-2">Completa el formulario para registrar una atención</p>
        <nav className="my-5">
          <Link
            to={`/pacientes/${pacienteId}/registros`}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase text-sm"
          >
            Volver a los registros
          </Link>
        </nav>

        <div className="max-w-3xl mx-auto">
          <form className="mt-8 bg-white shadow-md p-8 rounded-xl space-y-6" noValidate>
            <input
              type="submit"
              className="inline-block w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase cursor-pointer"
              value={"Crear Paciente"}
            />
          </form>
        </div>
      </>
    );
}
