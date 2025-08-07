import type { PaginationProps } from "@/shared/interfaces/data-table.types";
import { useUsuariosFiltersUrl } from "./use-usuarios-filters-url";
import { useUsuariosFilters } from "./queries/use-usuarios-filters";
import { computed } from "vue";

export function useUsuariosTable() {
  const {
    searchQuery,
    currentPage,
    pageSize,
    profileFilter,
    filters,
    updateSearch,
    updateProfileFilter,
    updatePage,
    clearFilters,
  } = useUsuariosFiltersUrl();

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useUsuariosFilters(filters);

  const usuarios = computed(() => response.value?.items || []);
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
    usuarios,
    isLoading,
    error,
    totalRecords,
    searchQuery,
    profileFilter,
    currentPage,
    pageSize,
    paginationProps,
    updateSearch,
    updateProfileFilter,
    clearFilters,
    refetch,
  };
}
