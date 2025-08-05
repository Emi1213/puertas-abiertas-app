export const companiesRoutes = [
  {
    path: "/companies",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "companies",
        component: () => import("../presentation/containers/empresas-list-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
