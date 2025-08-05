import type { IEmpresa } from "./IEmpresa";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export interface IEmpresasListViewProps {
  empresas: IEmpresa[];
  loading?: boolean;
  searchQuery: string;
  statusFilter: boolean | undefined;
  paginationProps: PaginationProps;
  onEdit?: (empresa: IEmpresa) => void;
  onDelete?: (empresa: IEmpresa) => void;
  onAdd?: () => void;
  onUpdateSearch: (query: string) => void;
  onUpdateStatusFilter: (status: boolean | undefined) => void;
  onClearFilters: () => void;
}
