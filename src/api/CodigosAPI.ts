import { CodigosArraySchema, CodigosSelectArraySchema, type Codigo, type CodigoFormData, type CodigoSelect } from "@/types";
import api from "@lib/axios";
import { isAxiosError } from "axios";

export async function getAllCodigos() {
  try {
    const { data } = await api.get("/codigos");

    const result = CodigosArraySchema.safeParse(data);
    if (!result.success) {
      throw new Error("Error en la validación de los datos de códigos");
    }

    return result.data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener los códigos");
    }
    throw new Error("Error al obtener los códigos");
  }
}

export async function importarCodigos(formData: FormData) {
  try {
    const { data } = await api.post("/codigos/importar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al importar los códigos");
    }
    throw new Error("Error de conexión");
  }
}

export async function createCodigo(formData: CodigoFormData) {
  try {
    const { obraSocial, ...datosCodigo } = formData;

    const { data } = await api.post(`/codigos/${obraSocial}/create`, datosCodigo);
    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al crear el código");
    } else {
      throw new Error("Error desconocido al crear el código");
    }
  }
}

export async function deleteCodigo(codigoId: string) {
  try {
    const { data } = await api.patch(`/codigos/${codigoId}/change-state`);
    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al eliminar el código");
    } else {
      throw new Error("Error desconocido al eliminar el código");
    }
  }
}

export async function getCodigosByPaciente(pacienteId: string): Promise<CodigoSelect[]> {
  try {
    const { data } = await api.get(`/codigos/${pacienteId}/codigos`);
    return CodigosSelectArraySchema.parse(data);
  } catch (error) {
    console.error("Error al obtener códigos por usuario:", error);
    throw new Error("No se pudieron obtener los códigos");
  }
}
