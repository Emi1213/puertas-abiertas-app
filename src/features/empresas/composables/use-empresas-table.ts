import { computed } from "vue";
import { useEmpresasFilters } from "./queries/use-empresas-filters";
import { useEmpresasFiltersUrl } from "./use-empresas-filters-url";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export function useEmpresasTable() {
  const {
    searchQuery,
    statusFilter,
    currentPage,
    pageSize,
    filters,
    updateSearch,
    updateStatusFilter,
    updatePage,
    clearFilters,
  } = useEmpresasFiltersUrl();

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useEmpresasFilters(filters);

  const empresas = computed(() => response.value?.items || []);
  const totalRecords = computed(() => response.value?.totalItems || 0);

  const paginationProps = computed(
    (): PaginationProps => ({
      page: currentPage.value,
      pageSize: pageSize.value,
      total: totalRecords.value,
      onPageChange: updatePage,
    })
  );

  return {
    empresas,
    isLoading,
    error,
    totalRecords,
    searchQuery,
    statusFilter,
    currentPage,
    pageSize,
    paginationProps,
    updateSearch,
    updateStatusFilter,
    clearFilters,
    refetch,
  };
}
