import type { Column } from "@/shared/interfaces/data-table.types";
import type { IPersonal } from "../../interfaces/IPersonal";
import Badge from "@/components/ui/badge/Badge.vue";
import { h } from "vue";
import PersonalActionsMenu from "./personal-actions-menu.vue";

export const usePersonalTableColumns = (
  handlers: {
    onEdit?: (user: IPersonal) => void;
    onDelete?: (user: IPersonal) => void;
  } = {}
): Column<IPersonal>[] => {
  return [
    {
      key: "nombres",
      label: "Nombres",
      width: 160,
    },
    {
      key: "apellidos",
      label: "Apellidos",
      width: 160,
    },
    {
      key: "estado",
      label: "Estado",
      width: 100,
      align: "center",
      render: (_, row) =>
        h(
          Badge,
          {
            class: {
              "bg-green-100 text-green-700": row.estado === true,
              "bg-red-100 text-red-700": row.estado === false,
            },
          },
          {
            default: () => (row.estado ? "Activo" : "Inactivo"),
          }
        ),
    },
    {
      key: "actions",
      label: "Acciones",
      align: "center",
      width: 100,
      render: (_, row) =>
        h(PersonalActionsMenu, {
          user: row,
          onEdit: () => handlers.onEdit?.(row),
          onDelete: () => handlers.onDelete?.(row),
        }),
    },
  ];
};
