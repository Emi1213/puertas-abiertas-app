import { computed } from "vue";
import { usePerfilesFilters } from "./queries/use-perfiles-filters";
import { usePerfilesFiltersUrl } from "./use-perfiles-filters-url";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export function usePerfilesTable() {
  const {
    searchQuery,
    currentPage,
    pageSize,
    filters,
    updateSearch,
    updatePage,
    clearFilters,
  } = usePerfilesFiltersUrl();

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = usePerfilesFilters(filters);

  const perfiles = computed(() => response.value?.items || []);
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
    perfiles,
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
