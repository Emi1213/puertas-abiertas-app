import { QUERY_KEY } from "@/shared/composables/query-key";
import { useQuery } from "@tanstack/vue-query";
import { PerfilesDataSource } from "../../services/perfiles-datasource";

export function usePerfiles() {
  const query = useQuery({
    queryKey: [QUERY_KEY.PERFILES],
    queryFn: () => PerfilesDataSource.getInstance().getAll(),
  });
  return query;
}
