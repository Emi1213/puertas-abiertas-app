import type { IEmpresa } from "@/features/empresas/interfaces/IEmpresa";

export interface IPersonal {
  id: number;
  nombres: string;
  apellidos: string;
  estado: boolean;
  empresa: IEmpresa;
}

