import type { PaginationProps } from "@/shared/interfaces/data-table.types";
import type { IUsuario } from "./IUsuario";

export interface IUsuariosListViewProps {
  usuarios: IUsuario[];
  loading?: boolean;
  searchQuery: string;
  statusFilter: boolean | undefined;
  paginationProps: PaginationProps;
  onEdit?: (usuario: IUsuario) => void;
  onDelete?: (usuario: IUsuario) => void;
  onAdd?: () => void;
  onUpdateSearch: (query: string) => void;
  onUpdateStatusFilter: (status: boolean | undefined) => void;
  onClearFilters: () => void;
}
