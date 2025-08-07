export const empresasRoutes = [
  {
    path: "/empresas",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "empresas",
        component: () =>
          import("../presentation/containers/empresas-list-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
