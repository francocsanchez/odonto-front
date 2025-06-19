import api from "@lib/axios";
import { registrosSchema, type RegistroFormData } from "@/types";
import { isAxiosError } from "axios";

export async function getAllRegistrosById(pacienteId: string) {
  try {
    const { data } = await api.get(`/pacientes/${pacienteId}/registros`);
    const response = registrosSchema.safeParse(data);

    if (!response.success) throw new Error("Error en la validación de los registros");

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener los pacientes");
    }
    throw error;
  }
}

export async function getAllRegistrosByPacienteIDWithEstado(pacienteId: string, estado: string) {
  try {
    const { data } = await api.get(`/pacientes/${pacienteId}/registros/${estado}`);

    const response = registrosSchema.safeParse(data);

    if (!response.success) throw new Error("Error en la validación de los registros");

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener los pacientes");
    }
    throw error;
  }
}

export async function createRegistro(formData: RegistroFormData) {
  try {
    const { data } = await api.post(`/registros/${formData.paciente}/create`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors[0].msg);
    } else {
      throw new Error("Error desconocido al crear el registro");
    }
  }
}
