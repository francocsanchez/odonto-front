import { CodigosArraySchema } from "@/types";
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
