import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import { PersonalDataSource } from "../../services/personal-datasource";
import type { IUpdatePersonal } from "../../interfaces/IPersonal";
import { QUERY_KEY } from "@/shared/composables/query-key";

export function useUpdatePersonal() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: IUpdatePersonal) =>
      PersonalDataSource.getInstance().update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERSONAL] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERSONAL_FILTROS] });
      toast.success("Personal actualizado exitosamente.");
    },
    onError: () => {
      toast.error("Error al actualizar el personal.");
    },
  });
}
