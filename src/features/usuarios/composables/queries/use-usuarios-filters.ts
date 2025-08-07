import { QUERY_KEY } from "@/shared/composables/query-key";
import { useQuery } from "@tanstack/vue-query";
import type { IUsuarioFilters } from "../../interfaces/IUsuarioFilters";
import type { ComputedRef } from "vue";
import { UsuarioDataSource } from "../../services/datasource";

export function useUsuariosFilters(filters: ComputedRef<IUsuarioFilters>) {
  const query = useQuery({
    queryKey: [QUERY_KEY.USUARIOS_FILTROS, filters],
    queryFn: () => new UsuarioDataSource().search(filters.value),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return query;
}
