import { getPacienteById } from "@/api/PacienteAPI";
import { createRegistro } from "@/api/RegistrosAPI";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import RegistroForm from "@/components/registro/RegistroForm";
import type { RegistroFormData } from "@/types";

export default function CrearRegistro() {
  const { pacienteId } = useParams();
  const navigate = useNavigate();

  const { data: paciente, isLoading: loadingPaciente } = useQuery({
    queryKey: ["paciente", pacienteId],
    queryFn: () => getPacienteById(pacienteId!),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistroFormData>({
    defaultValues: {
      fechaAtencion: "",
      paciente: pacienteId || "",
      atencion: [],
    },
  });

  const { mutate } = useMutation({
    mutationFn: createRegistro,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/pacientes/${pacienteId}/registros`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (paciente)
    return (
      <>
        <h1 className="text-3xl font-black uppercase">{paciente.fullName}</h1>
        <p className=" text-xl font-light text-gray-500 mt-2">Completa el formulario para registrar una atención</p>
        <nav className="my-5">
          <Link
            to={`/pacientes/${pacienteId}/registros`}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase text-sm"
          >
            Volver a los registros
          </Link>
        </nav>

        <div className="max-w-3xl mx-auto">
          <form
            className="mt-8 bg-white shadow-md p-8 rounded-xl space-y-6"
            onSubmit={handleSubmit((data) => mutate({ ...data, paciente: pacienteId! }))}
            noValidate
          >
            <RegistroForm register={register} errors={errors} control={control} pacienteId={paciente._id} />

            <input
              type="submit"
              className="inline-block w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 uppercase cursor-pointer"
              value={"Guardar Registro"}
            />
          </form>
        </div>
      </>
    );
}
