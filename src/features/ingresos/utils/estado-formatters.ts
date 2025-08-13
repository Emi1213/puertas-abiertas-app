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
    class: "bg-blue-50 text-blue-700 border border-blue-200",
    text: "Activo",
  },
  en_progreso: {
    variant: "info",
    class: "bg-blue-50 text-blue-700 border border-blue-200",
    text: "En progreso",
  },
  completado: {
    variant: "success",
    class: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    text: "Completado",
  },
  finalizado: {
    variant: "success",
    class: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    text: "Finalizado",
  },
  pendiente: {
    variant: "warning",
    class: "bg-amber-50 text-amber-700 border border-amber-200",
    text: "Pendiente",
  },
  cancelado: {
    variant: "error",
    class: "bg-rose-50 text-rose-700 border border-rose-200",
    text: "Cancelado",
  },
  resuelto: {
    variant: "success",
    class: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    text: "Resuelto",
  },
};

export const getEstadoConfig = (estado?: string): EstadoConfig => {
  if (!estado) {
    return {
      variant: "neutral",
      class: "bg-gray-50 text-gray-600 border border-gray-200",
      text: "Sin estado",
    };
  }

  const config = ESTADO_CONFIGS[estado.toLowerCase()];

  return (
    config || {
      variant: "neutral",
      class: "bg-gray-50 text-gray-600 border border-gray-200",
      text: estado.replace("_", " "),
    }
  );
};
