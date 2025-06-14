import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllPacientes } from "@/api/PacienteAPI";

export default function ListPacientes() {
  const { data, isLoading } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getAllPacientes,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (data)
    return (
      <>
        <h1 className="text-3xl font-black uppercase">Pacientes</h1>
        <p className=" text-xl font-light text-gray-500 mt-2">Listado de pacients</p>

        <nav className="my-5">
          <Link
            to="/pacientes/create"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            + Nuevo paciente
          </Link>
        </nav>

        {data.length === 0 ? (
          <p className="text-gray-500 text-xl font-light">
            No hay pacientes creados {""} <Link to={"pacientes/create"}>Crear Paciente</Link>
          </p>
        ) : (
          <table className="w-full mt-6 table-auto rounded-xl overflow-hidden shadow-md bg-white">
            <thead className="bg-purple-100 text-purple-900 uppercase text-sm tracking-wide">
              <tr>
                <th className="px-5 py-3 text-left">Nombre Completo</th>
                <th className="px-5 py-3 text-center">DNI</th>
                <th className="px-5 py-3 text-center">Número de Seguro Social</th>
                <th className="px-5 py-3 text-center w-32"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((paciente) => (
                <tr key={paciente._id} className="border-b last:border-0 hover:bg-purple-50 transition-colors">
                  <td className="px-5 py-4 text-gray-700 font-medium">{paciente.fullName}</td>
                  <td className="px-5 py-4 text-gray-600 text-center">{paciente.dni}</td>
                  <td className="px-5 py-4 text-gray-600 text-center">{paciente.number_social}</td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button className="text-sm text-purple-600 hover:text-purple-800 font-semibold mr-2">Ver</button>
                      <Link to={`/pacientes/${paciente._id}/edit`} className="text-sm text-blue-600 hover:text-blue-800 font-semibold mr-2">
                        Editar
                      </Link>
                      <button className="text-sm text-red-500 hover:text-red-700 font-semibold">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
}
