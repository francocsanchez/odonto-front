import { type UseFormRegister, type FieldErrors, useFieldArray, type Control } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import type { RegistroFormData, CodigoSelect } from "@/types";
import { getCodigosByPaciente } from "@/api/CodigosAPI";

interface Props {
  register: UseFormRegister<RegistroFormData>;
  errors: FieldErrors<RegistroFormData>;
  control: Control<RegistroFormData>;
  pacienteId: string;
}

export default function RegistroForm({ register, errors, control, pacienteId }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "atencion",
  });

  const { data: codigos = [], isLoading } = useQuery<CodigoSelect[]>({
    queryKey: ["codigos", pacienteId],
    queryFn: () => getCodigosByPaciente(pacienteId),
  });

  return (
    <>
      <div>
        <label className="block text-sm font-bold mb-2">Fecha de Atención</label>
        <input type="date" {...register("fechaAtencion", { required: "La fecha es obligatoria" })} className="w-full border px-3 py-2 rounded-xl" />
        {errors.fechaAtencion && <p className="text-red-500 text-sm">{errors.fechaAtencion.message}</p>}
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-xl my-4">
          <h3 className="font-semibold mb-2">Atención {index + 1}</h3>

          <select {...register(`atencion.${index}.codigo`)} className="w-full border px-3 py-2 rounded-xl mb-2" disabled={isLoading}>
            <option value="">Seleccionar código</option>
            {codigos.map((codigo) => (
              <option key={codigo._id} value={codigo._id}>
                {codigo.description} ({codigo.code})
              </option>
            ))}
          </select>

          <textarea
            {...register(`atencion.${index}.observaciones`)}
            placeholder="Observaciones"
            className="w-full border px-3 py-2 rounded-xl mb-2 resize-none"
            rows={3}
          />

          <button type="button" className="text-red-600 text-sm" onClick={() => remove(index)}>
            Eliminar Atención
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            codigo: "",
            observaciones: "",
          })
        }
        className="inline-flex items-center gap-2 bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold text-sm py-2 px-5 rounded-xl shadow-sm transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Agregar Atención
      </button>
    </>
  );
}
