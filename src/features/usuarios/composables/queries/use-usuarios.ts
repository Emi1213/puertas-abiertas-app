import { QUERY_KEY } from "@/shared/composables/query-key";
import { useQuery } from "@tanstack/vue-query";
import { UsuarioDataSource } from "../../services/datasource";

export function useUsers() {
  const query = useQuery({
    queryKey: [QUERY_KEY.USERS],
    queryFn: () => new UsuarioDataSource().getAll(),
  });
  return query;
}
