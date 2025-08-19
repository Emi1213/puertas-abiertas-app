// Estados principales de ingresos
export const ESTADOS_INGRESO = {
  EN_PROCESO: 'ENPROCESO',
  REGISTRO_ALARMA: 'REGISTROALARMA', 
  CERRADO: 'CERRADO',
  ALARMA_DESCOMPUESTA: 'ALARMADESCOMPUESTA',
  
  // Estados anteriores para compatibilidad
  ACTIVO: 'ACTIVO',
  FINALIZADO: 'FINALIZADO', 
  PENDIENTE: 'PENDIENTE',
  COMPLETADO: 'COMPLETADO',
  CANCELADO: 'CANCELADO',
  RESUELTO: 'RESUELTO'
} as const;

export type EstadoIngreso = typeof ESTADOS_INGRESO[keyof typeof ESTADOS_INGRESO];

// Opciones para selects/filtros
export const ESTADOS_OPCIONES = [
  { value: ESTADOS_INGRESO.EN_PROCESO, label: 'En Proceso', color: 'orange' },
  { value: ESTADOS_INGRESO.REGISTRO_ALARMA, label: 'Registro Alarma', color: 'red' },
  { value: ESTADOS_INGRESO.CERRADO, label: 'Cerrado', color: 'green' },
  { value: ESTADOS_INGRESO.ALARMA_DESCOMPUESTA, label: 'Alarma Descompuesta', color: 'gray' },
] as const;

// Opciones adicionales para compatibilidad
export const ESTADOS_LEGACY_OPCIONES = [
  { value: ESTADOS_INGRESO.ACTIVO, label: 'Activo', color: 'blue' },
  { value: ESTADOS_INGRESO.FINALIZADO, label: 'Finalizado', color: 'green' },
  { value: ESTADOS_INGRESO.PENDIENTE, label: 'Pendiente', color: 'yellow' },
] as const;

// Todas las opciones juntas
export const TODAS_ESTADOS_OPCIONES = [...ESTADOS_OPCIONES, ...ESTADOS_LEGACY_OPCIONES] as const;
