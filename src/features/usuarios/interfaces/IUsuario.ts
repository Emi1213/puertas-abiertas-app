import type { IPerfil } from "./IPerfil";

export interface IUsuario {
  id: number;
  usuario: string;
  nombre: string;
  descripcion: string | null;
  perfil: IPerfil;
}
