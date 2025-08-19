import type { IIngreso } from "./IIngreso";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export interface IIngresosListViewProps {
  ingresos: IIngreso[];
  loading?: boolean;
  searchQuery: string;
  statusFilter?: string;
  paginationProps: PaginationProps;
  onEdit?: (ingreso: IIngreso) => void;
  onViewDetails?: (ingreso: IIngreso) => void;
  onViewAlarmas?: (ingreso: IIngreso) => void;
  onAdd?: () => void;
  onUpdateSearch: (query: string) => void;
  onUpdateStatusFilter?: (status: string | undefined) => void;
  onClearFilters: () => void;
}
