import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PacienteForm from "@components/pacientes/PacienteForm";
import type { PacienteFormData } from "@/types";
import { createPaciente } from "@api/PacienteAPI";

export default function CreatePaciente() {
  const navigate = useNavigate();
  const initialValues: PacienteFormData = {
    fullName: "",
    dni: "",
    number_social: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleFormSubmit = async (data: PacienteFormData) => {
    await createPaciente(data);
    navigate("/");
  };
  return (
    <>
      <h1 className="text-3xl font-black uppercase">Nuevo paciente</h1>
      <p className=" text-xl font-light text-gray-500 mt-2">Completa el formulario para registrar un paciente</p>

      <nav className="my-5">
        <Link to="/" className="bg-purple-400 hover:bg-purple-500 transition-colors px-10 py-3 text-white text-xl font-bold cursor-pointer">
          Volver a mis registros
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto">
        <form className=" mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <PacienteForm register={register} errors={errors} />
          <input
            type="submit"
            value="Crear paciente"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
