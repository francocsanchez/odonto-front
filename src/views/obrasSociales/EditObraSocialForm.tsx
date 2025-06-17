import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import ObraSocialForm from "@/components/obraSocial/ObraSocialForm";
import { updateObraSocial } from "@/api/ObraSocialesApi";
import type { ObraSocial, ObraSocialFormData } from "@/types";

type EditObraSocialFormProps = {
  data: ObraSocial;
  obraSocialId: ObraSocial["_id"];
};

export default function EditObraSocialForm({ data, obraSocialId }: EditObraSocialFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ObraSocialFormData>({
    defaultValues: {
      name: data.name,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateObraSocial,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["obrasSociales"] });
      queryClient.invalidateQueries({ queryKey: ["editObraSocial", obraSocialId] });
      toast.success(data.message);
      navigate("/obras-sociales");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleFormSubmit = (formData: ObraSocialFormData) => {
    mutate({ formData, obraSocialId });
  };

  return (
    <>
      <h1 className="text-3xl font-black uppercase">Editar obra social</h1>
      <p className="text-xl font-light text-gray-500 mt-2 mb-6">Modificá los datos de la obra social</p>

      <nav className="my-5">
        <Link
          to="/obras-sociales"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase text-sm"
        >
          Volver a obras sociales
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto">
        <form className="mt-8 bg-white shadow-md p-8 rounded-xl space-y-6" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <ObraSocialForm register={register} errors={errors} />

          <input
            type="submit"
            className="inline-block w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase cursor-pointer"
            value="Guardar cambios"
          />
        </form>
      </div>
    </>
  );
}
