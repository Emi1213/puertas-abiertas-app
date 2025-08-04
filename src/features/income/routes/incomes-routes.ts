export const incomesRoutes = [
  {
    path: "/ingresos",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "ingresos",
        component: () => import("../../../core/layout/dashboard-wrapper.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
