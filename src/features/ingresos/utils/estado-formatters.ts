export type EstadoBadgeVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

export interface EstadoConfig {
  variant: EstadoBadgeVariant;
  class: string;
  text: string;
}

const ESTADO_CONFIGS: Record<string, EstadoConfig> = {
  activo: {
    variant: "info",
    class: "bg-blue-100 text-blue-700",
    text: "ACTIVO",
  },
  en_progreso: {
    variant: "info",
    class: "bg-blue-100 text-blue-700",
    text: "EN PROGRESO",
  },
  completado: {
    variant: "success",
    class: "bg-green-100 text-green-700",
    text: "COMPLETADO",
  },
  finalizado: {
    variant: "success",
    class: "bg-green-100 text-green-700",
    text: "FINALIZADO",
  },
  pendiente: {
    variant: "warning",
    class: "bg-yellow-100 text-yellow-700",
    text: "PENDIENTE",
  },
  cancelado: {
    variant: "error",
    class: "bg-red-100 text-red-700",
    text: "CANCELADO",
  },
  resuelto: {
    variant: "success",
    class: "bg-green-100 text-green-700",
    text: "RESUELTO",
  },
};

export const getEstadoConfig = (estado?: string): EstadoConfig => {
  if (!estado) {
    return {
      variant: "neutral",
      class: "bg-gray-100 text-gray-700",
      text: "SIN ESTADO",
    };
  }

  const config = ESTADO_CONFIGS[estado.toLowerCase()];

  return (
    config || {
      variant: "neutral",
      class: "bg-gray-100 text-gray-700",
      text: estado.replace("_", " ").toUpperCase(),
    }
  );
};
