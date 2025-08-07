import type { PaginationProps } from "@/shared/interfaces/data-table.types";
import type { IPersonal } from "./IPersonal";

export interface IPersonalListViewProps {
  personal: IPersonal[];
  loading?: boolean;
  searchQuery: string;
  statusFilter: boolean | undefined;
  paginationProps: PaginationProps;
  onEdit?: (personal: IPersonal) => void;
  onDelete?: (personal: IPersonal) => void;
  onAdd?: () => void;
  onUpdateSearch: (query: string) => void;
  onUpdateStatusFilter: (status: boolean | undefined) => void;
  onClearFilters: () => void;
}
