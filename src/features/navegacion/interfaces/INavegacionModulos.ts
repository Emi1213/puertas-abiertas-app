import type { IModulo } from "@/features/modulos/interfaces/IModulo";

export interface INavegacionModulos {
  perfilId: number;
  rbacVersion: number;
  modulos: IModulo[];
}
