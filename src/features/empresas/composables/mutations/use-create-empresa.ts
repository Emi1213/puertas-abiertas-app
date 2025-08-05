import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { CompanyDataSource } from "../../services/datasource";
import type { ICreateCompany } from "../../interfaces/ICompany";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useCreateEmpresa() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (data: ICreateCompany) => new CompanyDataSource().create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COMPANIES] });
      toast.success("Empresa creada exitosamente.");
    },
  });
}
