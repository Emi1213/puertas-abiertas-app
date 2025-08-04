import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { CompanyDataSource } from "../../services/datasource";
import type { IUpdateCompany } from "../../interfaces/ICompany";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (data: IUpdateCompany) => new CompanyDataSource().update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COMPANIES] });
      toast.success("Empresa actualizada exitosamente.");
    },
  });
}
