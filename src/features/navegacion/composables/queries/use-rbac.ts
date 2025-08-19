import { computed, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "@/features/auth/context/auth-store";
import { useRbacStore } from "../../context/rbac-store";
import { NavegacionDatasource } from "../../services/navegacion-datasource";
import type { INavegacionModulos } from "../../interfaces/INavegacionModulos";

export function useRbac() {
  const auth = useAuthStore();
  const rbacStore = useRbacStore();
  const navService = NavegacionDatasource.getInstance();

  const { data, isLoading, refetch, error } = useQuery<INavegacionModulos>({
    queryKey: ["navigation", auth.usuario?.rol ?? 0],
    enabled: !!auth.token && !!auth.usuario?.rol,
    queryFn: async () => {
      const res = await navService.getMe();
      return res;
    },
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });

  watch(
    data,
    (val) => {
      if (!val) return;
      rbacStore.setNavigation(val.perfilId, val.rbacVersion, val.modulos);
    },
    { immediate: true }
  );

  const modules = computed(() => rbacStore.modules);

  return {
    modules,
    isLoading,
    error,
    refetch,
  };
}
