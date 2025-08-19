import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { PerfilesDataSource } from "../../services/perfiles-datasource";
import type { IUpdatePerfil } from "../../interfaces/IPerfil";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useUpdatePerfil() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: IUpdatePerfil) =>
      PerfilesDataSource.getInstance().update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERFILES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERFILES_FILTROS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS_FILTROS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.NAVEGACION] });
      toast.success("Perfil actualizado exitosamente.");
    },
    onError: () => {
      toast.error("Error al actualizar el perfil.");
    },
  });
}
