import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CodigoFormData } from "@/types";

interface Props {
  register: UseFormRegister<CodigoFormData>;
  errors: FieldErrors<CodigoFormData>;
  obrasSociales: { _id: string; name: string }[];
}

export default function CodigoForm({ register, errors, obrasSociales }: Props) {
  return (
    <>
      <div>
        <label className="block text-sm font-bold mb-2">Código</label>
        <input type="text" {...register("code", { required: "El código es obligatorio" })} className="w-full border px-3 py-2 rounded-xl" />
        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Descripción</label>
        <input
          type="text"
          {...register("description", { required: "La descripción es obligatoria" })}
          className="w-full border px-3 py-2 rounded-xl"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Vigencia</label>
        <input type="date" {...register("validity", { required: "La vigencia es obligatoria" })} className="w-full border px-3 py-2 rounded-xl" />
        {errors.validity && <p className="text-red-500 text-sm mt-1">{errors.validity.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Precio</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "El precio es obligatorio",
            min: { value: 0, message: "El precio no puede ser negativo" },
          })}
          className="w-full border px-3 py-2 rounded-xl"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Obra Social</label>
        <select {...register("obraSocial", { required: "Selecciona una obra social" })} className="w-full border px-3 py-2 rounded-xl">
          <option value="">-- Seleccionar --</option>
          {obrasSociales.map((os) => (
            <option key={os._id} value={os._id}>
              {os.name}
            </option>
          ))}
        </select>
        {errors.obraSocial && <p className="text-red-500 text-sm mt-1">{errors.obraSocial.message}</p>}
      </div>
    </>
  );
}
