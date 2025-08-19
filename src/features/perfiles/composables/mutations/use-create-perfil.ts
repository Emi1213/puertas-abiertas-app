import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { PerfilesDataSource } from "../../services/perfiles-datasource";
import type { ICreatePerfil } from "../../interfaces/IPerfil";
import { QUERY_KEY } from "@/shared/composables/query-key";
import { useToast } from "vue-toastification";

export function useCreatePerfil() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (datos: ICreatePerfil) =>
      PerfilesDataSource.getInstance().create(datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERFILES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERFILES_FILTROS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USUARIOS_FILTROS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.NAVEGACION] });
      toast.success("Perfil creado exitosamente.");
    },
    onError: () => {
      toast.error("Error al crear el perfil.");
    },
  });
}
