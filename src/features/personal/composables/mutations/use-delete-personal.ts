import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import { PersonalDataSource } from "../../services/personal-datasource";
import { QUERY_KEY } from "@/shared/composables/query-key";

export function useDeletePersonal() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: number) => PersonalDataSource.getInstance().delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERSONAL] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERSONAL_FILTROS] });
      toast.success("Personal eliminado exitosamente.");
    },
    onError: () => {
      toast.error("Error al eliminar el personal.");
    },
  });
}
