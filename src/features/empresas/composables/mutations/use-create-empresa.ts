import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { CompanyDataSource } from "../../services/datasource";
import type { ICreateEmpresa } from "../../interfaces/IEmpresa";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useCreateEmpresa() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (datos: ICreateEmpresa) =>
      new CompanyDataSource().create(datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPRESAS] });
      toast.success("Empresa creada exitosamente.");
    },
  });
}
