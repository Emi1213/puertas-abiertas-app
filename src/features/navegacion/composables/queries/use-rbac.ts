import { computed, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "@/features/auth/context/auth-store";
import { useRbacStore } from "../../context/rbac-store";
import { NavegacionDatasource } from "../../services/navegacion-datasource";
import { QUERY_KEY } from "@/shared/composables/query-key";
import type { INavegacionModulos } from "../../interfaces/INavegacionModulos";

export function useRbac() {
  const auth = useAuthStore();
  const rbacStore = useRbacStore();

  const query = useQuery<INavegacionModulos>({
    queryKey: [QUERY_KEY.NAVEGACION, auth.usuario?.rol ?? 0],
    enabled: !!auth.token && !!auth.usuario?.rol,
    queryFn: () => NavegacionDatasource.getInstance().getMe(),
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  watch(
    () => query.data.value,
    (data) => {
      if (!data) return;
      rbacStore.setNavigation(data.perfilId, data.rbacVersion, data.modulos);
    },
    { immediate: true }
  );

  const modules = computed(() => rbacStore.modules);

  return {
    modules,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
