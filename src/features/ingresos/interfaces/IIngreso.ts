import type { IPersonal } from "@/features/personal/interfaces/IPersonal";
import type { IUsuario } from "@/features/usuarios/interfaces/IUsuario";

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
  usuarioReconId?: number | null;
  usuarioRecon?: IUsuario;
  estado?: string;
  personal?: IPersonal;
}
