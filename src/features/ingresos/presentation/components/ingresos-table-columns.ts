import type { Column } from "@/shared/interfaces/data-table.types";
import type { IIngreso } from "../../interfaces/IIngreso";
import IngresosActionsMenu from "./ingresos-actions-menu.vue";
import PersonalCell from "./table-cells/PersonalCell.vue";
import DateTimeCell from "./table-cells/DateTimeCell.vue";
import EstadoCell from "./table-cells/EstadoCell.vue";
import { h } from "vue";

export interface IngresosTableHandlers {
  onEdit?: (ingreso: IIngreso) => void;
  onViewDetails?: (ingreso: IIngreso) => void;
  onViewAlarmas?: (ingreso: IIngreso) => void;
}

export const useIngresosTableColumns = (
  handlers: IngresosTableHandlers = {}
): Column<IIngreso>[] => {
  return [
    {
      key: "actions",
      label: "Acciones",
      align: "center",
      width: 100,
      render: (_, row) =>
        h(IngresosActionsMenu, {
          onEdit: () => handlers.onEdit?.(row),
          onViewDetails: () => handlers.onViewDetails?.(row),
          onViewAlarmas: () => handlers.onViewAlarmas?.(row),
        }),
    },
    {
      key: "estado",
      label: "Estado",
      width: 100,
      align: "center",
      render: (_, row) => h(EstadoCell, { estado: row.estado }),
    },
    {
      key: "id",
      label: "Personal",
      width: 170,
      render: (_, row) => h(PersonalCell, { personal: row.personal }),
    },
    {
      key: "id",
      label: "Empresa",
      width: 140,
      render: (_, row) => {
        const empresa = row.personal?.empresa;
        if (!empresa) {
          return h(
            "span",
            { class: "text-sm text-gray-400 italic" },
            "Sin asignar"
          );
        }
        return h("span", { class: "text-sm text-gray-800" }, empresa.nombre);
      },
    },
    {
      key: "fechaInicio",
      label: "Inicio",
      width: 140,
      align: "center",
      render: (_, row) =>
        h(DateTimeCell, {
          date: row.fechaInicio,
          showTime: true,
        }),
    },
    {
      key: "fechaFin",
      label: "Fin",
      width: 140,
      align: "center",
      render: (_, row) =>
        h(DateTimeCell, {
          date: row.fechaFin,
          showTime: true,
          emptyMessage: "En progreso",
        }),
    },
    {
      key: "fechaRecon",
      label: "Reconocimiento",
      width: 140,
      align: "center",
      render: (_, row) =>
        h(DateTimeCell, {
          date: row.fechaRecon,
          showTime: true,
          emptyMessage: "Pendiente",
        }),
    },
    {
      key: "duracion",
      label: "Duración",
      width: 80,
      align: "center",
      render: (_, row) =>
        h("span", { class: "text-sm text-gray-800 " }, row.duracion),
    },
  ];
};
