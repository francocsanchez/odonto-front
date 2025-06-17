import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { getAllObrasSociales } from "@/api/ObraSocialesApi";
import { importarCodigos } from "@/api/CodigosAPI";

export default function ImportCodigos() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ obraSocialId: string; archivo: FileList }>({
    defaultValues: {
      obraSocialId: "",
    },
  });

  const { data: obrasSociales, isLoading } = useQuery({
    queryKey: ["obrasSociales"],
    queryFn: getAllObrasSociales,
  });

  const { mutate } = useMutation({
    mutationFn: importarCodigos,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/codigos");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleFormSubmit = (values: { obraSocialId: string; archivo: FileList }) => {
    const formData = new FormData();
    formData.append("obraSocialId", values.obraSocialId);
    formData.append("archivo", values.archivo[0]);

    mutate(formData);
  };

  return (
    <>
      <h1 className="text-3xl font-black uppercase">Importar Códigos</h1>
      <p className="text-xl font-light text-gray-500 mt-2">Selecciona una obra social y subí el archivo para importar los códigos</p>

      <nav className="my-5">
        <Link
          to="/codigos"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase text-sm"
        >
          Volver a códigos
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto">
        <form className="mt-8 bg-white shadow-md p-8 rounded-xl space-y-6" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="space-y-2">
            <label htmlFor="obraSocialId" className="text-sm uppercase font-semibold text-gray-700">
              Obra Social
            </label>
            <select
              id="obraSocialId"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("obraSocialId", { required: "La obra social es obligatoria" })}
            >
              <option value="" disabled>
                -- Selecciona una obra social --
              </option>
              {obrasSociales?.map((obra) => (
                <option key={obra._id} value={obra._id}>
                  {obra.name}
                </option>
              ))}
            </select>
            {errors.obraSocialId && <p className="text-red-500 text-sm">{errors.obraSocialId.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="archivo" className="text-sm uppercase font-semibold text-gray-700">
              Archivo Excel
            </label>
            <input
              id="archivo"
              type="file"
              accept=".xlsx, .xls"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 file:bg-green-600 file:text-white file:font-semibold file:border-0 file:rounded-lg"
              {...register("archivo", { required: "Debes seleccionar un archivo" })}
            />
            {errors.archivo && <p className="text-red-500 text-sm">{errors.archivo.message}</p>}
          </div>

          <input
            type="submit"
            className="inline-block w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase cursor-pointer"
            value="Importar archivo"
          />
        </form>
      </div>
    </>
  );
}
