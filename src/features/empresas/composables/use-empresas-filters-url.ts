import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { debouncedRef } from "@vueuse/core";
import type { IEmpresaFilters } from "../interfaces/IEmpresaFilters";

export function useEmpresasFiltersUrl() {
  const router = useRouter();
  const route = useRoute();
  const searchQuery = ref((route.query.search as string) || "");
  const debouncedSearchQuery = debouncedRef(searchQuery, 300);

  const getInitialStatusFilter = (): boolean | undefined => {
    const status = route.query.status as string;
    if (status === "true") return true;
    if (status === "false") return false;
    return undefined;
  };

  const statusFilter = ref<boolean | undefined>(getInitialStatusFilter());
  const currentPage = ref(parseInt(route.query.page as string) || 0);
  const pageSize = ref(7);

  const filters = computed(
    (): IEmpresaFilters => ({
      busqueda: debouncedSearchQuery.value || undefined,
      estado: statusFilter.value,
      pagina: currentPage.value + 1,
      tamanioPagina: pageSize.value,
    })
  );

  const updateURL = () => {
    const query: Record<string, string> = {};

    if (searchQuery.value) query.search = searchQuery.value;
    if (statusFilter.value !== undefined)
      query.status = statusFilter.value.toString();
    if (currentPage.value > 0) query.page = currentPage.value.toString();

    router.replace({ query });
  };

  watch([searchQuery, statusFilter, currentPage], updateURL, {
    deep: true,
  });

  const updateSearch = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 0;
  };

  const updateStatusFilter = (status: boolean | undefined) => {
    statusFilter.value = status;
    currentPage.value = 0;
  };

  const updatePage = (page: number) => {
    currentPage.value = page;
  };

  const clearFilters = () => {
    searchQuery.value = "";
    statusFilter.value = undefined;
    currentPage.value = 0;
  };

  return {
    searchQuery,
    statusFilter,
    currentPage,
    pageSize,
    filters,
    updateSearch,
    updateStatusFilter,
    updatePage,
    clearFilters,
  };
}
