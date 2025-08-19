import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { IngresosDataSource } from "../../services/ingresos-datasource";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useDeleteIngreso() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: number) => IngresosDataSource.getInstance().delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.INGRESOS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.INGRESOS_FILTROS] });
      toast.success("Ingreso eliminado exitosamente.");
    },
    onError: () => {
      toast.error("Error al eliminar el ingreso.");
    },
  });
}
