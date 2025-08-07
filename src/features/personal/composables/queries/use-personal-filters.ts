import type { ComputedRef } from "vue";
import type { IPersonalFilters } from "../../interfaces/IPersonalFilters";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { PersonalDataSource } from "../../services/personal-datasource";
import { useQuery } from "@tanstack/vue-query";

export function usePersonalFilters(filters: ComputedRef<IPersonalFilters>) {
  const query = useQuery({
    queryKey: [QUERY_KEY.PERSONAL_FILTROS, filters],
    queryFn: () => PersonalDataSource.getInstance().search(filters.value),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return query;
}
