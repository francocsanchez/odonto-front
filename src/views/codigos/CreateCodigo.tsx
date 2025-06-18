import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import type { CodigoFormData } from "@/types";
import { createCodigo } from "@api/CodigosAPI";
import { getAllObrasSociales } from "@api/ObraSocialesApi";
import CodigoForm from "@/components/codigos/CodigoForm";

export default function CreateCodigo() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodigoFormData>({
    defaultValues: {
      code: "",
      description: "",
      validity: "",
      price: 0,
      obraSocial: "",
    },
  });

  const { data: obrasSociales } = useQuery({
    queryKey: ["obras-sociales"],
    queryFn: getAllObrasSociales,
  });

  const { mutate } = useMutation({
    mutationFn: createCodigo,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/codigos");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleFormSubmit = (formData: CodigoFormData) => mutate(formData);

  return (
    <>
      <h1 className="text-3xl font-black uppercase">Nuevo Código</h1>
      <p className="text-xl font-light text-gray-500 mt-2">Completa el formulario para registrar un nuevo código</p>

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
          {obrasSociales && <CodigoForm register={register} errors={errors} obrasSociales={obrasSociales} />}

          <input
            type="submit"
            className="inline-block w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase cursor-pointer"
            value="Crear Código"
          />
        </form>
      </div>
    </>
  );
}
