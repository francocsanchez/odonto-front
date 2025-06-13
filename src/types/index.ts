import { z } from "zod";

export const pacienteSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  dni: z.string(),
  number_social: z.string(),
});

export type Paciente = z.infer<typeof pacienteSchema>;
export type PacienteFormData = Pick<Paciente, "fullName" | "dni" | "number_social">;
