import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { debouncedRef } from "@vueuse/core";
import type { IPerfilFilters } from "../interfaces/IPerfilFilters";

export function usePerfilesFiltersUrl() {
  const router = useRouter();
  const route = useRoute();
  const searchQuery = ref((route.query.search as string) || "");
  const debouncedSearchQuery = debouncedRef(searchQuery, 300);


  const currentPage = ref(parseInt(route.query.page as string) || 0);
  const pageSize = ref(7);

  const filters = computed(
    (): IPerfilFilters => ({
      busqueda: debouncedSearchQuery.value || undefined,
      pagina: currentPage.value + 1,
      tamanioPagina: pageSize.value,
    })
  );

  const updateURL = () => {
    const query: Record<string, string> = {};

    if (searchQuery.value) query.search = searchQuery.value;
    if (currentPage.value > 0) query.page = currentPage.value.toString();

    router.replace({ query });
  };

  watch([searchQuery, currentPage], updateURL, {
    deep: true,
  });

  const updateSearch = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 0;
  };


  const updatePage = (page: number) => {
    currentPage.value = page;
  };

  const clearFilters = () => {
    searchQuery.value = "";
    currentPage.value = 0;
  };

  return {
    searchQuery,
    currentPage,
    pageSize,
    filters,
    updateSearch,
    updatePage,
    clearFilters,
  };
}
