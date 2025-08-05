export const companiesRoutes = [
  {
    path: "/companies",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "companies",
        component: () => import("../presentation/containers/companies-list-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
