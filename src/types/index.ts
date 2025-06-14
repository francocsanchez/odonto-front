import { z } from "zod";

export const pacienteSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  dni: z.string(),
  number_social: z.string(),
});

export const TablePacienteSchema = z.array(
  pacienteSchema.pick({
    _id: true,
    fullName: true,
    dni: true,
    number_social: true,
  })
);

export type Paciente = z.infer<typeof pacienteSchema>;
export type PacienteFormData = Pick<Paciente, "fullName" | "dni" | "number_social">;
