import type { IEmpresaFilters } from "@/features/empresas/interfaces/IEmpresaFilters";
import type { IPersonalFilters } from "@/features/personal/interfaces/IPersonalFilters";
import type { IUsuarioFilters } from "@/features/usuarios/interfaces/IUsuarioFilters";

export const QUERY_KEY = {
  USUARIOS: "usuarios",
  USUARIOS_FILTROS: (filters: IUsuarioFilters) => ["usuarios", filters],
  EMPRESAS: "empresas",
  EMPRESAS_FILTROS: (filters: IEmpresaFilters) => ["empresas", filters],
  PERFILES: "perfiles",
  PERSONAL_FILTROS: (filters: IPersonalFilters) => ["personal", filters],
  PERSONAL: "personal",
};
