import type { RouteRecordRaw } from "vue-router";

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () =>
          import("../presentation/containers/dashboard-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
