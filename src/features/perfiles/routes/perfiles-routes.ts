import type { RouteRecordRaw } from "vue-router";

export const perfilesRoutes: RouteRecordRaw[] = [
  {
    path: "/perfiles",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "perfiles",
        component: () =>
          import("../presentation/containers/perfiles-list-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
