import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { CompanyDataSource } from "../../services/datasource";
import type { IUpdateEmpresa } from "../../interfaces/IEmpresa";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useUpdateEmpresa() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (data: IUpdateEmpresa) => new CompanyDataSource().update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPRESAS] });
      toast.success("Empresa actualizada exitosamente.");
    },
  });
}
