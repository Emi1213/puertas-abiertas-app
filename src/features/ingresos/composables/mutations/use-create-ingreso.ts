import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import { IngresosDataSource } from "../../services/ingresos-datasource";
import type { ICreateIngreso } from "../../interfaces/IIngreso";
import { QUERY_KEY } from "@/shared/composables/query-key";

export function useCreateIngreso() {
  const queryClient = useQueryClient();
  const toast = useToast();
  
  return useMutation({
    mutationFn: (datos: ICreateIngreso) =>
      IngresosDataSource.getInstance().create(datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.INGRESOS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.INGRESOS_FILTROS] });
      toast.success("Ingreso creado con éxito");
    },
    onError: () => {
      toast.error("Error al crear el ingreso");
    },
  });
}
