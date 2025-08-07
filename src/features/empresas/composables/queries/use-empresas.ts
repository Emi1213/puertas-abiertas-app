import { QUERY_KEY } from "@/shared/composables/query-key";
import { useQuery } from "@tanstack/vue-query";
import { EmpresaDataSource } from "../../services/datasource";

export function useEmpresas() {
  const query = useQuery({
    queryKey: [QUERY_KEY.EMPRESAS],
    queryFn: () => EmpresaDataSource.getInstance().getAll(),
  });
  return query;
}
