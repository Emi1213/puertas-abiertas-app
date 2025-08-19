import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { PerfilesDataSource } from "../../services/perfiles-datasource";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useDeletePerfil() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: number) => PerfilesDataSource.getInstance().delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERFILES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERFILES_FILTROS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS_FILTROS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.NAVEGACION] });
      toast.success("Perfil eliminado exitosamente.");
    },
    onError: () => {
      toast.error("Error al eliminar el perfil.");
    },
  });
}
