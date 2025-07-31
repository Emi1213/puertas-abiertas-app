<!-- src/shared/components/sidebar/sidebar.vue -->
<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { LogOut } from "lucide-vue-next";
import { sidebarMenu } from "./sidebar-menu-data";
import { useAuthStore } from "../../features/auth/context/auth-store";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const userRole = authStore.user?.role || "";

const visibleMenu = sidebarMenu
  .map((section) => {
    const visibleItems = section.items.filter(
      (item) => !item.roles || item.roles.includes(userRole)
    );
    return { ...section, items: visibleItems };
  })
  .filter((section) => section.items.length > 0);

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <aside
    class="w-64 h-full bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col shadow-xl border-r border-slate-200/80"
  >
    <div class="p-6 border-b border-slate-200/60">
      <div class="flex items-center gap-3">
        <div>
          <h1 class="text-lg font-bold text-slate-800">Control Ingresos</h1>
          <p class="text-xs text-slate-500">Gestión de accesos</p>
        </div>
      </div>
    </div>

    <nav
      class="flex-1 flex flex-col justify-between overflow-y-auto p-4 space-y-6"
    >
      <div>
        <div v-for="section in visibleMenu" :key="section.title">
          <h3
            class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3"
          >
            {{ section.title }}
          </h3>
          <div class="space-y-1">
            <RouterLink
              v-for="item in section.items"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100/80 transition-all duration-200 group"
              :class="{
                'bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100':
                  route.path === item.to,
              }"
            >
              <component
                :is="item.icon"
                class="w-4 h-4 text-slate-500 group-hover:text-slate-700"
              />
              <span class="text-sm text-slate-700 group-hover:text-slate-900">
                {{ item.label }}
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="pt-4 border-t border-slate-200/60">
        <button
          @click="logout"
          class="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600"
        >
          <LogOut class="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </nav>
  </aside>
</template>
