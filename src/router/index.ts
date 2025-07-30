import { createRouter, createWebHistory } from "vue-router";
import { mainRoutes } from "../core/routes/main-routes";
import { authRoutes } from "../features/auth/routes/auth-routes";
import { companiesRoutes } from "../features/companies/routes/companies-routes";
import { useAuthStore } from "../features/auth/context/auth-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...mainRoutes,
    ...authRoutes,
    ...companiesRoutes,
    {
      path: "",
      name: "not-found",
      component: () =>
        import("../features/auth/presentation/views/login-view.vue"),
    },
  ],
});

const publicRoutes = ["/login"];

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token;

  const isPublic = publicRoutes.includes(to.path);
  const isAuthenticated = !!token;

  if (!isAuthenticated && !isPublic) {
    return next("/login");
  }

  if (isAuthenticated && to.path === "/login") {
    return next("/");
  }

  return next();
});

export default router;
