import type { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type PacienteFormProps = {
  register: UseFormRegister<{
    fullName: string;
    dni: string;
    number_social: string;
  }>;
  errors: FieldErrors<{
    fullName: string;
    dni: string;
    number_social: string;
  }>;
};
export default function PacienteForm({ errors, register }: PacienteFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="fullName" className="text-sm uppercase font-bold">
          Nombre del Paciente
        </label>
        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("fullName", {
            required: "El nombre del paciente es obligatorio",
          })}
        />

        {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="dni" className="text-sm uppercase font-bold">
          DNI
        </label>
        <input
          id="dni"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("dni", {
            required: "El DNI es obligatorio",
          })}
        />

        {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="number_social" className="text-sm uppercase font-bold">
          Numero de Seguridad Social
        </label>
        <input
          id="number_social"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("number_social", {
            required: "El Numero de Seguridad Social es obligatorio",
          })}
        />

        {errors.number_social && <ErrorMessage>{errors.number_social.message}</ErrorMessage>}
      </div>
    </>
  );
}
