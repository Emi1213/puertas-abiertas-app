import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import { UsuarioDataSource } from "../../services/datasource";
import { QUERY_KEY } from "@/shared/composables/query-key";

export function useDeleteUsuario() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: number) => UsuarioDataSource.getInstance().delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS_FILTROS] });
      toast.success("Usuario eliminado exitosamente.");
    },
    onError: () => {
      toast.error("Error al eliminar el usuario.");
    },
  });
}
