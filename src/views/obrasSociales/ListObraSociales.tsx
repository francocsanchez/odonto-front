import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteObraSocial, getAllObrasSocialesActives } from "@/api/ObraSocialesApi";
import { toast } from "react-toastify";

export default function ListObraSociales() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["obrasSociales"],
    queryFn: getAllObrasSocialesActives,
  });

  const { mutate } = useMutation({
    mutationFn: deleteObraSocial,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["obrasSociales"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
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
          <div className="flex flex-col gap-4 mt-6">
            {data.map((obraSocial) => {
              const isDisabled = obraSocial.enable === false;

              return (
                <div
                  key={obraSocial._id}
                  className={`flex items-center justify-between border rounded-2xl px-6 py-4 shadow-sm transition-shadow ${
                    isDisabled ? "bg-gray-200 text-gray-500" : "bg-white text-gray-800 hover:shadow-md"
                  }`}
                >
                  <h2 className="text-lg font-semibold uppercase">{obraSocial.name}</h2>

                  <div className="flex gap-3">
                    <Link
                      to={`/obras-sociales/${obraSocial._id}/edit`}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-1.5 px-4 rounded-xl shadow transition-all duration-200 uppercase"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => mutate(obraSocial._id)}
                      className={`text-white text-sm font-semibold py-1.5 px-4 rounded-xl shadow transition-all duration-200 uppercase ${
                        isDisabled ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {isDisabled ? "Activar" : "Eliminar"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
}
