import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { EmpresaDataSource } from "../../services/datasource";
import type { IUpdateEmpresa } from "../../interfaces/IEmpresa";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useUpdateEmpresa() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (data: IUpdateEmpresa) =>
      EmpresaDataSource.getInstance().update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPRESAS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPRESAS_FILTROS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERSONAL_FILTROS] });
      toast.success("Empresa actualizada exitosamente.");
    },
    onError: () => {
      toast.error("Error al actualizar la empresa.");
    },
  });
}
