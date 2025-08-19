import { QUERY_KEY } from "@/shared/composables/query-key";
import { useQuery } from "@tanstack/vue-query";
import { ModuloDatasource } from "../../services/modulo-datasource";

export function useModulos() {
  const query = useQuery({
    queryKey: [QUERY_KEY.MODULOS],
    queryFn: () => ModuloDatasource.getInstance().getAll(),
  });
  return query;
}
