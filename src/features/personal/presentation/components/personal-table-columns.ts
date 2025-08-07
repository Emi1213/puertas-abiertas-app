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
      key: "empresa",
      label: "Empresa",
      width: 200,
      render: (_, row) => {
        if (!row.empresa) {
          return h(
            "span",
            {
              class: "text-gray-400 italic text-sm",
            },
            "Sin empresa"
          );
        }

        return h(
          "div",
          {
            class: "flex items-center gap-2",
          },
          [
            h("div", {
              class: row.empresa.estado
                ? "w-2 h-2 rounded-full bg-emerald-500"
                : "w-2 h-2 rounded-full bg-gray-400 opacity-60",
            }),
            h(
              "span",
              {
                class: row.empresa.estado
                  ? "font-medium text-gray-900"
                  : "font-medium text-gray-500",
              },
              row.empresa.nombre
            ),
          ]
        );
      },
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
