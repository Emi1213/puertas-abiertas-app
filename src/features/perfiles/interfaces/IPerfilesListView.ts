import type { IPerfil } from "./IPerfil";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";

export interface IPerfilesListViewProps {
  perfiles: IPerfil[];
  loading?: boolean;
  searchQuery: string;
  paginationProps: PaginationProps;
  onEdit?: (perfil: IPerfil) => void;
  onDelete?: (perfil: IPerfil) => void;
  onAdd?: () => void;
  onUpdateSearch: (query: string) => void;
  onClearFilters: () => void;
}
