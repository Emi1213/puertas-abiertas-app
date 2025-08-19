import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import * as signalR from "@microsoft/signalr";
import { useAuthStore } from "@/features/auth/context/auth-store";
import { useRbacStore } from "../../context/rbac-store";
import { NavegacionDatasource } from "../../services/navegacion-datasource";
import type { INavegacionModulos } from "../../interfaces/INavegacionModulos";

export function useRbac() {
  const auth = useAuthStore();
  const rbacStore = useRbacStore();
  const queryClient = useQueryClient();

  const navService = NavegacionDatasource.getInstance();
  const connection = ref<signalR.HubConnection | null>(null);

  const { data, isLoading, refetch, error } = useQuery<INavegacionModulos>({
    queryKey: ["navigation", auth.usuario?.rol ?? 0],
    enabled: !!auth.token && !!auth.usuario?.rol,
    queryFn: async () => {
      const res = await navService.getMe();
      return res;
    },
    staleTime: 1000 * 60 * 5,
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

  onMounted(async () => {
    if (!auth.token || !auth.usuario?.rol) return;

    const base = (import.meta.env.VITE_API_URL_BASE || "").replace(/\/$/, "");
    const hubUrl = `${base}/hubs/rbac?perfilId=${auth.usuario.rol}`;

    const conn = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => auth.token,
      })
      .withAutomaticReconnect()
      .build();

    conn.on("roleModulesChanged", async (_payload: { perfilId: number }) => {
      await queryClient.invalidateQueries({
        queryKey: ["navigation", auth.usuario?.rol ?? 0],
      });
      await refetch();
    });

    try {
      await conn.start();
      connection.value = conn;
    } catch (e) {
      console.warn("No se pudo iniciar SignalR:", e);
    }
  });

  onBeforeUnmount(async () => {
    if (connection.value) {
      await connection.value.stop();
      connection.value = null;
    }
  });

  return {
    modules,
    isLoading,
    error,
    refetch,
  };
}
