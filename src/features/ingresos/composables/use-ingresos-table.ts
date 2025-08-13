import { computed } from "vue";
import { useIngresosFilters } from "./queries/use-ingresos-filters";
import { useIngresosFiltersUrl } from "./use-ingresos-filters-url";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export function useIngresosTable() {
  const {
    searchQuery,
    currentPage,
    pageSize,
    filters,
    updatePage,
    clearFilters,
    updateSearch,
  } = useIngresosFiltersUrl();
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useIngresosFilters(filters);

  const ingresos = computed(() => response.value?.items || []);
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
    ingresos,
    isLoading,
    error,
    totalRecords,
    searchQuery,
    currentPage,
    pageSize,
    paginationProps,
    updateSearch,
    clearFilters,
    refetch,
  };
}
