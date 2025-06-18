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
  obraSocial: z.string(),
});

export type PacienteFormData = z.infer<typeof pacienteFormSchema>;

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

export type ObraSocial = z.infer<typeof obraSocialSchema>;

export const SelectObtraSocial = z.array(
  obraSocialSchema.pick({
    _id: true,
    name: true,
    enable: true,
  })
);

export type ObraSocialFormData = {
  name: string;
};

export const registroSchema = z.object({
  _id: z.string(),
  fechaAtencion: z.string().or(z.date()),
  usuario: z.object({
    _id: z.string(),
    name: z.string(),
    lastName: z.string(),
  }),
  atencion: z.array(
    z.object({
      _id: z.string(),
      codigo: z.object({
        _id: z.string(),
        description: z.string(),
      }),
      valor: z.number(),
      pagoDentista: z.number(),
      observaciones: z.string().optional(),
      pagado: z.enum(["aprobado", "pendiente", "rechazado"]),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const registrosSchema = z.array(registroSchema);
export type Registro = z.infer<typeof registroSchema>;

const CodigoSchema = z.object({
  _id: z.string(),
  description: z.string(),
  code: z.string(),
  validity: z.string(),
  price: z.number(),
  enable: z.boolean(),
  obraSocial: z.object({
    name: z.string(),
  }),
});

export type Codigo = z.infer<typeof CodigoSchema>;

export const CodigoFormSchema = z.object({
  code: z.string(),
  description: z.string(),
  validity: z.string(),
  price: z.number(),
  obraSocial: z.string(),
});

export type CodigoFormData = z.infer<typeof CodigoFormSchema>;
export const CodigosArraySchema = z.array(CodigoSchema);
