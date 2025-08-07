import type { IPersonal } from "@/features/personal/interfaces/IPersonal";

export interface IIngreso {
  id: number;
  fechaInicio: Date;
  fechaFin?: Date;
  duracion: string;
  comentario?: string;
  idMotivo?: string;
  tipoMotivo?: string;
  causa?: string;
  fechaRecon?: Date;
  estado?: string;
  personal?: IPersonal;
}
