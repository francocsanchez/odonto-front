import type { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { PacienteFormData } from "@/types";

type PacienteFormProps = {
  register: UseFormRegister<PacienteFormData>;
  errors: FieldErrors<PacienteFormData>;
};

export default function PacienteForm({ errors, register }: PacienteFormProps) {
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
        <label htmlFor="number_social" className="text-sm uppercase font-semibold text-gray-700">
          Número de Seguridad Social
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
