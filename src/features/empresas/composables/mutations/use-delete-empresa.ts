import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { CompanyDataSource } from "../../services/datasource";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useDeleteEmpresa() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => new CompanyDataSource().delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPRESAS] });
      toast.success("Empresa eliminada exitosamente.");
    },
    onError: () => {
      toast.error("Error al eliminar la empresa.");
    },
  });
}
