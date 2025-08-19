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
  enproceso: {
    variant: "warning",
    class: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    text: "En Proceso",
  },
  en_proceso: {
    variant: "warning",
    class: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    text: "En Proceso",
  },
  "en proceso": {
    variant: "warning",
    class: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    text: "En Proceso",
  },
  registroalarma: {
    variant: "error",
    class: "bg-red-100 text-red-800 border border-red-300",
    text: "Registro Alarma",
  },
  registro_alarma: {
    variant: "error",
    class: "bg-red-100 text-red-800 border border-red-300",
    text: "Registro Alarma",
  },
  "registro alarma": {
    variant: "error",
    class: "bg-red-100 text-red-800 border border-red-300",
    text: "Registro Alarma",
  },
  cerrado: {
    variant: "success",
    class: "bg-green-100 text-green-800 border border-green-300",
    text: "Cerrado",
  },
  alarmadescompuesta: {
    variant: "neutral",
    class: "bg-gray-100 text-gray-800 border border-gray-300",
    text: "Alarma Descompuesta",
  },
  alarma_descompuesta: {
    variant: "neutral",
    class: "bg-gray-100 text-gray-800 border border-gray-300",
    text: "Alarma Descompuesta",
  },
  "alarma descompuesta": {
    variant: "neutral",
    class: "bg-gray-100 text-gray-800 border border-gray-300",
    text: "Alarma Descompuesta",
  },
  // Mantener estados anteriores por compatibilidad
  activo: {
    variant: "info",
    class: "bg-blue-50 text-blue-700 border border-blue-200",
    text: "Activo",
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
