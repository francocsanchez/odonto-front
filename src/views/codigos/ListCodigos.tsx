import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCodigos } from "@/api/CodigosAPI";
import { formatMonthYear, formatPrice } from "@/helpers";
import { TableCellsIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function ListCodigos() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["codigos"],
    queryFn: getAllCodigos,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <>
        <h1 className="text-3xl font-black uppercase">Códigos</h1>
        <p className="text-xl font-light text-gray-500 mt-2">Listado de códigos cargados</p>

        <nav className="my-5">
          <div className="flex justify-between">
            <Link
              to="/codigos/create"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
            >
              <PlusCircleIcon className="h-5 w-5 text-white" /> Nuevo Código
            </Link>
            <Link
              to="/codigos/importar"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
            >
              <TableCellsIcon className="h-5 w-5 text-white" />
              Importar archivo
            </Link>
          </div>
        </nav>

        {data.length === 0 ? (
          <p className="text-gray-500 text-xl font-light">
            No hay códigos creados{" "}
            <Link to="/codigos/create">
              <span className="font-bold text-purple-600 hover:text-purple-800">Crear Código</span>
            </Link>
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full table-auto rounded-xl overflow-hidden shadow-md bg-white">
              <thead className="bg-purple-100 text-purple-900 uppercase text-sm tracking-wide">
                <tr>
                  <th className="px-5 py-3 text-center">Código</th>
                  <th className="px-5 py-3 text-left">Descripción</th>
                  <th className="px-5 py-3 text-center">Validez</th>
                  <th className="px-5 py-3 text-center">Precio</th>
                  <th className="px-5 py-3 text-center">Obra Social</th>
                  <th className="px-5 py-3 text-center w-32"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((codigo) => (
                  <tr
                    key={codigo._id}
                    className={`border-b last:border-0 ${
                      !codigo.enable ? "bg-gray-100 opacity-60 text-gray-400" : "hover:bg-purple-50 transition-colors text-gray-700"
                    }`}
                  >
                    <td className="px-5 py-4 text-gray-600 text-center">{codigo.code}</td>
                    <td className="px-5 py-4 text-gray-700 font-medium">{codigo.description}</td>
                    <td className="px-5 py-4 text-gray-700 font-medium text-center">{formatMonthYear(codigo.validity)}</td>
                    <td className="px-5 py-4 text-gray-600 text-center">{formatPrice(codigo.price)}</td>
                    <td className="px-5 py-4 text-gray-600 text-center">{codigo.obraSocial?.name}</td>
                    <td className="px-5 py-4 text-center">
                      <Link
                        to={`/codigos/${codigo._id}/edit`}
                        className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-1.5 px-4 rounded-xl shadow transition-all duration-200 uppercase"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
}
