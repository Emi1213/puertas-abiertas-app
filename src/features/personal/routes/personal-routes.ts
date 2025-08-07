export const personalRoutes = [
  {
    path: "/personal",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "personal",
        component: () =>
          import("../presentation/containers/personal-list-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
