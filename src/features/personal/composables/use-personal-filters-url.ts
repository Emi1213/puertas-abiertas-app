import { debouncedRef } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function usePersonalFiltersUrl() {
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
  const empresaFilter = ref<number | undefined>(
    route.query.empresa ? parseInt(route.query.empresa as string) : undefined
  );
  const currentPage = ref(parseInt(route.query.page as string) || 0);
  const pageSize = ref(7);

  const filters = computed(() => ({
    busqueda: debouncedSearchQuery.value || undefined,
    estado: statusFilter.value,
    empresaId: empresaFilter.value,
    pagina: currentPage.value + 1,
    tamanioPagina: pageSize.value,
  }));

  const updateURL = () => {
    const query: Record<string, string> = {};
    if (searchQuery.value) query.search = searchQuery.value;
    if (statusFilter.value !== undefined)
      query.status = statusFilter.value.toString();
    if (empresaFilter.value) query.empresa = empresaFilter.value.toString();
    if (currentPage.value > 0) query.page = currentPage.value.toString();
    router.replace({ query });
  };

  watch([searchQuery, statusFilter, empresaFilter, currentPage], updateURL, {
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

  const updateEmpresaFilter = (empresaId: number | undefined) => {
    empresaFilter.value = empresaId;
    currentPage.value = 0;
  };

  const updatePage = (page: number) => {
    currentPage.value = page;
  };

  const clearFilters = () => {
    searchQuery.value = "";
    statusFilter.value = undefined;
    empresaFilter.value = undefined;
    currentPage.value = 0;
  };

  return {
    searchQuery,
    statusFilter,
    empresaFilter,
    currentPage,
    pageSize,
    filters,
    updateSearch,
    updateStatusFilter,
    updateEmpresaFilter,
    updatePage,
    clearFilters,
  };
}
