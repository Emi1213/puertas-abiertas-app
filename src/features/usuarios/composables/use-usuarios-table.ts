import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export function useUsuariosTable() {
    const {
        
    } = use

    const paginationProps = computed(
        (): PaginationProps => ({
          page: currentPage.value,
          pageSize: pageSize.value,
          total: totalRecords.value,
          onPageChange: updatePage,
        })
      );
}