import type { Column } from "@/shared/interfaces/data-table.types";
import type { IPerfil } from "../../interfaces/IPerfil";
import { h } from "vue";
import Badge from "@/components/ui/badge/Badge.vue";
import PerfilesActionsMenu from "./perfiles-actions-menu.vue";

export const usePerfilesTableColumns = (
  handlers: {
    onEdit?: (perfil: IPerfil) => void;
    onDelete?: (perfil: IPerfil) => void;
  } = {}
): Column<IPerfil>[] => {
  return [
    {
      key: "nombre",
      label: "Nombre",
      width: 160,
      align: "center",
    },
    {
      key: "descripcion",
      label: "Descripción",
      width: 200,
      align: "center",
      render: (_, row) => row.descripcion || "Sin descripción",
    },
    {
      key: "modulos",
      label: "Módulos",
      width: 180,
      align: "center",
      render: (_, row) =>
        h(
          "div",
          { class: "flex flex-wrap gap-1" },
          row.modulos.map((modulo) =>
            h(
              Badge,
              {
                key: modulo.id,
                class: "bg-blue-100 text-blue-700 text-xs",
              },
              {
                default: () => modulo.nombre,
              }
            )
          )
        ),
    },
    {
      key: "actions",
      label: "Acciones",
      align: "center",
      width: 100,
      render: (_, row) =>
        h(PerfilesActionsMenu, {
          perfil: row,
          onEdit: () => handlers.onEdit?.(row),
          onDelete: () => handlers.onDelete?.(row),
        }),
    },
  ];
};
