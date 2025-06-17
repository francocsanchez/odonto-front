import type { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { ObraSocialFormData } from "@/types";

type ObraSocialFormProps = {
  register: UseFormRegister<ObraSocialFormData>;
  errors: FieldErrors<ObraSocialFormData>;
};

export default function ObraSocialForm({ register, errors }: ObraSocialFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm uppercase font-semibold text-gray-700">
          Nombre de la Obra Social
        </label>
        <input
          id="name"
          type="text"
          placeholder="Ej: OSDE, Swiss Medical, etc."
          className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...register("name", {
            required: "El nombre de la obra social es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
    </div>
  );
}
