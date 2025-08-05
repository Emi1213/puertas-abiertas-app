import type { IEmpresaFilters } from "@/features/empresas/interfaces/IEmpresaFilters";

export const QUERY_KEY = {
  USUARIOS: "usuarios",
  EMPRESAS: "empresas",
  EMPRESAS_FILTROS: (filters: IEmpresaFilters) => ["empresas", filters],
  PERFILES: "perfiles",
};
