import type { IIngreso } from "./IIngreso";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export interface IIngresosListViewProps {
  ingresos: IIngreso[];
  loading?: boolean;
  searchQuery: string;
  paginationProps: PaginationProps;
  onEdit?: (ingreso: IIngreso) => void;
  onDelete?: (ingreso: IIngreso) => void;
  onAdd?: () => void;
  onUpdateSearch: (query: string) => void;
  onClearFilters: () => void;
}
