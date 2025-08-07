import { computed } from "vue";
import { usePersonalFilters } from "./queries/use-personal-filters";
import { usePersonalFiltersUrl } from "./use-personal-filters-url";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export function usePersonalTable() {
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
  } = usePersonalFiltersUrl();
  const { data, isLoading, error, refetch } = usePersonalFilters(filters);

  const personal = computed(() => data.value?.items || []);
  const totalRecords = computed(() => data.value?.totalItems || 0);

  const paginationProps = computed(
    (): PaginationProps => ({
      page: currentPage.value,
      pageSize: pageSize.value,
      total: totalRecords.value,
      onPageChange: updatePage,
    })
  );

  return {
    personal,
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
    updatePage,
    clearFilters,
    refetch,
  };
}
