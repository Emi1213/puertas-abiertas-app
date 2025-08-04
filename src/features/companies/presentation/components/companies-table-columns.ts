import type { Column } from "@/shared/interfaces/data-table.types";
import type { ICompany } from "../../interfaces/ICompany";
import { h } from "vue";
import CompaniesActionsMenu from "./companies-actions-menu.vue";
import Badge from "@/components/ui/badge/Badge.vue";

export const useCompaniesTableColumns = (
  handlers: {
    onEdit?: (company: ICompany) => void;
    onDelete?: (company: ICompany) => void;
  } = {}
): Column<ICompany>[] => {
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
        h(CompaniesActionsMenu, {
          company: row,
          onEdit: () => handlers.onEdit?.(row),
          onDelete: () => handlers.onDelete?.(row),
        }),
    },
  ];
};
