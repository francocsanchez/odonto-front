import api from "@lib/axios";
import { obraSocialSchema, SelectObtraSocial, type ObraSocialFormData } from "@/types";
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

export async function getObraSocialById(id: string) {
  try {
    const { data } = await api.get(`/obras-sociales/${id}`);
    const response = obraSocialSchema.safeParse(data);

    if (!response.success) {
      throw new Error("Error en la validación de los datos de la obra social");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener la obra social");
    }
  }
}

export async function createObraSocial(formData: ObraSocialFormData) {
  try {
    const { data } = await api.post("/obras-sociales", formData);
    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al crear la obra social");
    } else {
      throw new Error("Error desconocido al crear la obra social");
    }
  }
}

type UpdateObraSocialArgs = {
  obraSocialId: string;
  formData: ObraSocialFormData;
};

export async function updateObraSocial({ obraSocialId, formData }: UpdateObraSocialArgs) {
  try {
    const { data } = await api.put(`/obras-sociales/${obraSocialId}`, formData);
    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al actualizar la obra social");
    } else {
      throw new Error("Error desconocido al actualizar la obra social");
    }
  }
}
