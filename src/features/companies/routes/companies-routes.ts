export const companiesRoutes = [
  {
    path: "/companies",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "companies",
        component: () => import("../presentation/views/companies-view.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
