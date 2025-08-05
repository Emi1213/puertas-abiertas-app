import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toastification";
import { UsuarioDataSource } from "../../services/datasource";
import type { ICreateUsuario } from "../../interfaces/IUsuario";
import { QUERY_KEY } from "@/shared/composables/query-key";

export function useCreateUsuario() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (datos: ICreateUsuario) =>
      new UsuarioDataSource().create(datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS_FILTROS] });
      toast.success("Usuario creado con éxito");
    },
    onError: () => {
      toast.error("Error al crear usuario");
    },
  });
}
