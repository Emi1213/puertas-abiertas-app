import type { IModulo } from "@/features/modulos/interfaces/IModulo";

export interface IPerfil {
  id: number;
  nombre: string;
  descripcion: string | null;
  modulos: IModulo[] | [];
}

export interface ICreatePerfil extends Omit<IPerfil, "id" | "modulos"> {
  modulosIds: number[];
}
export interface IUpdatePerfil extends Partial<ICreatePerfil> {
  id: number;
}
