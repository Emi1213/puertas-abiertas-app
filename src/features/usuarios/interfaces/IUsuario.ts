import type { IPerfil } from "@/features/perfiles/interfaces/IPerfil";


export interface IUsuario {
  id: number;
  usuario: string;
  nombre: string;
  descripcion: string | null;
  perfil: IPerfil;
}

export interface ICreateUsuario extends Omit<IUsuario, "id" | "perfil"> {
  perfilId: number;
}
export interface IUpdateUsuario extends Partial<ICreateUsuario> {
  id: number;
}
