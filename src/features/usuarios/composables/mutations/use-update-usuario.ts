import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import type { IUpdateUsuario } from "../../interfaces/IUsuario";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { UsuarioDataSource } from "../../services/usuarios-datasource";

export function useUpdateUsuario() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (data: IUpdateUsuario) =>
      UsuarioDataSource.getInstance().update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS_FILTROS] });
      toast.success("Usuario actualizado exitosamente.");
    },
    onError: () => {
      toast.error("Error al actualizar el usuario.");
    },
  });
}
