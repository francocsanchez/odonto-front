import api from "@lib/axios";
import type { PacienteFormData } from "@/types";

export async function createPaciente(formData: PacienteFormData) {
  try {
    const { data } = await api.post("/pacientes", formData);
    console.log("Paciente creado:", data);
  } catch (error) {
    console.log("Error al crear paciente:", error);
  }
}
