import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import { IngresosDataSource } from "../../services/ingresos-datasource";
import { QUERY_KEY } from "@/shared/composables/query-key";

export function useRecognizeIngresos() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => IngresosDataSource.getInstance().recognize(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.INGRESOS_FILTROS] });
      toast.success("Ingreso reconocido exitosamente");
    },
    onError: () => {
      toast.error("Error al reconocer el ingreso");
    },
  });
}
