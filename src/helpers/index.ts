export function formatFechaCompleta(fecha: string | Date): string {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
