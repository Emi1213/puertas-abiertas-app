import { useQuery } from "@tanstack/vue-query";
import type { ComputedRef } from "vue";
import type { IUsuarioActiveDirectory } from "../../interfaces/IUsuarioActiveDirectory";
import type { IUsuarioActiveDirectoryFilters } from "../../interfaces/IUsuarioFilters";
import { UsuarioDataSource } from "../../services/usuarios-datasource";
import { QUERY_KEY } from "@/shared/composables/query-key";

export function useUsuariosActiveDirectory(
  filters: ComputedRef<IUsuarioActiveDirectoryFilters>,
  enabled: ComputedRef<boolean>
) {
  return useQuery<IUsuarioActiveDirectory[]>({
    queryKey: [QUERY_KEY.USUARIOS_ACTIVE_DIRECTORY, filters],
    queryFn: () =>
      UsuarioDataSource.getInstance().searchActiveDirectory(filters.value),
    enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
