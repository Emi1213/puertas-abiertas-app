import { debouncedRef } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { IUsuarioFilters } from "../interfaces/IUsuarioFilters";

export function useUsuariosFiltersUrl() {
  const router = useRouter();
  const route = useRoute();
  const searchQuery = ref((route.query.search as string) || "");
  const debouncedSearchQuery = debouncedRef(searchQuery, 300);

  const getInitialProfileFilter = (): number | undefined => {
    const profile = route.query.profile as string;
    if (profile) {
      const parsed = parseInt(profile);
      return isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  };

  const currentPage = ref(parseInt(route.query.page as string) || 0);
  const pageSize = ref(7);
  const profileFilter = ref<number | undefined>(getInitialProfileFilter());

  const filters = computed(
    (): IUsuarioFilters => ({
      busqueda: debouncedSearchQuery.value || undefined,
      perfilId: profileFilter.value,
      pagina: currentPage.value + 1,
      tamanioPagina: pageSize.value,
    })
  );

  const updateURL = () => {
    const query: Record<string, string> = {};
    if (searchQuery.value) query.search = searchQuery.value;
    if (profileFilter.value !== undefined)
      query.profile = profileFilter.value.toString();
    if (currentPage.value > 0) query.page = currentPage.value.toString();
    router.replace({ query });
  };

  watch([searchQuery, profileFilter, currentPage], updateURL, { deep: true });

  const updateSearch = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 0;
  };

  const updateProfileFilter = (profileId: number | undefined) => {
    profileFilter.value = profileId;
    currentPage.value = 0;
  };

  const updatePage = (page: number) => {
    currentPage.value = page;
  };

  const clearFilters = () => {
    searchQuery.value = "";
    profileFilter.value = undefined;
    currentPage.value = 0;
  };

  return {
    searchQuery,
    currentPage,
    pageSize,
    profileFilter,
    filters,
    updateSearch,
    updateProfileFilter,
    updatePage,
    clearFilters,
  };
}
