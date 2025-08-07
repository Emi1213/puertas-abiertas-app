import type { IEmpresa } from "@/features/empresas/interfaces/IEmpresa";

export interface IPersonal {
  id: number;
  nombres: string;
  apellidos: string;
  estado: boolean;
  empresa: IEmpresa;
}

export interface ICreatePersonal extends Omit<IPersonal, "id" | "empresa"> {
  empresaId: number;
}

export interface IUpdatePersonal extends Partial<ICreatePersonal> {
  id: number;
}
