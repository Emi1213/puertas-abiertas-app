import type { PaginationProps } from "@/shared/interfaces/data-table.types";
import type { IUsuario } from "./IUsuario";
import type { IPerfil } from "@/features/perfiles/interfaces/IPerfil";

export interface IUsuariosListViewProps {
  usuarios: IUsuario[];
  loading?: boolean;
  searchQuery: string;
  profileFilter: number | undefined;
  perfiles: IPerfil[];
  paginationProps: PaginationProps;
  onEdit?: (usuario: IUsuario) => void;
  onDelete?: (usuario: IUsuario) => void;
  onAdd?: () => void;
  onUpdateSearch: (query: string) => void;
  onUpdateProfileFilter: (profile: number | undefined) => void;
  onClearFilters: () => void;
}
