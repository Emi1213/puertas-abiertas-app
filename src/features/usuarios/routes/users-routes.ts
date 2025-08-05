export const usuariosRoutes = [
  {
    path: "/usuarios",
    component: () => import("../../../core/layout/dashboard-wrapper.vue"),
    children: [
      {
        path: "",
        name: "usuarios",
        component: () =>
          import("../presentation/containers/usuarios-list-container.vue"),
        meta: {
          layout: "dashboard",
        },
      },
    ],
  },
];
