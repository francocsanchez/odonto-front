import type { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { PacienteFormData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getAllObrasSociales } from "@/api/ObraSocialesApi";

type PacienteFormProps = {
  register: UseFormRegister<PacienteFormData>;
  errors: FieldErrors<PacienteFormData>;
};

export default function PacienteForm({ errors, register }: PacienteFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["obrasSociales"],
    queryFn: getAllObrasSociales,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (data)
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm uppercase font-semibold text-gray-700">
            Nombre del Paciente
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Juan Pérez"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...register("fullName", {
              required: "El nombre del paciente es obligatorio",
            })}
          />
          {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
        </div>

        <div className="space-y-2">
          <label htmlFor="dni" className="text-sm uppercase font-semibold text-gray-700">
            DNI
          </label>
          <input
            id="dni"
            type="text"
            placeholder="12345678"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...register("dni", {
              required: "El DNI es obligatorio",
            })}
          />
          {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
        </div>

        <div className="space-y-2">
          <label htmlFor="obraSocial" className="text-sm uppercase font-semibold text-gray-700">
            Obra Social
          </label>
          <select
            id="obraSocial"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            {...register("obraSocial", {
              required: "La obra social es obligatoria",
            })}
          >
            <option value="" disabled>
              -- Selecciona una obra social --
            </option>
            {data.map((obraSocial) => {
              return (
                <option value={obraSocial._id} key={obraSocial._id}>
                  {obraSocial.name}
                </option>
              );
            })}
          </select>
          {errors.obraSocial && <ErrorMessage>{errors.obraSocial.message}</ErrorMessage>}
        </div>

        <div className="space-y-2">
          <label htmlFor="number_social" className="text-sm uppercase font-semibold text-gray-700">
            Número de Obra Social
          </label>
          <input
            id="number_social"
            type="text"
            placeholder="0123-456789"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...register("number_social", {
              required: "El Número de Seguridad Social es obligatorio",
            })}
          />
          {errors.number_social && <ErrorMessage>{errors.number_social.message}</ErrorMessage>}
        </div>
      </div>
    );
}
