import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllObrasSociales } from "@/api/ObraSocialesApi";

export default function ListObraSociales() {
  const { data, isLoading } = useQuery({
    queryKey: ["obrasSociales"],
    queryFn: getAllObrasSociales,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (data)
    return (
      <>
        <h1 className="text-3xl font-black uppercase">Obras Sociales</h1>
        <p className="text-xl font-light text-gray-500 mt-2">Listado de obras sociales</p>

        <nav className="my-5">
          <Link
            to="/obras-sociales/create"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase"
          >
            + Nueva Obra Social
          </Link>
        </nav>

        {data.length === 0 ? (
          <p className="text-gray-500 text-xl font-light">
            No hay obras sociales creadas{" "}
            <Link to="/obras-sociales/create">
              <span className="font-bold text-purple-600 hover:text-purple-800">Crear Obra Social</span>
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {data.map((obraSocial) => (
              <div key={obraSocial._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center uppercase">{obraSocial.name}</h2>

                <div className="flex justify-between">
                  <Link
                    to={`/obras-sociales/${obraSocial._id}/edit`}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-1.5 px-4 rounded-xl shadow transition-all duration-200 uppercase"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => console.log("Eliminando")}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-1.5 px-4 rounded-xl shadow transition-all duration-200 uppercase"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
}
