import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import type { ObraSocialFormData } from "@/types";
import { createObraSocial } from "@api/ObraSocialesApi";
import ObraSocialForm from "@/components/obraSocial/ObraSocialForm";

export default function CreateObraSocial() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ObraSocialFormData>({
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: createObraSocial,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/obras-sociales");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleFormSubmit = (formData: ObraSocialFormData) => mutate(formData);

  return (
    <>
      <h1 className="text-3xl font-black uppercase">Nueva Obra Social</h1>
      <p className="text-xl font-light text-gray-500 mt-2">Completa el formulario para registrar una obra social</p>

      <nav className="my-5">
        <Link
          to="/obras-sociales"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase text-sm"
        >
          Volver a obras sociales
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto">
        <form className="mt-8 bg-white shadow-md p-8 rounded-xl space-y-6" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <ObraSocialForm register={register} errors={errors} />

          <input
            type="submit"
            className="inline-block w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase cursor-pointer"
            value="Crear Obra Social"
          />
        </form>
      </div>
    </>
  );
}
