import { useQuery } from "@tanstack/vue-query";
import type { ComputedRef } from "vue";
import type { IEmpresaFilters } from "../../interfaces/IEmpresaFilters";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { EmpresaDataSource } from "../../services/datasource";

export function useEmpresasFilters(filters: ComputedRef<IEmpresaFilters>) {
  const query = useQuery({
    queryKey: [QUERY_KEY.EMPRESAS_FILTROS, filters],
    queryFn: () => EmpresaDataSource.getInstance().search(filters.value),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return query;
}
