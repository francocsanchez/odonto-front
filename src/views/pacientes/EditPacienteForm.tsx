import PacienteForm from "@/components/pacientes/PacienteForm";
import type { Paciente, PacienteFormData } from "@/types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePaciente } from "@/api/PacienteAPI";
import { toast } from "react-toastify";

type EditPacienteFormProps = {
  data: Paciente;
  pacienteId: Paciente["_id"];
};
export default function EditPacienteForm({ data, pacienteId }: EditPacienteFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: data.fullName,
      dni: data.dni,
      number_social: data.number_social,
      obraSocial: data.obraSocial._id,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updatePaciente,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
      queryClient.invalidateQueries({ queryKey: ["editPaciente", pacienteId] });
      toast.success(data.message);
      navigate("/pacientes");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleFormSubmit = (formData: PacienteFormData) => {
    const data = {
      formData,
      pacienteId,
    };

    mutate(data);
  };
  return (
    <>
      <h1 className="text-3xl font-black uppercase">Editar paciente</h1>
      <p className="text-xl font-light text-gray-500 mt-2 mb-6">Completa el formulario para editar el paciente</p>

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
            value={"Guardar cambios"}
          />
        </form>
      </div>
    </>
  );
}
