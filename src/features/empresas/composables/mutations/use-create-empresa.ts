import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { EmpresaDataSource } from "../../services/datasource";
import type { ICreateEmpresa } from "../../interfaces/IEmpresa";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useCreateEmpresa() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (datos: ICreateEmpresa) =>
      new EmpresaDataSource().create(datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPRESAS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPRESAS_FILTROS] });
      toast.success("Empresa creada exitosamente.");
    },
    onError: () => {
      toast.error("Error al crear la empresa.");
    },
  });
}
