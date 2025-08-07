import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import type { ICreatePersonal } from "../../interfaces/IPersonal";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { PersonalDataSource } from "../../services/personal-datasource";

export function useCreatePersonal() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (datos: ICreatePersonal) =>
      PersonalDataSource.getInstance().create(datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERSONAL] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERSONAL_FILTROS] });
      toast.success("Personal creado con éxito");
    },
    onError: () => {
      toast.error("Error al crear personal");
    },
  });
}
