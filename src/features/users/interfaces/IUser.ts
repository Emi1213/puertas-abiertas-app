import type { IPerfil } from "./IPerfil";

export interface IUser {
  id: number;
  usuario: string;
  nombre: string;
  descripcion: string | null;
  perfil: IPerfil;
}
