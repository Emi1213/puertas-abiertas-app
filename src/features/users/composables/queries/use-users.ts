import { QUERY_KEY } from "@/shared/composables/query-key";
import { useQuery } from "@tanstack/vue-query";
import { UserDataSource } from "../../services/datasource";

export function useUsers() {
  const query = useQuery({
    queryKey: [QUERY_KEY.USERS],
    queryFn: () => new UserDataSource().getAll(),
  });
  return query;
}
