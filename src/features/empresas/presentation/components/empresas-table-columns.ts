import type { Column } from "@/shared/interfaces/data-table.types";
import type { IEmpresa } from "../../interfaces/IEmpresa";
import { h } from "vue";
import EmpresasActionsMenu from "./empresas-actions-menu.vue";
import Badge from "@/components/ui/badge/Badge.vue";

export const useEmpresasTableColumns = (
  handlers: {
    onEdit?: (empresa: IEmpresa) => void;
    onDelete?: (empresa: IEmpresa) => void;
  } = {}
): Column<IEmpresa>[] => {
  return [
    {
      key: "nombre",
      label: "Nombre",
      width: 160,
      align: "center",
    },
    {
      key: "estado",
      label: "Estado",
      width: 120,
      align: "center",
      render: (_, row) =>
        h(
          Badge,
          {
            class: row.estado
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700",
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
        h(EmpresasActionsMenu, {
          empresa: row,
          onEdit: () => handlers.onEdit?.(row),
          onDelete: () => handlers.onDelete?.(row),
        }),
    },
  ];
};
