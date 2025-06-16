import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PacienteForm from "@components/pacientes/PacienteForm";
import type { PacienteFormData } from "@/types";
import { createPaciente } from "@api/PacienteAPI";

export default function CreatePaciente() {
  const navigate = useNavigate();
  const initialValues: PacienteFormData = {
    fullName: "",
    dni: "",
    number_social: "",
    obraSocial: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createPaciente,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/pacientes");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFormSubmit = (formData: PacienteFormData) => mutate(formData);
  return (
    <>
      <h1 className="text-3xl font-black uppercase">Nuevo paciente</h1>
      <p className=" text-xl font-light text-gray-500 mt-2">Completa el formulario para registrar un paciente</p>

      <nav className="my-5">
        <Link
          to="/pacientes"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase text-sm"
        >
          Volver a mis pacientes
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto">
        <form className="mt-8 bg-white shadow-md p-8 rounded-xl space-y-6" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <PacienteForm register={register} errors={errors} />

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
