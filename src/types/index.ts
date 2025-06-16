import { z } from "zod";

export const pacienteSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  dni: z.string(),
  obraSocial: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  number_social: z.string(),
});

export const TablePacienteSchema = z.array(
  pacienteSchema.pick({
    _id: true,
    fullName: true,
    dni: true,
    obraSocial: true,
    number_social: true,
  })
);

export type Paciente = z.infer<typeof pacienteSchema>;

export const pacienteFormSchema = z.object({
  fullName: z.string(),
  dni: z.string(),
  number_social: z.string(),
  obraSocial: z.string(), // solo el _id
});
export const obraSocialSchema = z.object({
  _id: z.string(),
  name: z.string(),
  enable: z.boolean(),
  codes: z.array(
    z.object({
      _id: z.string(),
    })
  ),
});
export type PacienteFormData = z.infer<typeof pacienteFormSchema>;

export const SelectObtraSocial = z.array(
  obraSocialSchema.pick({
    _id: true,
    name: true,
  })
);
