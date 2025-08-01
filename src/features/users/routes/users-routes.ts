export const usersRoutes = [
  {
    path: "/users",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "users",
        component: () => import("../presentation/views/users-list-view.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
