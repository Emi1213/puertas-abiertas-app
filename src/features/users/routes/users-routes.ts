export const usersRoutes = [
  {
    path: "/users",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "users",
        component: () =>
          import("../presentation/containers/users-list-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
