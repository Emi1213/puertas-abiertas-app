import type { Column } from "@/shared/interfaces/data-table.types";
import type { IUsuario } from "../../interfaces/IUsuario";
import { h } from "vue";
import UserActionsMenu from "../components/user-actions-menu.vue";
import Badge from "@/components/ui/badge/Badge.vue";

export const useUsersTableColumns = (
  handlers: {
    onEdit?: (user: IUsuario) => void;
    onDelete?: (user: IUsuario) => void;
  } = {}
): Column<IUsuario>[] => {
  return [
    { key: "usuario", label: "Usuario", width: 120, align: "center" },
    { key: "nombre", label: "Nombre", width: 160, align: "center" },
    {
      key: "perfil",
      label: "Perfil",
      width: 120,
      align: "center",
      render: (_, row) =>
        h(
          Badge,
          {
            class: {
              "bg-blue-100 text-blue-700":
                row.perfil?.nombre === "Administrador",
              "bg-green-100 text-green-700": row.perfil?.nombre === "Invitado",
              "bg-yellow-100 text-yellow-700": row.perfil?.nombre === "Lectura",
              "bg-red-100 text-red-700": row.perfil?.nombre === "Creacion",
              "bg-slate-100 text-slate-600": !row.perfil?.nombre,
            },
          },
          {
            default: () => row.perfil?.nombre ?? "Sin perfil",
          }
        ),
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
