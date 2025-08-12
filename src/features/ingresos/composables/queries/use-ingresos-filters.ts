  import type { ComputedRef } from "vue";
  import type { IIngresoFilters } from "../../interfaces/IIngresoFilters";
  import { useQuery } from "@tanstack/vue-query";
  import { QUERY_KEY } from "@/shared/composables/query-key";
  import { IngresosDataSource } from "../../services/ingresos-datasource";

  export function useIngresosFilters(filters: ComputedRef<IIngresoFilters>) {
    const query = useQuery({
      queryKey: [QUERY_KEY.INGRESOS_FILTROS, filters],
      queryFn: () => IngresosDataSource.getInstance().search(filters.value),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
    return query;
  }
