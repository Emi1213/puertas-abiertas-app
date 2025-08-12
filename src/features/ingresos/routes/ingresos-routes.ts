import type { RouteRecordRaw } from "vue-router";

export const ingresosRoutes: RouteRecordRaw[] = [
  {
    path: "/ingresos",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "ingresos",
        component: () =>
          import("../presentation/containers/ingresos-list-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
      {
        path: "nuevo",
        name: "ingresos-nuevo",
        component: () =>
          import("../presentation/containers/ingresos-form-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
