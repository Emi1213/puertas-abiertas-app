import { debouncedRef } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { parse } from "zod";
import type { IUsuarioFilters } from "../interfaces/IUsuarioFilters";

export function useUsuariosFiltersUrl() {
  const router = useRouter();
  const route = useRoute();
  const searchQuery = ref((route.query.search as string) || "");
  const debouncedSearchQuery = debouncedRef(searchQuery, 300);

  const currentPage = ref(parseInt(route.query.page as string) || 0);
  const pageSize = ref(7);
  const profileFilter = ref(parseInt(route.query.profile as string) || 0);

  const filters = computed(
    (): IUsuarioFilters => ({
      busqueda: debouncedSearchQuery.value || undefined,
      perfilId: profileFilter.value || undefined,
      pagina: currentPage.value + 1,
      tamanioPagina: pageSize.value,
    })
  );

  const updateURL = () => {
    const query: Record<string, string> = {};
    if (searchQuery.value) query.search = searchQuery.value;
    if (profileFilter.value) query.profile = profileFilter.value.toString();
    if (currentPage.value > 0) query.page = currentPage.value.toString();
    router.replace({ query });
  };

  watch([searchQuery, profileFilter, currentPage], updateURL, { deep: true });
}
