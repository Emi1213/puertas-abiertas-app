import { QUERY_KEY } from "@/shared/composables/query-key";
import { useQuery } from "@tanstack/vue-query";
import { CompanyDataSource } from "../../services/datasource";

export function useCompanies() {
  const query = useQuery({
    queryKey: [QUERY_KEY.COMPANIES],
    queryFn: () => new CompanyDataSource().getAll(),
  });
  return query;
}
