import api from "@lib/axios";
import { SelectObtraSocial } from "@/types";
import { isAxiosError } from "axios";

export async function getAllObrasSociales() {
  try {
    const { data } = await api.get("/obras-sociales");
    const response = SelectObtraSocial.safeParse(data);

    if (!response.success) {
      throw new Error("Error en la validación de los datos de pacientes");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener los pacientes");
    }
  }
}
