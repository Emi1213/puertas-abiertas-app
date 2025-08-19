import { useQuery } from "@tanstack/vue-query";
import type { ComputedRef } from "vue";
import type { IPerfilFilters } from "../../interfaces/IPerfilFilters";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { PerfilesDataSource } from "../../services/perfiles-datasource";

export function usePerfilesFilters(filters: ComputedRef<IPerfilFilters>) {
  const query = useQuery({
    queryKey: [QUERY_KEY.PERFILES_FILTROS, filters],
    queryFn: () => PerfilesDataSource.getInstance().search(filters.value),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return query;
}
