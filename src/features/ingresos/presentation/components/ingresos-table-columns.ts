import type { Column } from "@/shared/interfaces/data-table.types";
import type { IIngreso } from "../../interfaces/IIngreso";
import Badge from "@/components/ui/badge/Badge.vue";
import { h } from "vue";

export const useIngresosTableColumns = (
  handlers: {
    onEdit?: (ingreso: IIngreso) => void;
    onDelete?: (ingreso: IIngreso) => void;
  } = {}
): Column<IIngreso>[] => {
  return [
    {
      key: "id",
      label: "Personal",
      width: 200,
      align: "center",
      render: (_, row) => {
        if (!row.personal) {
          return h(
            "span",
            {
              class: "text-gray-400 italic text-sm",
            },
            "Sin asignar"
          );
        }

        return h(
          "span",
          {
            class: "font-medium text-gray-900",
          },
          `${row.personal.nombres} ${row.personal.apellidos}`
        );
      },
    },
    {
      key: "id",
      label: "Empresa",
      width: 200,
      align: "center",
      render: (_, row) => {
        if (!row.personal?.empresa) {
          return h(
            "span",
            {
              class: "text-gray-400 italic text-sm",
            },
            "Sin asignar"
          );
        }

        return h(
          "span",
          {
            class: "font-medium text-gray-900",
          },
          row.personal.empresa.nombre
        );
      },
    },
    {
      key: "fechaInicio",
      label: "Fecha Inicio",
      width: 160,
      render: (_, row) => {
        const fecha = new Date(row.fechaInicio);
        return h(
          "div",
          {
            class: "text-sm text-gray-700",
          },
          [
            h(
              "div",
              {
                class: "font-medium",
              },
              fecha.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            ),
            h(
              "div",
              {
                class: "text-xs text-gray-500",
              },
              fecha.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })
            ),
          ]
        );
      },
    },
    {
      key: "fechaFin",
      label: "Fecha Fin",
      width: 160,
      render: (_, row) => {
        if (!row.fechaFin) {
          return h(
            "span",
            {
              class: "text-gray-400 italic text-sm",
            },
            "En progreso"
          );
        }

        const fecha = new Date(row.fechaFin);
        return h(
          "div",
          {
            class: "text-sm text-gray-700",
          },
          [
            h(
              "div",
              {
                class: "font-medium",
              },
              fecha.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            ),
            h(
              "div",
              {
                class: "text-xs text-gray-500",
              },
              fecha.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })
            ),
          ]
        );
      },
    },
    {
      key: "duracion",
      label: "Duración",
      width: 100,
      align: "center",
      render: (_, row) =>
        h(
          "span",
          {
            class: "text-sm font-medium text-gray-900",
          },
          row.duracion
        ),
    },
    {
      key: "estado",
      label: "Estado",
      width: 120,
      align: "center",
      render: (_, row) => {
        if (!row.estado) {
          return h(
            Badge,
            {
              class: "bg-gray-100 text-gray-700",
            },
            {
              default: () => "Sin estado",
            }
          );
        }
        let badgeClass = "";
        switch (row.estado.toLowerCase()) {
          case "activo":
          case "en_progreso":
            badgeClass = "bg-blue-100 text-blue-700";
            break;
          case "completado":
          case "finalizado":
            badgeClass = "bg-green-100 text-green-700";
            break;
          case "pendiente":
            badgeClass = "bg-yellow-100 text-yellow-700";
            break;
          case "cancelado":
            badgeClass = "bg-red-100 text-red-700";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-700";
        }

        return h(
          Badge,
          {
            class: badgeClass,
          },
          {
            default: () => (row.estado || "").replace("_", " ").toUpperCase(),
          }
        );
      },
    },
  ];
};
