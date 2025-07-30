import { createRouter, createWebHistory } from "vue-router";
import { mainRoutes } from "../core/routes/main-routes";
import { authRoutes } from "../features/auth/routes/auth-routes";
import { companiesRoutes } from "../features/companies/routes/companies-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...mainRoutes,
    ...authRoutes,
    ...companiesRoutes,
    {
      path: "",
      name: "not-found",
      component: () => import("../App.vue"),
    },
  ],
});

// router.afterEach((to) => {
//     const { user } = useAuthContext()

// })

export default router;
