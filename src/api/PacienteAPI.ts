import api from "@lib/axios";
import { pacienteSchema, TablePacienteSchema, type Paciente, type PacienteFormData } from "@/types";
import { isAxiosError } from "axios";

export async function createPaciente(formData: PacienteFormData) {
  try {
    const { data } = await api.post("/pacientes", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al crear el paciente");
    }
  }
}

export async function getAllPacientes() {
  try {
    const { data } = await api.get("/pacientes");
    const response = TablePacienteSchema.safeParse(data);

    if (!response.success) {
      throw new Error("Error en la validación de los datos de pacientes");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener los pacientes");
    }
  }
}

export async function getPacienteById(pacienteId: string) {
  try {
    const { data } = await api.get(`/pacientes/${pacienteId}`);
    console.log(data);
    const response = pacienteSchema.safeParse(data);

    if (!response.success) {
      throw new Error("Error en la validación de los datos de pacientes");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener el paciente");
    }
  }
}

type PacienteAPIType = {
  formData: PacienteFormData;
  pacienteId: Paciente["_id"];
};

export async function updatePaciente({ formData, pacienteId }: PacienteAPIType) {
  try {
    const { data } = await api.put(`/pacientes/${pacienteId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al actualizar el paciente");
    }
  }
}
