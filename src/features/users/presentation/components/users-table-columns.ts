import type { Column } from "@/shared/interfaces/data-table.types";
import type { IUser } from "../../interfaces/IUser";
import { h } from "vue";
import UserActionsMenu from "../components/user-actions-menu.vue";

export const useUsersTableColumns = (
  handlers: {
    onEdit?: (user: IUser) => void;
    onDelete?: (user: IUser) => void;
  } = {}
): Column<IUser>[] => {
  return [
    { key: "usuario", label: "Usuario", width: 120 },
    { key: "nombre", label: "Nombre", width: 160 },
    {
      key: "perfil",
      label: "Perfil",
      width: 120,
      render: (_, row) => row.perfil?.nombre ?? "Sin perfil",
    },
    {
      key: "actions",
      label: "Acciones",
      align: "center",
      width: 100,
      render: (_, row) =>
        h(UserActionsMenu, {
          user: row,
          onEdit: () => handlers.onEdit?.(row),
          onDelete: () => handlers.onDelete?.(row),
        }),
    },
  ];
};
